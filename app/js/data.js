/* Indonesia in Numbers — National Statistics Explorer.
   Single source of truth: every figure on the site comes from this file.
   Sources: BPS (Statistics Indonesia), Bank Indonesia, Ministry of Manpower
   (Permenaker No. 16/2024), World Bank, IMF, CIA World Factbook.
   Vintage 2024 unless a year is labelled. Values marked "~" are rounded
   from the source release; exact BPS figures are shown without "~". */
window.DATA = {
  meta: {
    country: "Indonesia",
    vintage: "2024",
    updated: "February 2025 (BPS releases)",
    islands: "17,500+",
    provinces: 38,
    currency: "IDR"
  },

  /* Headline KPIs, 2024 (verified BPS / BI / World Bank figures). */
  kpi: [
    { key: "gdp",     label: "Nominal GDP",        value: "Rp22,139 T",  sub: "≈ US$1.40 trillion · 2024" },
    { key: "growth",  label: "Real GDP growth",    value: "5.03%",       sub: "c-to-c · 2024" },
    { key: "gdppc",   label: "GDP per capita",     value: "Rp78.6 mn",   sub: "≈ US$4,960 · 2024" },
    { key: "pop",     label: "Population",         value: "281.6 mn",    sub: "4th most populous · 2024" },
    { key: "infl",    label: "Inflation (Dec y-on-y)", value: "1.57%",  sub: "CPI · Dec 2024" },
    { key: "unemp",   label: "Open unemployment",  value: "4.91%",       sub: "Aug 2024" },
    { key: "exports", label: "Exports of goods",   value: "US$264.7 bn", sub: "2024" },
    { key: "poverty", label: "Poverty rate",       value: "8.57%",       sub: "Sep 2024 · lowest since 1960" }
  ],

  /* Annual series 2015-2024 (BPS). gdpNom in Rp trillion, gdpPc in Rp million. */
  byYear: {
    2015: { growth: 4.88, pop: 258.7, infl: 3.35, unemp: 6.18, gdpNom: 11526, gdpPc: 45.2, exports: 150.4, imports: 142.7 },
    2016: { growth: 5.03, pop: 261.1, infl: 3.02, unemp: 5.61, gdpNom: 12407, gdpPc: 47.6, exports: 145.2, imports: 135.7 },
    2017: { growth: 5.07, pop: 263.5, infl: 3.61, unemp: 5.50, gdpNom: 13588, gdpPc: 51.7, exports: 168.8, imports: 156.9 },
    2018: { growth: 5.17, pop: 265.9, infl: 3.13, unemp: 5.34, gdpNom: 14838, gdpPc: 55.9, exports: 180.2, imports: 188.7 },
    2019: { growth: 5.02, pop: 268.2, infl: 2.72, unemp: 5.28, gdpNom: 15833, gdpPc: 59.1, exports: 167.7, imports: 171.3 },
    2020: { growth: -2.07, pop: 270.2, infl: 1.68, unemp: 7.07, gdpNom: 15443, gdpPc: 57.3, exports: 163.2, imports: 141.6 },
    2021: { growth: 3.69, pop: 272.7, infl: 1.87, unemp: 6.49, gdpNom: 16970, gdpPc: 62.4, exports: 231.5, imports: 196.2 },
    2022: { growth: 5.31, pop: 275.8, infl: 5.51, unemp: 5.86, gdpNom: 19588, gdpPc: 71.1, exports: 292.0, imports: 237.4 },
    2023: { growth: 5.05, pop: 278.7, infl: 2.61, unemp: 5.32, gdpNom: 20892, gdpPc: 75.0, exports: 258.9, imports: 221.9 },
    2024: { growth: 5.03, pop: 281.6, infl: 1.57, unemp: 4.91, gdpNom: 22139, gdpPc: 78.6, exports: 264.7, imports: 233.7 }
  },

  /* GDP by sector, share of GDP 2024 (%) — BPS. "Other services" ~9.3% closes the total. */
  sectors: [
    { name: "Manufacturing", share: 19.0 },
    { name: "Trade", share: 12.8 },
    { name: "Agriculture, forestry & fishing", share: 12.6 },
    { name: "Mining & quarrying", share: 10.6 },
    { name: "Construction", share: 9.8 },
    { name: "Transportation & storage", share: 5.6 },
    { name: "Financial & insurance", share: 4.9 },
    { name: "Information & communication", share: 4.1 },
    { name: "Public administration", share: 3.6 },
    { name: "Accommodation & food service", share: 3.4 },
    { name: "Real estate", share: 2.6 },
    { name: "Education", share: 1.7 },
    { name: "Other services", share: 9.3 }
  ],

  /* Top export commodities 2024, US$ billion (BPS / World Bank). */
  commodities: [
    { name: "Mineral fuels (incl. coal)", value: 44.0, hs: "HS 27" },
    { name: "Palm oil & derivatives", value: 25.6, hs: "HS 15" },
    { name: "Iron & steel", value: 18.0, hs: "HS 72–73" },
    { name: "Electrical machinery", value: 12.4, hs: "HS 85" },
    { name: "Nickel & articles", value: 10.2, hs: "HS 75" },
    { name: "Vehicles & parts", value: 6.4, hs: "HS 87" },
    { name: "Copper & articles", value: 6.0, hs: "HS 74" },
    { name: "Footwear", value: 6.0, hs: "HS 64" },
    { name: "Rubber & articles", value: 5.5, hs: "HS 40" },
    { name: "Apparel (knitted)", value: 4.8, hs: "HS 61" }
  ],

  /* Top export partners 2024, US$ billion (BPS / World Bank). */
  partners: [
    { name: "China", value: 62.6 },
    { name: "United States", value: 28.0 },
    { name: "Japan", value: 21.0 },
    { name: "India", value: 20.2 },
    { name: "Singapore", value: 18.0 },
    { name: "Malaysia", value: 12.4 },
    { name: "South Korea", value: 10.2 },
    { name: "Viet Nam", value: 7.6 },
    { name: "Philippines", value: 7.4 },
    { name: "Netherlands", value: 6.0 }
  ],

  /* Trade balance 2020-2024, US$ billion (World Bank). */
  trade: [
    { year: 2020, exports: 163.2, imports: 141.6, surplus: 21.6 },
    { year: 2021, exports: 231.5, imports: 196.2, surplus: 35.3 },
    { year: 2022, exports: 292.0, imports: 237.4, surplus: 54.6 },
    { year: 2023, exports: 258.9, imports: 221.9, surplus: 37.0 },
    { year: 2024, exports: 264.7, imports: 233.7, surplus: 31.0 }
  ],

  /* Most populous provinces 2024, million (BPS). */
  provincesPop: [
    { name: "West Java", pop: 50.345 },
    { name: "East Java", pop: 41.815 },
    { name: "Central Java", pop: 37.892 },
    { name: "North Sumatra", pop: 15.4 },
    { name: "Banten", pop: 12.431 },
    { name: "Jakarta", pop: 10.685 }
  ],

  /* Population by island group, share % (approximate, BPS 2024). */
  islands: [
    { name: "Java", share: 55.9 },
    { name: "Sumatra", share: 21.7 },
    { name: "Sulawesi", share: 7.3 },
    { name: "Kalimantan", share: 6.2 },
    { name: "Bali & Nusa Tenggara", share: 5.5 },
    { name: "Maluku & Papua", share: 3.4 }
  ],

  /* GRDP (PDRB) by province 2024, Rp trillion nominal, rounded (BPS). */
  pdrb: [
    { name: "Jakarta", value: 3680, pop: 10.685 },
    { name: "West Java", value: 2800, pop: 50.345 },
    { name: "East Java", value: 2700, pop: 41.815 },
    { name: "Central Java", value: 1900, pop: 37.892 },
    { name: "North Sumatra", value: 1050, pop: 15.4 },
    { name: "East Kalimantan", value: 950, pop: 4.0 },
    { name: "Banten", value: 900, pop: 12.431 },
    { name: "Riau", value: 850, pop: 6.9 },
    { name: "South Sulawesi", value: 750, pop: 9.5 },
    { name: "South Sumatra", value: 700, pop: 9.1 }
  ],

  /* GRDP per capita 2024, Rp million. Jakarta/Banten/Yogyakarta are exact
     BPS figures; the rest are derived from rounded GRDP and population (~). */
  pdrbPc: [
    { name: "Jakarta", value: 344.35, exact: true },
    { name: "East Kalimantan", value: 237, exact: false },
    { name: "Riau", value: 123, exact: false },
    { name: "South Sulawesi", value: 79, exact: false },
    { name: "South Sumatra", value: 77, exact: false },
    { name: "Banten", value: 70.28, exact: true },
    { name: "North Sumatra", value: 68, exact: false },
    { name: "East Java", value: 65, exact: false },
    { name: "West Java", value: 56, exact: false },
    { name: "Yogyakarta", value: 51.47, exact: true }
  ],

  /* Provincial minimum wage (UMP) 2025, Rp/month — verified figures only
     (Ministry of Manpower / Permenaker No. 16/2024). National average rose
     6.5%; median of the verified set is Rp2,996,560 (Bali). The official
     2025 list covers 37 provinces; Central Papua Highlands (Papua
     Pegunungan) is unverified and is not shown. Lowest verified: Central
     Java Rp2,169,349. Highest: Jakarta Rp5,396,761. */
  ump: [
    { name: "Jakarta", value: 5396761 },
    { name: "Aceh", value: 3685616 },
    { name: "South Sumatra", value: 3681571 },
    { name: "South Sulawesi", value: 3657527 },
    { name: "East Kalimantan", value: 3579314 },
    { name: "Riau", value: 3508776 },
    { name: "Bali", value: 2996560 },
    { name: "North Sumatra", value: 2992559 },
    { name: "Banten", value: 2905119 },
    { name: "West Nusa Tenggara", value: 2602931 },
    { name: "East Java", value: 2305985 },
    { name: "West Java", value: 2191232 },
    { name: "Central Java", value: 2169349 }
  ],
  umpMedian: 2996560,

  /* Welfare series 2015-2024 (BPS, September for poverty). */
  hdi: [
    { year: 2015, value: 69.55 }, { year: 2016, value: 70.18 },
    { year: 2017, value: 70.81 }, { year: 2018, value: 71.39 },
    { year: 2019, value: 71.92 }, { year: 2020, value: 71.94 },
    { year: 2021, value: 72.29 }, { year: 2022, value: 73.86 },
    { year: 2023, value: 74.39 }, { year: 2024, value: 75.02 }
  ],
  gini: [
    { year: 2015, value: 0.408 }, { year: 2016, value: 0.394 },
    { year: 2017, value: 0.391 }, { year: 2018, value: 0.384 },
    { year: 2019, value: 0.380 }, { year: 2020, value: 0.381 },
    { year: 2021, value: 0.381 }, { year: 2022, value: 0.379 },
    { year: 2023, value: 0.379 }, { year: 2024, value: 0.379 }
  ],
  poverty: [
    { year: 2015, value: 11.13 }, { year: 2016, value: 10.86 },
    { year: 2017, value: 10.64 }, { year: 2018, value: 9.82 },
    { year: 2019, value: 9.41 }, { year: 2020, value: 9.78 },
    { year: 2021, value: 9.71 }, { year: 2022, value: 9.57 },
    { year: 2023, value: 9.36 }, { year: 2024, value: 8.57 }
  ],

  /* HDI by province 2024 (BPS, rounded ~). Top 10 and bottom 10. */
  hdiTop: [
    { name: "Jakarta", value: 84.15 }, { name: "Yogyakarta", value: 81.62 },
    { name: "East Kalimantan", value: 80.34 }, { name: "Riau Islands", value: 79.08 },
    { name: "Bali", value: 78.72 }, { name: "Banten", value: 77.70 },
    { name: "West Java", value: 75.91 }, { name: "Riau", value: 75.85 },
    { name: "West Sumatra", value: 75.79 }, { name: "East Java", value: 75.23 }
  ],
  hdiBottom: [
    { name: "Central Papua", value: 61.94 }, { name: "South Papua", value: 64.14 },
    { name: "Papua", value: 65.39 }, { name: "Southwest Papua", value: 68.99 },
    { name: "East Nusa Tenggara", value: 69.62 }, { name: "West Sulawesi", value: 70.92 },
    { name: "Gorontalo", value: 71.27 }, { name: "North Maluku", value: 71.32 },
    { name: "West Kalimantan", value: 71.84 }, { name: "Central Kalimantan", value: 72.08 }
  ],

  /* Prices & money. */
  fxAnnual: [
    { year: 2020, value: 14577 }, { year: 2021, value: 14295 },
    { year: 2022, value: 14871 }, { year: 2023, value: 15255 },
    { year: 2024, value: 15855 }
  ],
  reserves: [
    { year: 2020, value: 135.9 }, { year: 2021, value: 144.9 },
    { year: 2022, value: 137.2 }, { year: 2023, value: 146.4 },
    { year: 2024, value: 155.7 }
  ],
  /* Monthly CPI inflation y-on-y, Jan 2023 - Dec 2024 (BPS). */
  inflMonthly: [
    { m: "Jan 23", value: 5.28 }, { m: "Feb 23", value: 5.47 },
    { m: "Mar 23", value: 4.97 }, { m: "Apr 23", value: 4.33 },
    { m: "May 23", value: 4.00 }, { m: "Jun 23", value: 3.52 },
    { m: "Jul 23", value: 3.08 }, { m: "Aug 23", value: 3.27 },
    { m: "Sep 23", value: 2.28 }, { m: "Oct 23", value: 2.56 },
    { m: "Nov 23", value: 2.86 }, { m: "Dec 23", value: 2.61 },
    { m: "Jan 24", value: 2.57 }, { m: "Feb 24", value: 2.75 },
    { m: "Mar 24", value: 3.05 }, { m: "Apr 24", value: 3.00 },
    { m: "May 24", value: 2.84 }, { m: "Jun 24", value: 2.51 },
    { m: "Jul 24", value: 2.13 }, { m: "Aug 24", value: 2.12 },
    { m: "Sep 24", value: 1.84 }, { m: "Oct 24", value: 1.71 },
    { m: "Nov 24", value: 1.55 }, { m: "Dec 24", value: 1.57 }
  ],
  /* BI-Rate (policy rate) monthly, Jan 2023 - Dec 2024 (Bank Indonesia). */
  biRate: [
    { m: "Jan 23", value: 5.75 }, { m: "Feb 23", value: 5.75 },
    { m: "Mar 23", value: 5.75 }, { m: "Apr 23", value: 5.75 },
    { m: "May 23", value: 5.75 }, { m: "Jun 23", value: 5.75 },
    { m: "Jul 23", value: 5.75 }, { m: "Aug 23", value: 5.75 },
    { m: "Sep 23", value: 5.75 }, { m: "Oct 23", value: 6.00 },
    { m: "Nov 23", value: 6.00 }, { m: "Dec 23", value: 6.00 },
    { m: "Jan 24", value: 6.00 }, { m: "Feb 24", value: 6.00 },
    { m: "Mar 24", value: 6.00 }, { m: "Apr 24", value: 6.25 },
    { m: "May 24", value: 6.25 }, { m: "Jun 24", value: 6.25 },
    { m: "Jul 24", value: 6.25 }, { m: "Aug 24", value: 6.25 },
    { m: "Sep 24", value: 6.00 }, { m: "Oct 24", value: 6.00 },
    { m: "Nov 24", value: 6.00 }, { m: "Dec 24", value: 6.00 }
  ],

  /* Age structure 2024, share of population % (approximate, BPS). */
  ageGroups: [
    { name: "0–14 years", share: 24.9 },
    { name: "15–64 years (working age)", share: 68.2 },
    { name: "65+ years", share: 6.9 }
  ],

  /* All 38 provinces (names only — used for the sitemap/coverage list). */
  provincesAll: [
    "Aceh", "North Sumatra", "West Sumatra", "Riau", "Jambi",
    "South Sumatra", "Bengkulu", "Lampung", "Bangka Belitung",
    "Riau Islands", "Jakarta", "West Java", "Central Java",
    "Yogyakarta", "East Java", "Banten", "Bali",
    "West Nusa Tenggara", "East Nusa Tenggara",
    "West Kalimantan", "Central Kalimantan", "South Kalimantan",
    "East Kalimantan", "North Kalimantan",
    "North Sulawesi", "Central Sulawesi", "South Sulawesi",
    "Southeast Sulawesi", "Gorontalo", "West Sulawesi",
    "Maluku", "North Maluku", "Papua", "West Papua",
    "South Papua", "Central Papua", "Highland Papua",
    "Southwest Papua"
  ],

  /* Extra verified facts used across pages. */
  facts: {
    gdpPpp: "US$4.67 trillion (IMF est.)",
    gdpPppPc: "US$14,500 (est.)",
    lifeExpectancy: "74.15 years",
    povertyLine: "Rp595,242 /capita/month (Sep 2024)",
    povertyCount: "24.06 million people",
    literacy: "96.70% (age 15+, 2023 Susenas)",
    biRateDec: "6.00%",
    reservesDec: "US$155.7 billion",
    census2010: 237.6
  }
};

/* Helper: sorted list of years covered by the annual series. */
DATA.years = Object.keys(DATA.byYear).map(Number).sort(function (a, b) { return a - b; });
