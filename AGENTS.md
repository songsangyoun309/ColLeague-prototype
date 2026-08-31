# ColLeague prototype

- This is a separate, fixed Pantheon vs Darius top-lane application demo. Do not modify the main repository when working here.
- Keep all invented statistics clearly labeled as sample data. Keep advice labeled as fictional sample content; do not describe it as researched, manual curation, or community consensus. Demo citations must point to local fictional-source previews, not fabricated external discussions.
- Do not add production databases, collectors, secrets, live-statistics integrations, or champion/lane switching without an explicit request.
- Keep official static asset provenance in the README and retain the Riot non-endorsement notice. A demo is not evidence of provider approval.
- Keep the UI clutter-free: omit repetitive source footers, obvious instructions, and nonessential captions, including "Official Riot Data Dragon tooltip". Preserve useful ability descriptions, cooldown/cost/patch values, accessible names, citations, sample-content warnings, and required notices. Do not restore removed clutter in later updates.
- Preserve the main site's design and tooltip accessibility. Cooldown values stay exact; blanks stay blank, numbers are near-white, slashes lighter and spaced, and opponent values sit above icons on desktop. Reserve shared number widths by rank so both champions' values align and wrap together; keep constant cooldowns centered as a single value.
- Use one centered content column with the fixed matchup above it, no left sidebar or decorative background gradients. Keep only one divider between rune paths and their statistics.
- Run `npm test` and `npm run build`, then commit and push task-related changes. Never force-push.
- Ability comparison: "You" names go above their icons, cooldowns below. Opponent names stay below their icons; keep the existing desktop/mobile cooldown alignment.
- Ability tooltips must use identical typography in the comparison grid and inline advice. Scope prose emphasis styles so they do not recolor or change the weight of tooltip titles/statistics.
