import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("the prototype bundles only two official kits and explicit sample statistics", () => {
  const abilities = JSON.parse(read("data/abilities.json"));
  assert.deepEqual(Object.keys(abilities.champions), ["Pantheon", "Darius"]);
  for (const kit of Object.values(abilities.champions)) {
    assert.deepEqual(Object.keys(kit), ["P", "Q", "W", "E", "R"]);
    for (const [key, ability] of Object.entries(kit)) assert.equal(ability.key, key);
  }
  const sample = JSON.parse(read("data/sample-build.json"));
  assert.equal(sample.data_status, "sample_data");
  assert.equal(sample.player, "Pantheon");
  assert.equal(sample.opponent, "Darius");
  assert.equal(sample.lane, "top");
  assert.match(sample.notice, /Invented/);
});

test("the page is fixed, labels all placeholders, and retains the comparison", () => {
  const page = read("app/page.tsx");
  assert.match(page, /Prototype · Sample data/);
  assert.match(page, /Sample advice · Fictional examples/);
  assert.match(page, /sampleAdvice.sections.map/);
  assert.match(page, /<AbilityComparison playerName="Pantheon"/);
  assert.match(page, /opponentName="Darius"/);
  assert.doesNotMatch(page, /StudyMatchupSwitcher|searchParams|Last 30 days|<select/);
});

test("nine fictional tips have distinct demo citations and matching source previews", () => {
  const advice = JSON.parse(read("data/sample-advice.json"));
  assert.equal(advice.data_status, "fictional_demo");
  assert.equal(advice.sections.length, 3);
  const tips = advice.sections.flatMap(section => section.advice);
  assert.equal(tips.length, 9);
  assert.equal(new Set(tips.map(tip => tip.id)).size, 9);
  for (const tip of tips) {
    assert.match(tip.id, /^[a-z-]+$/);
    assert.ok(tip.text.length > 50 && tip.source_excerpt.length > 50 && tip.source_title);
  }
  assert.match(read("app/page.tsx"), /href=\{`\/demo-sources#\$\{advice.id\}`\}/);
  const preview = read("app/demo-sources/page.tsx");
  assert.match(preview, /Fictional sources/);
  assert.match(preview, /id=\{advice.id\}/);
});

test("paired cooldowns reserve shared number slots without changing the stored values", () => {
  const component = read("components/AbilityComparison.tsx");
  assert.match(component, /pairedRanks/);
  assert.match(component, /--cooldown-value-width/);
  assert.match(component, /values.length === 1/);
  assert.match(read("app/globals.css"), /width: var\(--cooldown-value-width\)/);
  assert.ok(read("app/globals.css").replaceAll("\r\n", "\n").includes(
    '.ability-comparison-row[data-side="player"] .ability-comparison-cell {\n  grid-template-areas: "name" "icon" "cooldown";'
  ));
  const abilities = JSON.parse(read("data/abilities.json")).champions;
  assert.equal(abilities.Pantheon.Q.cooldown, "11/10.25/9.5/8.75/8");
  assert.equal(abilities.Darius.W.cooldown, "5");
});

test("runtime files contain no original statistics/community integrations or collectors", () => {
  function check(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) check(path);
      else if (/\.(tsx?|json|css)$/.test(entry.name)) {
        const content = readFileSync(path, "utf8");
        assert.doesNotMatch(content, /lolalytics|reddit\.com|DATABASE_URL|RIOT_API_KEY|setInterval\(|fetch\(/i, path);
      }
    }
  }
  for (const dir of ["app", "components", "lib", "data"]) check(fileURLToPath(new URL(`../${dir}`, import.meta.url)));
});

test("ability tooltips retain useful details without redundant source captions", () => {
  const component = read("components/AbilityIcon.tsx");
  assert.doesNotMatch(component, /ability-source|Official Riot Data Dragon tooltip/);
  for (const field of ["description", "cooldown", "cost", "patch"]) {
    assert.ok(component.includes(`ability.${field}`));
  }
});

test("served routes stay locked and expose a healthy standalone demo", { skip: !process.env.PROTOTYPE_URL }, async () => {
  const base = process.env.PROTOTYPE_URL;
  for (const route of ["/", "/pantheon/vs/darius", "/?lane=middle&champion=ahri&opponent=mel"]) {
    const response = await fetch(new URL(route, base));
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /Prototype · Sample data/);
    assert.match(html, /Matchup Advice as Pantheon/);
    assert.match(html, /General advice against Darius/);
    assert.match(html, /class="rune-card-header"[\s\S]*class="rune-paths"[\s\S]*class="rune-stats"[\s\S]*class="summoner-spell-set"/);
    assert.equal((html.match(/aria-label="Demo source /g) ?? []).length, 9);
    assert.match(html, /class="[^"]*general-consensus" id="opponent-advice"/);
    assert.match(html, /class="[^"]*champion-guide" id="champion-advice"/);
    assert.doesNotMatch(html, /class="[^"]*(?:general-consensus|champion-guide)[^"]*" id="matchup-advice"/);
    assert.match(html, /aria-label="Pantheon abilities" data-side="player"/);
    assert.match(html, /aria-label="Darius abilities" data-side="opponent"/);
    const kits = JSON.parse(read("data/abilities.json")).champions;
    for (const section of JSON.parse(read("data/sample-advice.json")).sections) {
      const sectionHtml = html.split(`id="${section.id}"`)[1].split("</section>")[0];
      const expectedIcons = section.advice.flatMap(tip =>
        [...tip.text.matchAll(/\b(Pantheon|Darius)'s ([PQWER])\b/g)].map(([, champion, key]) =>
          `${champion} ${kits[champion][key].name}`));
      const renderedIcons = [...sectionHtml.matchAll(/aria-label="((?:Pantheon|Darius) [^"]+)"/g)].map(match => match[1]);
      assert.deepEqual(renderedIcons, expectedIcons, `${section.id}: ability icon ownership`);
    }
    assert.doesNotMatch(html, /lolalytics|reddit\.com|Last 30 days|Change champion|Change opponent|Swap lane/i);
  }
  assert.equal((await fetch(new URL("/ahri/vs/mel", base))).status, 404);
  const sourceResponse = await fetch(new URL("/demo-sources", base));
  assert.equal(sourceResponse.status, 200);
  const sources = await sourceResponse.text();
  assert.match(sources, /Fictional sources/);
  for (const section of JSON.parse(read("data/sample-advice.json")).sections) {
    for (const tip of section.advice) assert.ok(sources.includes(`id="${tip.id}"`));
  }
  const health = await fetch(new URL("/api/health", base));
  assert.deepEqual(await health.json(), { status: "ok", mode: "prototype" });
});
