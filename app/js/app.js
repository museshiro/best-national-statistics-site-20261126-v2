/* Indonesia in Numbers — page controls. Vanilla JS, classic scripts only,
   no fetch, no modules, works from file:// and any static server.
   Controls: year filter, tabs, sortable tables, live search, Chart/Table
   toggle, hover tooltip, hash routing, theme toggle, synchronous render. */
(function () {
  "use strict";
  var D = window.DATA;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function on(el, ev, fn) { if (el) el.addEventListener(ev, fn); }

  /* ---------- Theme ---------- */
  var themeBtn = $("#theme-toggle");
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("iin-theme", t); } catch (e) {}
    if (themeBtn) themeBtn.textContent = t === "dark" ? "☀ Light" : "◐ Dark";
  }
  var savedTheme = "light";
  try { savedTheme = localStorage.getItem("iin-theme") || "light"; } catch (e) {}
  applyTheme(savedTheme === "dark" ? "dark" : "light");
  on(themeBtn, "click", function () {
    applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  /* ---------- Hash routing: #yr=2023 and #tab=group:value ---------- */
  function readHash() {
    var h = {}, raw = (location.hash || "").replace(/^#/, "");
    raw.split("&").forEach(function (pair) {
      var kv = pair.split("=");
      if (kv[0]) h[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
    });
    return h;
  }
  function writeHash(patch) {
    var h = readHash();
    Object.keys(patch).forEach(function (k) { h[k] = patch[k]; });
    var s = Object.keys(h).map(function (k) { return k + "=" + h[k]; }).join("&");
    history.replaceState(null, "", s ? "#" + s : location.pathname);
  }
  var hash = readHash();

  /* ---------- Year filter ---------- */
  var yearSelects = $$(".year-select");
  var currentYear = 2024;
  if (hash.yr && D.byYear[+hash.yr]) currentYear = +hash.yr;
  function applyYear(y) {
    currentYear = y;
    yearSelects.forEach(function (sel) { sel.value = String(y); });
    /* Update KPI tiles that carry a data-year-key. */
    $$("[data-year-kpi]").forEach(function (tile) {
      var key = tile.getAttribute("data-year-kpi");
      var row = D.byYear[y];
      var val = tile.querySelector(".kpi-value");
      if (!val || !row) return;
      if (key === "growth") val.textContent = row.growth.toFixed(2) + "%";
      else if (key === "pop") val.textContent = row.pop.toFixed(1) + " mn";
      else if (key === "infl") val.textContent = row.infl.toFixed(2) + "%";
      else if (key === "unemp") val.textContent = row.unemp.toFixed(2) + "%";
      else if (key === "gdpNom") val.textContent = "Rp" + row.gdpNom.toLocaleString("en-US") + " T";
      else if (key === "gdpPc") val.textContent = "Rp" + row.gdpPc.toFixed(1) + " mn";
      else if (key === "exports") val.textContent = "US$" + row.exports.toFixed(1) + " bn";
      else if (key === "imports") val.textContent = "US$" + row.imports.toFixed(1) + " bn";
      var sub = tile.querySelector(".kpi-sub");
      if (sub) sub.textContent = "Year " + y + " · BPS";
    });
    /* Page-specific re-render hook (defined by each page's inline script). */
    if (typeof window.renderYear === "function") window.renderYear(y);
    writeHash({ yr: String(y) });
  }
  yearSelects.forEach(function (sel) {
    sel.value = String(currentYear);
    on(sel, "change", function () { applyYear(+sel.value); });
  });

  /* ---------- Tabs ---------- */
  function activateTab(group, value, push) {
    $$('[data-tabgroup="' + group + '"] [data-tab]').forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === value);
      btn.setAttribute("aria-selected", btn.getAttribute("data-tab") === value ? "true" : "false");
    });
    $$('[data-tabpanel="' + group + '"]').forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-panel") !== value;
    });
    if (push) writeHash({ tab: group + ":" + value });
  }
  $$("[data-tabgroup]").forEach(function (groupEl) {
    var group = groupEl.getAttribute("data-tabgroup");
    $$("[data-tab]", groupEl).forEach(function (btn) {
      on(btn, "click", function () { activateTab(group, btn.getAttribute("data-tab"), true); });
    });
  });
  if (hash.tab) {
    var parts = hash.tab.split(":");
    if (parts.length === 2) activateTab(parts[0], parts[1], false);
  }
  /* Deep links arriving after load (same-document hash change). */
  window.addEventListener("hashchange", function () {
    var h = readHash();
    if (h.yr && D.byYear[+h.yr] && +h.yr !== currentYear) applyYear(+h.yr);
    if (h.tab) {
      var p2 = h.tab.split(":");
      if (p2.length === 2) activateTab(p2[0], p2[1], false);
    }
  });

  /* ---------- Sortable tables ---------- */
  function sortTable(table, th, dir) {
    var tbody = table.tBodies[0];
    if (!tbody) return;
    var idx = Array.prototype.indexOf.call(th.parentNode.children, th);
    var rows = $$("tr", tbody);
    var numeric = th.hasAttribute("data-num");
    rows.sort(function (a, b) {
      var av = a.children[idx].getAttribute("data-value") || a.children[idx].textContent.trim();
      var bv = b.children[idx].getAttribute("data-value") || b.children[idx].textContent.trim();
      var cmp;
      if (numeric) cmp = parseFloat(av) - parseFloat(bv);
      else cmp = av.localeCompare(bv);
      return dir === "asc" ? cmp : -cmp;
    });
    rows.forEach(function (r) { tbody.appendChild(r); });
    $$("th", table).forEach(function (h) { h.removeAttribute("data-dir"); h.classList.remove("sorted"); });
    th.setAttribute("data-dir", dir);
    th.classList.add("sorted");
  }
  function wireSortable(table) {
    $$("th[data-sort]", table).forEach(function (th) {
      th.style.cursor = "pointer";
      on(th, "click", function () {
        var dir = th.getAttribute("data-dir") === "asc" ? "desc" : "asc";
        sortTable(table, th, dir);
      });
    });
  }
  $$("table[data-sortable]").forEach(wireSortable);
  window.wireSortable = wireSortable;

  /* ---------- Live search ---------- */
  $$("input[data-search]").forEach(function (input) {
    var target = $(input.getAttribute("data-search"));
    var counter = input.getAttribute("data-count") ? $(input.getAttribute("data-count")) : null;
    if (!target) return;
    var total = $$("tbody tr", target).length;
    function run() {
      var q = input.value.trim().toLowerCase(), shown = 0;
      $$("tbody tr", target).forEach(function (row) {
        var hit = !q || row.textContent.toLowerCase().indexOf(q) !== -1;
        row.style.display = hit ? "" : "none";
        if (hit) shown++;
        /* Highlight the matching cell text. */
        $$("td", row).forEach(function (cell) {
          var text = cell.textContent;
          if (q && text.toLowerCase().indexOf(q) !== -1) cell.classList.add("hit");
          else cell.classList.remove("hit");
        });
      });
      if (counter) counter.textContent = "showing " + shown + " of " + total;
    }
    on(input, "input", run);
    run();
  });

  /* ---------- Chart / Table toggle ---------- */
  $$("[data-toggle-table]").forEach(function (btn) {
    on(btn, "click", function () {
      var card = btn.closest(".chart-card");
      var holder = card ? $(".chart-holder", card) : null;
      if (!holder || !holder.__spec) return;
      var showingTable = holder.getAttribute("data-mode") === "table";
      if (showingTable) {
        window.Charts.render(holder, holder.__spec);
        holder.setAttribute("data-mode", "chart");
        btn.textContent = "Table";
      } else {
        holder.innerHTML = window.Charts.tableFor(holder.__spec);
        holder.setAttribute("data-mode", "table");
        btn.textContent = "Chart";
        window.wireSortable($("table", holder));
      }
    });
  });

  /* ---------- Hover tooltip ---------- */
  var tip = document.createElement("div");
  tip.id = "tooltip";
  tip.style.display = "none";
  document.body.appendChild(tip);
  document.addEventListener("mouseover", function (e) {
    var t = e.target;
    if (t && t.classList && t.classList.contains("pt")) {
      var title = t.querySelector("title");
      if (title) {
        tip.textContent = title.textContent;
        tip.style.display = "block";
      }
    }
  });
  document.addEventListener("mousemove", function (e) {
    if (tip.style.display === "block") {
      tip.style.left = Math.min(window.innerWidth - 180, e.pageX + 12) + "px";
      tip.style.top = (e.pageY + 14) + "px";
    }
  });
  document.addEventListener("mouseout", function (e) {
    if (e.target && e.target.classList && e.target.classList.contains("pt")) {
      tip.style.display = "none";
    }
  });

  /* ---------- Nav active state ---------- */
  var page = document.body.getAttribute("data-page");
  $$(".site-nav a").forEach(function (a) {
    if (a.getAttribute("data-nav") === page) a.classList.add("active");
  });

  /* ---------- Synchronous first render ---------- */
  /* All charts render on DOMContentLoaded, so screenshots are deterministic. */
  if (typeof window.renderYear === "function") window.renderYear(currentYear);
  else writeHash({ yr: String(currentYear) });
})();
