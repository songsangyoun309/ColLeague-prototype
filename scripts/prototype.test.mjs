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
  assert.equal((page.match(/Placeholder advice/g) ?? []).length, 3);
  assert.match(page, /<AbilityComparison playerName="Pantheon"/);
  assert.match(page, /opponentName="Darius"/);
  assert.doesNotMatch(page, /StudyMatchupSwitcher|searchParams|Last 30 days|<select/);
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

test("served routes stay locked and expose a healthy standalone demo", { skip: !process.env.PROTOTYPE_URL }, async () => {
  const base = process.env.PROTOTYPE_URL;
  for (const route of ["/", "/pantheon/vs/darius", "/?lane=middle&champion=ahri&opponent=mel"]) {
    const response = await fetch(new URL(route, base));
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /Prototype · Sample data/);
    assert.match(html, /Matchup Advice as Pantheon/);
    assert.match(html, /General advice against Darius/);
    assert.doesNotMatch(html, /lolalytics|reddit\.com|Last 30 days|Change champion|Change opponent|Swap lane/i);
  }
  assert.equal((await fetch(new URL("/ahri/vs/mel", base))).status, 404);
  const health = await fetch(new URL("/api/health", base));
  assert.deepEqual(await health.json(), { status: "ok", mode: "prototype" });
});
