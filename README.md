# Indonesia in Numbers — National Statistics Site

[![Make the best national statistics site](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/museshiro/best-national-statistics-site-20261126-v2/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/museshiro/best-national-statistics-site-20261126-v2/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

[Make the best national statistics site — best-national-statistics-site-20261126-0539](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An editorial almanac of Indonesian statistics, 2024 vintage: GDP, people, prices,
trade, regions, welfare, an ASEAN peer comparison and a searchable index of every
indicator — all sourced, all offline.

## What it is

- **10 pages**: Dashboard, Economy, Trade, Population, Regions, Prices &amp; Money,
  Social, Indicator Index, ASEAN Peers, About &amp; Data Dictionary.
- **28 hand-rolled SVG charts** (no library, no network): line, bar, horizontal bar,
  donut and scatter, each with units, ticks, end labels and a source line.
- **Every figure sourced**: BPS (2024 vintage, released February 2025), Bank
  Indonesia, World Bank, IMF and Permenaker No. 16/2024. “≈” marks rounded
  figures; “—” marks unverified ones, which are never invented.
- **Headline facts**: GDP Rp22,139T (2024), growth 5.03%, population 281.6M,
  poverty 8.57% — the lowest since 1960 — HDI 75.02, inflation 1.57%.

## Design

Warm cream paper (`#F7F4EC`), serif headlines (Georgia system stack), Indonesia-red
accent (`#C8102E`), thin rule lines, flat sections — an almanac, not a generic
dashboard. Light theme by default, dark toggle saved in `localStorage`. All type
is system fonts; all charts are inline SVG built by `app/js/charts.js`.

The dashboard hero finishes inside the first viewport: headline, one-line subtitle,
date badge (“Data as of February 2025 · BPS”), a searchable fact strip and six KPI
tiles — no chart is cut by the fold. Charts start in the next section.

## Controls (all working offline, vanilla JS)

Year filter 2019–2024 · tabs (Nominal/Real, Exports/Balance, HDI/Gini/Poverty) ·
sortable tables (click any header) · live search (fact strip, indicators,
provinces, commodities) · chart ↔ table toggle · hover tooltips · hash routing
(`#yr=2023`, `#tradetab=balance`) · light/dark theme · persistent nav on all pages.

## Run it

```sh
node serve.ts          # serves app/ at http://localhost:8080
```

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and writes
`dossier.json` with the vendored `vendor/makefun-frontend.ts` library.

## License

MIT — see [LICENSE](LICENSE).
