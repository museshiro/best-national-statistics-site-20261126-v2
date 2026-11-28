/* Indonesia in Numbers — page behaviour: theme, year filter, tabs, sortable tables,
   live search, fact strip, chart/table toggle, tooltips, hash routing. Vanilla, offline. */
(function () {
  var D = window.DATA, C = window.Charts;
  function $(s, r){ return (r || document).querySelector(s); }
  function $all(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function byId(id){ return document.getElementById(id); }
  /* ---------- theme ---------- */
  var saved = null;
  try { saved = localStorage.getItem("iin-theme"); } catch (e) {}
  if (saved) document.documentElement.setAttribute("data-theme", saved);
  function toggleTheme(){
    var cur = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", cur);
    try { localStorage.setItem("iin-theme", cur); } catch (e) {}
    var b = byId("themeBtn"); if (b) b.textContent = cur === "dark" ? "☀ Light" : "◐ Dark";
  }
  /* ---------- tooltip ---------- */
  var tip = document.createElement("div"); tip.id = "tooltip"; document.body.appendChild(tip);
  document.addEventListener("mouseover", function (e){
    var t = e.target && e.target.querySelector ? e.target.querySelector("title") : null;
    var tt = e.target && e.target.tagName && (e.target.tagName === "circle" || e.target.tagName === "rect" || e.target.tagName === "path");
    if (tt && e.target.querySelector("title")) {
      tip.textContent = e.target.querySelector("title").textContent;
      tip.style.display = "block";
    } else if (!e.target.closest || !e.target.closest("svg")) { tip.style.display = "none"; }
  });
  document.addEventListener("mousemove", function (e){
    if (tip.style.display === "block") { tip.style.left = (e.clientX + 12) + "px"; tip.style.top = (e.clientY + 12) + "px"; }
  });
  /* ---------- sortable tables ---------- */
  function numVal(t){ var n = parseFloat(String(t).replace(/[^0-9.\-]/g, "")); return isNaN(n) ? null : n; }
  $all("table.sortable").forEach(function (tbl){
    $all("th", tbl).forEach(function (th, idx){
      th.addEventListener("click", function (){
        var tb = tbl.tBodies[0], rows = $all("tr", tb);
        var asc = th.getAttribute("data-dir") !== "asc";
        $all("th", tbl).forEach(function (h){ h.removeAttribute("data-dir"); h.textContent = h.textContent.replace(/ [▲▼]$/, ""); });
        th.setAttribute("data-dir", asc ? "asc" : "desc");
        th.textContent += asc ? " ▲" : " ▼";
        rows.sort(function (a, b){
          var av = a.cells[idx].textContent.trim(), bv = b.cells[idx].textContent.trim();
          var an = numVal(av), bn = numVal(bv);
          if (an != null && bn != null) return asc ? an - bn : bn - an;
          return asc ? av.localeCompare(bv) : bv.localeCompare(av);
        });
        rows.forEach(function (r){ tb.appendChild(r); });
      });
    });
  });
  /* ---------- live search ---------- */
  function bindSearch(input, listSel, countEl){
    if (!input) return;
    input.addEventListener("input", function (){
      var q = input.value.trim().toLowerCase(), n = 0, total = 0;
      $all(listSel).forEach(function (el){
        total++;
        var hit = !q || el.textContent.toLowerCase().indexOf(q) !== -1;
        el.style.display = hit ? "" : "none";
        if (hit) n++;
      });
      if (countEl) countEl.textContent = "Showing " + n + " of " + total;
      $all("mark", document).forEach(function (m){
        var p = m.parentNode; if (p) p.replaceChild(document.createTextNode(m.textContent), m); p.normalize();
      });
      if (q) $all(listSel).forEach(function (el){
        if (el.style.display === "none") return;
        var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        var nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(function (node){
          var i = node.nodeValue.toLowerCase().indexOf(q);
          if (i > -1 && node.nodeValue.length < 120) {
            var mark = document.createElement("mark");
            mark.textContent = node.nodeValue.substr(i, q.length);
            var after = node.splitText(i); after.splitText(q.length);
            after.parentNode.replaceChild(mark, after);
          }
        });
      });
    });
  }
  bindSearch(byId("factSearch"), ".chip", byId("factCount"));
  bindSearch(byId("indSearch"), "#indTable tbody tr", byId("indCount"));
  bindSearch(byId("provSearch"), "#provTable tbody tr", byId("provCount"));
  bindSearch(byId("commSearch"), "#commTable tbody tr", null);
  /* ---------- fact strip ---------- */
  var strip = byId("factStrip");
  if (strip && D) {
    D.facts.forEach(function (f){
      var c = document.createElement("span"); c.className = "chip";
      c.innerHTML = "<b>" + C.esc(f.l) + "</b> " + C.esc(f.v) + " · " + C.esc(f.y) + " · " + C.esc(f.s);
      strip.appendChild(c);
    });
    var fc = byId("factCount"); if (fc) fc.textContent = "Showing " + D.facts.length + " of " + D.facts.length;
  }
  /* ---------- tabs ---------- */
  $all("[data-tabgroup]").forEach(function (btn){
    btn.addEventListener("click", function (){
      var g = btn.getAttribute("data-tabgroup");
      $all('[data-tabgroup="' + g + '"]').forEach(function (b){ b.classList.toggle("on", b === btn); });
      $all('[data-tabpanel="' + g + '"]').forEach(function (p){ p.style.display = p.getAttribute("data-tab") === btn.getAttribute("data-tab") ? "" : "none"; });
      try { history.replaceState(null, "", "#" + g + "=" + btn.getAttribute("data-tab")); } catch (e) {}
    });
  });
  /* ---------- chart <-> table toggle ---------- */
  $all("[data-chart-toggle]").forEach(function (btn){
    btn.addEventListener("click", function (){
      var box = document.getElementById(btn.getAttribute("data-chart-toggle"));
      if (!box) return;
      var tbl = box.querySelector(".chart-table"), svg = box.querySelector("svg");
      var showing = tbl && tbl.style.display !== "none";
      if (tbl) tbl.style.display = showing ? "none" : "";
      if (svg) svg.style.display = showing ? "" : "none";
      btn.textContent = showing ? "View as table" : "View as chart";
    });
  });
  /* ---------- year filter ---------- */
  var yrSel = byId("yearSel");
  function applyYear(y){
    var i = D.years.indexOf(+y);
    if (i < 0) return;
    $all("[data-year-kpi]").forEach(function (el){
      var k = el.getAttribute("data-year-kpi");
      if (k === "growth") el.textContent = D.growth[i].toFixed(2) + "%";
      if (k === "pop") el.textContent = D.population[i].toFixed(1) + "M";
      if (k === "infl") el.textContent = D.inflation[i].toFixed(2) + "%";
      if (k === "gdp") el.textContent = "Rp" + C.fmt(D.gdpNominal[i]) + "T";
    });
    var gl = byId("growthChart");
    if (gl) gl.innerHTML = C.line(D.years.slice(4), D.growth.slice(4), {unit:"Real GDP growth, %", dec:2, title:"Real GDP growth 2019-2024"});
  }
  if (yrSel) yrSel.addEventListener("change", function (){ applyYear(yrSel.value); });
  /* ---------- hash routing ---------- */
  function readHash(){
    var h = location.hash.replace(/^#/, "");
    h.split("&").forEach(function (part){
      var kv = part.split("=");
      if (kv[0] === "yr" && yrSel) { yrSel.value = kv[1]; applyYear(kv[1]); }
      if (kv[0]) {
        var b = document.querySelector('[data-tabgroup="' + kv[0] + '"][data-tab="' + kv[1] + '"]');
        if (b) b.click();
      }
    });
  }
  /* ---------- chart rendering per page ----------
     Charts mount into empty divs by id; every builder returns an SVG string
     with units, ticks and end labels, plus a <title> per data point. */
  function mount(id, html){ var el = byId(id); if (el) el.innerHTML = html; }
  var page = document.body.getAttribute("data-page");
  if (page === "index" && D) {
    mount("growthChart", C.line(D.years.slice(4), D.growth.slice(4), {unit:"Real GDP growth, %", dec:2, area:true, title:"Real GDP growth 2019-2024"}));
    mount("sectorChart", C.donut(D.sectors.slice(0, 6).concat([["Other", 29.6]]), {center:"19.0%", centerSub:"Manufacturing", title:"GDP by sector 2024"}));
    mount("provChart", C.barH(D.provincesPop.map(function (p){ return p[0]; }), D.provincesPop.map(function (p){ return p[1]; }), {unit:"Population, millions (2024)", dec:1, title:"Most populous provinces 2024"}));
    mount("fxChart", C.line(D.fxYears.map(String), D.fx, {unit:"Rp per US$, annual average", dec:0, title:"Rupiah per US dollar 2020-2024"}));
    applyYear("2024");
  }
  if (page === "economy" && D) {
    mount("gdpChart", C.barV(D.years.map(String), D.gdpNominal, {unit:"Nominal GDP, Rp trillion", dec:0, title:"Nominal GDP 2015-2024"}));
    mount("growthChart2", C.line(D.years.map(String), D.growth, {unit:"Real GDP growth, %", dec:2, min:-3, title:"Real GDP growth 2015-2024"}));
    mount("sectorChart2", C.donut(D.sectors, {center:"19.0%", centerSub:"Manufacturing", title:"GDP by sector 2024"}));
    applyYear("2024");
  }
  if (page === "trade" && D) {
    var yrs = D.trade.map(function (t){ return String(t.y); });
    mount("tradeChart", C.barV(yrs, D.trade.map(function (t){ return t.ex; }), {unit:"US$ billion", dec:1, colors:["#C8102E"], title:"Exports 2020-2024"}));
    mount("commChart", C.barH(D.commodities.map(function (x){ return x[0]; }), D.commodities.map(function (x){ return x[1]; }), {unit:"US$ billion, 2024", dec:1, title:"Top export commodities 2024"}));
    mount("partnerChart", C.barH(D.partners.map(function (x){ return x[0]; }), D.partners.map(function (x){ return x[1]; }), {unit:"US$ billion, 2024", dec:1, colors:["#1F4E79"], title:"Top export partners 2024"}));
    mount("surplusChart", C.line(yrs, D.trade.map(function (t){ return +(t.ex - t.im).toFixed(1); }), {unit:"Trade surplus, US$ billion", dec:1, title:"Trade surplus 2020-2024"}));
  }
  if (page === "population" && D) {
    mount("popChart", C.line(D.years.map(String), D.population, {unit:"Population, millions", dec:1, min:240, area:true, title:"Population 2015-2024"}));
    mount("provChart15", C.barH(D.provincesPop15.map(function (x){ return x[0]; }), D.provincesPop15.map(function (x){ return x[1]; }), {unit:"Population, millions (2024)", dec:1, title:"Most populous provinces 2024"}));
    mount("islandChart", C.donut(D.islandShare, {center:"56%", centerSub:"Java share", title:"Population by island group, approx."}));
  }
  if (page === "regions" && D) {
    mount("pdrbChart", C.barH(D.pdrb.map(function (x){ return x[0]; }), D.pdrb.map(function (x){ return x[1]; }), {unit:"GRDP, Rp trillion (≈), 2024", dec:0, title:"Largest provincial economies 2024"}));
    mount("pdrbCapChart", C.barV(D.pdrbCapita.map(function (x){ return x[0]; }), D.pdrbCapita.map(function (x){ return x[1]; }), {unit:"Rp million per capita, 2024", dec:0, title:"GRDP per capita 2024"}));
    mount("umpChart", C.barH(D.ump.map(function (x){ return x[0]; }), D.ump.map(function (x){ return x[1]; }), {unit:"Rp per month, UMP 2025", dec:0, title:"Provincial minimum wage 2025"}));
    mount("scatterChart", C.scatter([
      ["Jakarta",10.685,3680],["West Java",50.345,2800],["East Java",41.815,2700],
      ["Central Java",37.892,1900],["North Sumatra",15.4,1050],["Banten",12.431,900]
    ], {yUnit:"GRDP, Rp trillion", xUnit:"Population, millions (2024)", title:"Population vs GRDP"}));
  }
  if (page === "prices" && D) {
    mount("inflChart", C.line(D.years.map(String), D.inflation, {unit:"CPI inflation, % y-on-y", dec:2, min:0, title:"Inflation 2015-2024"}));
    mount("rateChart", C.line(D.biYears.map(String), D.biRate, {unit:"BI-Rate, % (December)", dec:2, min:0, title:"BI-Rate 2020-2024"}));
    mount("resChart", C.line(D.reservesYears.map(String), D.reserves, {unit:"US$ billion", dec:1, min:120, area:true, title:"Foreign exchange reserves 2020-2024"}));
  }
  if (page === "social" && D) {
    mount("hdiChart", C.line(D.years.map(String), D.hdi, {unit:"Human Development Index", dec:2, min:65, title:"HDI 2015-2024"}));
    mount("giniChart", C.line(D.years.map(String), D.gini, {unit:"Gini ratio", dec:3, min:0.35, title:"Gini ratio 2015-2024"}));
    mount("povChart", C.line(D.years.map(String), D.poverty, {unit:"Poverty rate, %", dec:2, min:0, title:"Poverty rate 2015-2024"}));
  }
  if (page === "peers" && D) {
    var pc = D.peers;
    mount("peerGdp", C.barV(pc.map(function (p){ return p.c; }), pc.map(function (p){ return p.gdp; }), {unit:"Nominal GDP, US$ billion (2024)", dec:1, short:["IDN","THA","VNM","PHL","MYS","SGP"], title:"Nominal GDP, ASEAN peers 2024"}));
    mount("peerPc", C.barV(pc.map(function (p){ return p.c; }), pc.map(function (p){ return p.pc; }), {unit:"GDP per capita, US$ (2024)", dec:0, short:["IDN","THA","VNM","PHL","MYS","SGP"], title:"GDP per capita, ASEAN peers 2024"}));
    mount("peerGrowth", C.barV(pc.map(function (p){ return p.c; }), pc.map(function (p){ return p.g; }), {unit:"Real GDP growth, % (2024)", dec:2, short:["IDN","THA","VNM","PHL","MYS","SGP"], title:"Real GDP growth, ASEAN peers 2024"}));
    mount("peerPop", C.barV(pc.map(function (p){ return p.c; }), pc.map(function (p){ return p.pop; }), {unit:"Population, millions (2024)", dec:1, short:["IDN","THA","VNM","PHL","MYS","SGP"], title:"Population, ASEAN peers 2024"}));
  }
  /* theme button + hash */
  var tb = byId("themeBtn");
  if (tb) { tb.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "☀ Light" : "◐ Dark"; tb.addEventListener("click", toggleTheme); }
  readHash();
})();
