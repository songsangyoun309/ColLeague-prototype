# Coleague prototype

A standalone application demo of Coleague, locked to **Pantheon vs Darius, top lane**. It preserves the main site's visual design, paired ability comparison, and hover/focus tooltips. There are no champion or lane selectors.

## What is real, and what is a placeholder?

- **Sample data:** all win rates, game counts, item/rune statistics, the matchup rating, and build choices are invented UI examples. They are labeled in the interface and are not gameplay recommendations.
- **Placeholder advice:** the three advice sections demonstrate presentation only. No community posts, comments, quotations, summaries, or fabricated citations are included.
- **Official static reference:** Pantheon and Darius ability descriptions, icons, and base cooldowns use a bundled Riot Data Dragon 16.15.1 snapshot. This is not live gameplay data; ability haste, resets, and recasts are not applied. Icons load from Riot's CDN. Fonts are bundled locally with their licenses.
- **Replay placeholder:** no third-party video is embedded in this demo.

No live statistics integration, community collector, background refresh job, original research database, API key, account connection, or database service is included. This is a limited prototype, not a representation that the full Coleague product has been approved by any provider. Any future integration needs the relevant provider's permission and applicable policy compliance.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. `/pantheon/vs/darius` shows the same fixed page. Other champion routes return 404; query parameters cannot change the matchup.

```sh
npm test
npm run build
npm start
```

## Railway

Create a **new service** connected to this repository. Use the repository root, `npm run build` as the build command, and `npm start` as the start command. Health check: `/api/health`. No Postgres or API service is needed. Use the generated service domain for the demo; leave the existing main-site service connected to its current repository. No deployment has been created automatically.

## Provider review

Describe this honestly as a fixed-matchup prototype with sample statistics and placeholder advice. It does not demonstrate an approved data connection. Riot's [developer policies](https://developer.riotgames.com/policies/general) and [Data Dragon documentation](https://developer.riotgames.com/docs/lol#data-dragon) apply to the official assets. Registration, review, and applicable permissions remain the owner's responsibility.

Based on Coleague UI commit `acd21d7`; this repository has an independent history and does not include the main app's database or collectors.
