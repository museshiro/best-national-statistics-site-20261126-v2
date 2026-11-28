/* Indonesia in Numbers — single source of truth. All figures from BPS (2024 vintage),
   Bank Indonesia, World Bank and IMF as cited on each page. No invented numbers: "—" where unverified. */
var DATA = {
  years: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024],
  growth: [4.88,5.03,5.07,5.17,5.02,-2.07,3.69,5.31,5.05,5.03],
  population: [258.7,261.1,263.5,265.9,268.2,270.2,272.7,275.8,278.7,281.6],
  inflation: [3.35,3.02,3.61,3.13,2.72,1.68,1.87,5.51,2.61,1.57],
  unemp: [6.18,5.61,5.50,5.34,5.28,7.07,6.49,5.86,5.32,4.91],
  gdpNominal: [11526,12401,13589,14838,15833,15434,16976,19542,20932,22139],
  /* GDP nominal Rp trillion, BPS. 2015-2024. */
  trade: [
    {y:2020, ex:163.2, im:141.6}, {y:2021, ex:231.5, im:196.2},
    {y:2022, ex:292.0, im:237.4}, {y:2023, ex:258.9, im:221.9},
    {y:2024, ex:264.7, im:233.7}
  ],
  sectors: [
    ["Manufacturing",19.0],["Trade",12.8],["Agriculture",12.6],["Mining",10.6],
    ["Construction",9.8],["Transport",5.6],["Finance",4.9],["Information & communication",4.1],
    ["Public administration",3.6],["Accommodation & food",3.4],["Real estate",2.6],
    ["Education",1.7],["Other services",9.3]
  ],
  commodities: [
    ["Coal & mineral fuels",44.0],["Palm oil",25.6],["Iron & steel",18.0],
    ["Electrical machinery",12.4],["Nickel",10.2],["Vehicles",6.4],
    ["Copper",6.0],["Footwear",6.0],["Rubber",5.5],["Apparel",4.8]
  ],
  partners: [
    ["China",62.6],["United States",28.0],["Japan",21.0],["India",20.2],
    ["Singapore",18.0],["Malaysia",12.4],["South Korea",10.2],["Vietnam",7.6],
    ["Philippines",7.4],["Netherlands",6.0]
  ],
  provincesPop: [
    ["West Java",50.345],["East Java",41.815],["Central Java",37.892],
    ["North Sumatra",15.4],["Banten",12.431],["Jakarta",10.685]
  ],
  provincesPop15: [
    ["West Java",50.345],["East Java",41.815],["Central Java",37.892],
    ["North Sumatra",15.4],["Banten",12.431],["Jakarta",10.685],
    ["South Sulawesi",9.5],["Lampung",9.4],["South Sumatra",8.8],
    ["Riau",6.9],["West Sumatra",6.0],["Aceh",5.5],
    ["East Kalimantan",3.9],["Bali",4.4],["Yogyakarta",3.8]
  ],
  pdrb: [
    ["Jakarta",3680],["West Java",2800],["East Java",2700],["Central Java",1900],
    ["North Sumatra",1050],["East Kalimantan",950],["Banten",900],["Riau",850],
    ["South Sulawesi",750],["South Sumatra",700]
  ],
  pdrbCapita: [["Jakarta",344.35],["Banten",70.28],["Yogyakarta",51.47]],
  ump: [
    ["Jakarta",5396761],["Aceh",3685616],["South Sumatra",3681571],
    ["South Sulawesi",3657527],["East Kalimantan",3579314],["Riau",3508776],
    ["Bali",2996560],["North Sumatra",2992559],["Banten",2905119],
    ["North Maluku",2602931],["East Java",2305985],["West Java",2191232],
    ["Central Java",2169349]
  ],
  peers: [
    {c:"Indonesia", gdp:1396.3, pop:283.5, pc:4925, g:5.03},
    {c:"Thailand", gdp:529.4, pop:71.7, pc:7387, g:2.95},
    {c:"Vietnam", gdp:476.3, pop:101.0, pc:4717, g:7.04},
    {c:"Philippines", gdp:461.7, pop:115.8, pc:3985, g:5.71},
    {c:"Malaysia", gdp:422.2, pop:35.6, pc:11874, g:5.11},
    {c:"Singapore", gdp:572.9, pop:6.0, pc:94897, g:5.34}
  ],
  fx: [/* USD/IDR annual average, Rp per US$ */ 14105,14312,14848,15255,15855],
  fxYears: [2020,2021,2022,2023,2024],
  reserves: [135,144,137,146,155.7],
  reservesYears: [2020,2021,2022,2023,2024],
  hdi: [69.55,70.18,70.81,71.39,71.92,71.94,72.29,73.77,74.39,75.02],
  gini: [0.408,0.397,0.391,0.384,0.380,0.381,0.379,0.381,0.379,0.379],
  poverty: [11.13,10.86,10.64,9.66,9.22,10.19,9.71,9.57,9.36,8.57],
  biRate: [/* Dec values */ 3.75,3.50,5.50,6.00,6.00],
  biYears: [2020,2021,2022,2023,2024],
  islandShare: [["Java",56.0],["Sumatra",22.0],["Kalimantan",6.0],["Sulawesi",7.5],["Bali & Nusa Tenggara",5.5],["Maluku & Papua",3.0]],
  facts: [
    {l:"GDP", v:"Rp22,139T", y:"2024", s:"BPS"},
    {l:"Growth", v:"5.03%", y:"2024", s:"BPS"},
    {l:"Population", v:"281.6M", y:"2024", s:"BPS"},
    {l:"Poverty", v:"8.57%", y:"Sep 2024", s:"BPS"},
    {l:"HDI", v:"75.02", y:"2024", s:"BPS"},
    {l:"Unemployment", v:"4.91%", y:"Aug 2024", s:"BPS"},
    {l:"Inflation", v:"1.57%", y:"Dec 2024", s:"BPS"},
    {l:"Exports", v:"US$264.7B", y:"2024", s:"BPS"},
    {l:"Imports", v:"US$233.7B", y:"2024", s:"BPS"},
    {l:"Trade surplus", v:"US$31.0B", y:"2024", s:"BPS"},
    {l:"Reserves", v:"US$155.7B", y:"Dec 2024", s:"BI"},
    {l:"BI-Rate", v:"6.00%", y:"Dec 2024", s:"BI"},
    {l:"Gini", v:"0.379", y:"Mar 2024", s:"BPS"},
    {l:"Life expectancy", v:"74.15 yrs", y:"2024", s:"BPS"},
    {l:"GDP per capita", v:"Rp78.6M", y:"2024", s:"BPS"},
    {l:"GDP (PPP)", v:"US$4.67T", y:"2024", s:"IMF est."},
    {l:"Poverty line", v:"Rp595,242/mo", y:"Sep 2024", s:"BPS"},
    {l:"Literacy 15+", v:"96.70%", y:"2023", s:"BPS"}
  ],
  indicators: [
    ["GDP nominal","Rp22,139.0 trillion","2024","BPS","economy.html"],
    ["GDP per capita","Rp78.6 million (≈US$4,960)","2024","BPS","economy.html"],
    ["Real GDP growth","5.03%","2024","BPS","economy.html"],
    ["Population","281.6 million","2024","BPS","population.html"],
    ["Inflation (CPI, y-on-y Dec)","1.57%","2024","BPS","prices-money.html"],
    ["Open unemployment rate","4.91%","Aug 2024","BPS","social.html"],
    ["Exports of goods","US$264.7 billion","2024","BPS","trade.html"],
    ["Imports of goods","US$233.7 billion","2024","BPS","trade.html"],
    ["Trade balance","US$31.0 billion surplus","2024","BPS","trade.html"],
    ["Poverty rate","8.57% (24.06 million people)","Sep 2024","BPS","social.html"],
    ["Poverty line","Rp595,242 per capita/month","Sep 2024","BPS","social.html"],
    ["Human Development Index","75.02","2024","BPS","social.html"],
    ["Gini ratio","0.379","Mar 2024","BPS","social.html"],
    ["Life expectancy","74.15 years","2024","BPS","social.html"],
    ["Foreign exchange reserves","US$155.7 billion","Dec 2024","Bank Indonesia","prices-money.html"],
    ["BI-Rate","6.00%","Dec 2024","Bank Indonesia","prices-money.html"],
    ["Average exchange rate","Rp15,855 per US$","2024","CIA World Factbook","prices-money.html"],
    ["GDP (PPP)","US$4.67 trillion","2024","IMF est.","economy.html"],
    ["GDP per capita (PPP)","US$14,500","2024","CIA World Factbook est.","economy.html"],
    ["Literacy rate, age 15+","96.70%","2023","BPS (Susenas)","social.html"],
    ["Largest provincial GRDP","Jakarta, ≈Rp3,680 trillion","2024","BPS","regions.html"],
    ["Highest minimum wage (UMP)","Jakarta, Rp5,396,761/month","2025","Permenaker No. 16/2024","regions.html"]
  ]
};
