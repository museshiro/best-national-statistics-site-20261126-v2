/* Indonesia in Numbers — hand-rolled SVG chart generators.
   No libraries, no network. Every chart is an inline SVG with labelled
   axes, end values and a source line, plus a hover tooltip hit-area on
   every data point (circles carry data-tip, handled by app.js).
   Specs are kept on the container so the Chart/Table toggle can render
   the same numbers as an accessible table. */
window.Charts = (function () {
  "use strict";
  var W = 640, H = 300, PAD = { l: 56, r: 14, t: 14, b: 34 };
  var PALETTE = ["#0e6b6b", "#1f4e79", "#b3392e", "#c77d0a", "#2e7d32",
    "#6a4c93", "#8a5a00", "#375f8a", "#7a2e5d", "#4a7c59", "#94521b",
    "#5b6770", "#9e2b25"];
  var GRID = "#d8d2c4", AXIS = "#8a8378", TEXT = "#3d3a33";

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function fmt(v, f) {
    if (f === "pct1") return v.toFixed(1) + "%";
    if (f === "pct2") return v.toFixed(2) + "%";
    if (f === "int") return String(Math.round(v));
    if (f === "k") return "Rp" + v.toLocaleString("en-US");
    if (f === "usd") return "US$" + v.toFixed(1) + " bn";
    if (f === "num1") return v.toFixed(1);
    if (f === "num2") return v.toFixed(2);
    if (f === "num3") return v.toFixed(3);
    return String(v);
  }
  function niceTicks(min, max, n) {
    if (min === max) { min -= 1; max += 1; }
    var step = (max - min) / (n || 4), mag = Math.pow(10, Math.floor(Math.log10(step)));
    var norm = step / mag;
    var nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
    step = nice * mag;
    var lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step;
    var out = [], v = lo;
    while (v <= hi + 1e-9) { out.push(+v.toFixed(6)); v += step; }
    return out;
  }
  function pts(spec, i, min, max) {
    var x0 = PAD.l, x1 = W - PAD.r, y0 = PAD.t, y1 = H - PAD.b;
    var n = spec.labels.length;
    var x = n === 1 ? (x0 + x1) / 2 : x0 + (i * (x1 - x0)) / (n - 1);
    var y = y1 - ((spec.series[0].values[i] - min) / (max - min)) * (y1 - y0);
    return [x, y];
  }
  function axisLabels(spec, min, max) {
    var ticks = niceTicks(min, max, 4), out = "";
    var y0 = PAD.t, y1 = H - PAD.b;
    ticks.forEach(function (t) {
      var y = y1 - ((t - min) / (max - min)) * (y1 - y0);
      out += '<line x1="' + PAD.l + '" y1="' + y.toFixed(1) + '" x2="' + (W - PAD.r) +
        '" y2="' + y.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>' +
        '<text x="' + (PAD.l - 8) + '" y="' + (y + 4).toFixed(1) +
        '" text-anchor="end" font-size="11" fill="' + TEXT + '">' + fmt(t, spec.tickFmt || spec.valueFmt) + "</text>";
    });
    var n = spec.labels.length, step = n > 8 ? 2 : 1;
    spec.labels.forEach(function (lab, i) {
      if (i % step !== 0 && i !== n - 1) return;
      var x = n === 1 ? (PAD.l + W - PAD.r) / 2 : PAD.l + (i * (W - PAD.l - PAD.r)) / (n - 1);
      out += '<text x="' + x.toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="' + TEXT + '">' + esc(lab) + "</text>";
    });
    return out;
  }
  function endLabels(spec, min, max) {
    var out = "", s = spec.series[0];
    var last = s.values[s.values.length - 1];
    var p = pts(spec, s.values.length - 1, min, max);
    out += '<text x="' + (p[0] - 4).toFixed(1) + '" y="' + (p[1] - 10).toFixed(1) +
      '" text-anchor="end" font-size="12" font-weight="700" fill="' + (s.color || PALETTE[0]) + '">' +
      esc(fmt(last, spec.valueFmt)) + "</text>";
    return out;
  }
  function dots(spec, min, max, si) {
    var s = spec.series[si || 0], out = "";
    s.values.forEach(function (v, i) {
      var p = pts(spec, i, min, max);
      out += '<circle class="pt" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) +
        '" r="11" fill="transparent"><title>' + esc(spec.labels[i] + ": " + fmt(v, spec.valueFmt)) + "</title></circle>" +
        '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3.5" fill="' +
        (s.color || PALETTE[si || 0]) + '" stroke="#fff" stroke-width="1.5" pointer-events="none"/>';
    });
    return out;
  }
  function wrap(inner, spec) {
    return '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(spec.title || "chart") +
      '" preserveAspectRatio="xMidYMid meet">' + inner + "</svg>" +
      '<p class="src">Source: ' + esc(spec.source || "BPS, 2024") + "</p>";
  }

  function lineChart(spec, area) {
    var all = [];
    spec.series.forEach(function (s) { all = all.concat(s.values); });
    var min = Math.min.apply(null, all), max = Math.max.apply(null, all);
    if (spec.ymin !== undefined) min = Math.min(min, spec.ymin);
    if (spec.ymax !== undefined) max = Math.max(max, spec.ymax);
    var pad = (max - min) * 0.12 || 1; min -= pad; max += pad;
    var inner = axisLabels(spec, min, max);
    spec.series.forEach(function (s, si) {
      var d = s.values.map(function (v, i) {
        var p = pts(spec, i, min, max);
        return (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1);
      }).join(" ");
      if (area && si === 0) {
        var p0 = pts(spec, 0, min, max), pN = pts(spec, s.values.length - 1, min, max);
        inner += '<path d="' + d + " L" + pN[0].toFixed(1) + " " + (H - PAD.b) + " L" + p0[0].toFixed(1) + " " + (H - PAD.b) +
          ' Z" fill="' + (s.color || PALETTE[0]) + '" fill-opacity="0.14" stroke="none"/>';
      }
      inner += '<path d="' + d + '" fill="none" stroke="' + (s.color || PALETTE[si]) +
        '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
      inner += dots(spec, min, max, si);
    });
    if (spec.refLine !== undefined) {
      var y = (H - PAD.b) - ((spec.refLine - min) / (max - min)) * (H - PAD.t - PAD.b);
      inner += '<line x1="' + PAD.l + '" y1="' + y.toFixed(1) + '" x2="' + (W - PAD.r) + '" y2="' + y.toFixed(1) +
        '" stroke="#b3392e" stroke-dasharray="5 4" stroke-width="1.5"/>' +
        '<text x="' + (W - PAD.r - 2) + '" y="' + (y - 5).toFixed(1) + '" text-anchor="end" font-size="11" fill="#b3392e">' +
        esc(spec.refLabel || "") + "</text>";
    }
    if (spec.endLabel) inner += endLabels(spec, min, max);
    if (spec.note) {
      inner += '<text x="' + PAD.l + '" y="' + (H - 8) + '" font-size="11" fill="' + TEXT + '">' + esc(spec.note) + "</text>";
    }
    return wrap(inner, spec);
  }

  function columnChart(spec) {
    var n = spec.labels.length, m = spec.series.length;
    var all = [];
    spec.series.forEach(function (s) { all = all.concat(s.values); });
    var min = 0, max = Math.max.apply(null, all) * 1.08;
    if (spec.ymin !== undefined) min = spec.ymin;
    var inner = axisLabels(spec, min, max);
    var slot = (W - PAD.l - PAD.r) / n, bw = Math.min(34, (slot * 0.72) / m);
    spec.series.forEach(function (s, si) {
      s.values.forEach(function (v, i) {
        var x = PAD.l + i * slot + (slot - bw * m) / 2 + si * bw;
        var y = (H - PAD.b) - ((v - min) / (max - min)) * (H - PAD.t - PAD.b);
        inner += '<rect class="pt" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw.toFixed(1) +
          '" height="' + ((H - PAD.b) - y).toFixed(1) + '" fill="' + (s.color || PALETTE[si]) + '">' +
          "<title>" + esc(spec.labels[i] + ": " + fmt(v, spec.valueFmt)) + "</title></rect>";
      });
    });
    if (spec.endLabel) {
      var last = spec.series[0].values[n - 1];
      inner += '<text x="' + (PAD.l + (n - 0.5) * slot).toFixed(1) + '" y="' + (PAD.t + 12) +
        '" text-anchor="middle" font-size="12" font-weight="700" fill="' + (spec.series[0].color || PALETTE[0]) + '">' +
        esc(fmt(last, spec.valueFmt)) + "</text>";
    }
    return wrap(inner, spec);
  }

  function hbarChart(spec) {
    var data = spec.data, n = data.length;
    var max = Math.max.apply(null, data.map(function (d) { return d.value; })) * 1.12;
    var rowH = 34, h = 18 + n * rowH + 34;
    var x0 = 190, x1 = 600;
    var inner = "";
    data.forEach(function (d, i) {
      var y = 14 + i * rowH, w = (d.value / max) * (x1 - x0);
      inner += '<text x="' + (x0 - 8) + '" y="' + (y + 13) + '" text-anchor="end" font-size="12" fill="' + TEXT + '">' + esc(d.name) + "</text>" +
        '<rect class="pt" x="' + x0 + '" y="' + y + '" width="' + Math.max(2, w).toFixed(1) + '" height="20" rx="2" fill="' +
        (d.color || PALETTE[i % PALETTE.length]) + '"><title>' + esc(d.name + ": " + fmt(d.value, spec.valueFmt)) + "</title></rect>" +
        '<text x="' + (x0 + w + 6).toFixed(1) + '" y="' + (y + 15) + '" font-size="12" font-weight="600" fill="' + TEXT + '">' +
        esc(fmt(d.value, spec.valueFmt)) + "</text>";
    });
    var svg = '<svg viewBox="0 0 640 ' + h + '" role="img" aria-label="' + esc(spec.title || "chart") +
      '" preserveAspectRatio="xMidYMid meet">' + inner + "</svg>";
    return svg + '<p class="src">Source: ' + esc(spec.source || "BPS, 2024") + "</p>";
  }

  function donutChart(spec) {
    var data = spec.data, total = 0;
    data.forEach(function (d) { total += d.value; });
    var cx = 150, cy = 150, r = 105, ir = 62, a0 = -Math.PI / 2, inner = "";
    data.forEach(function (d, i) {
      var a1 = a0 + (d.value / total) * Math.PI * 2;
      var large = (a1 - a0) > Math.PI ? 1 : 0;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      var xi1 = cx + ir * Math.cos(a1), yi1 = cy + ir * Math.sin(a1);
      var xi0 = cx + ir * Math.cos(a0), yi0 = cy + ir * Math.sin(a0);
      inner += '<path class="pt" d="M' + x0.toFixed(1) + " " + y0.toFixed(1) + " A" + r + " " + r + " 0 " + large + " 1 " + x1.toFixed(1) + " " + y1.toFixed(1) +
        " L" + xi1.toFixed(1) + " " + yi1.toFixed(1) + " A" + ir + " " + ir + " 0 " + large + " 0 " + xi0.toFixed(1) + " " + yi0.toFixed(1) +
        ' Z" fill="' + (d.color || PALETTE[i % PALETTE.length]) + '" stroke="#fff" stroke-width="1.5"><title>' +
        esc(d.name + ": " + fmt(d.value, spec.valueFmt)) + "</title></path>";
      a0 = a1;
    });
    inner += '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" font-size="22" font-weight="700" fill="' + TEXT + '">' +
      esc(spec.center || "") + '</text><text x="' + cx + '" y="' + (cy + 16) + '" text-anchor="middle" font-size="11" fill="' + TEXT + '">' +
      esc(spec.centerSub || "") + "</text>";
    var legend = "";
    data.forEach(function (d, i) {
      legend += '<g><rect x="300" y="' + (18 + i * 26) + '" width="12" height="12" rx="2" fill="' + (d.color || PALETTE[i % PALETTE.length]) + '"/>' +
        '<text x="320" y="' + (29 + i * 26) + '" font-size="12" fill="' + TEXT + '">' + esc(d.name + " — " + fmt(d.value, spec.valueFmt)) + "</text></g>";
    });
    var h = Math.max(300, 24 + data.length * 26);
    var svg = '<svg viewBox="0 0 640 ' + h + '" role="img" aria-label="' + esc(spec.title || "chart") +
      '" preserveAspectRatio="xMidYMid meet">' + inner + legend + "</svg>";
    return svg + '<p class="src">Source: ' + esc(spec.source || "BPS, 2024") + "</p>";
  }

  function scatterChart(spec) {
    var xs = spec.points.map(function (p) { return p.x; });
    var ys = spec.points.map(function (p) { return p.y; });
    var minX = 0, maxX = Math.max.apply(null, xs) * 1.08;
    var minY = 0, maxY = Math.max.apply(null, ys) * 1.08;
    var inner = "";
    niceTicks(minX, maxX, 4).forEach(function (t) {
      var x = PAD.l + ((t - minX) / (maxX - minX)) * (W - PAD.l - PAD.r);
      inner += '<line x1="' + x.toFixed(1) + '" y1="' + PAD.t + '" x2="' + x.toFixed(1) + '" y2="' + (H - PAD.b) +
        '" stroke="' + GRID + '"/><text x="' + x.toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="' + TEXT + '">' + t + "</text>";
    });
    niceTicks(minY, maxY, 4).forEach(function (t) {
      var y = (H - PAD.b) - ((t - minY) / (maxY - minY)) * (H - PAD.t - PAD.b);
      inner += '<line x1="' + PAD.l + '" y1="' + y.toFixed(1) + '" x2="' + (W - PAD.r) + '" y2="' + y.toFixed(1) +
        '" stroke="' + GRID + '"/><text x="' + (PAD.l - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + TEXT + '">' + t + "</text>";
    });
    spec.points.forEach(function (p, i) {
      var x = PAD.l + ((p.x - minX) / (maxX - minX)) * (W - PAD.l - PAD.r);
      var y = (H - PAD.b) - ((p.y - minY) / (maxY - minY)) * (H - PAD.t - PAD.b);
      var r = 5 + (p.r || 0) * 0.02;
      inner += '<circle class="pt" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + Math.max(5, Math.min(18, r)).toFixed(1) +
        '" fill="' + (PALETTE[i % PALETTE.length]) + '" fill-opacity="0.75" stroke="#fff" stroke-width="1.5"><title>' +
        esc(p.name + ": pop " + p.x + " mn, GRDP Rp" + p.y + " T" + (p.r ? ", per capita Rp" + p.r + " mn" : "")) + "</title></circle>" +
        '<text x="' + (x + 10).toFixed(1) + '" y="' + (y + 4).toFixed(1) + '" font-size="11" fill="' + TEXT + '">' + esc(p.name) + "</text>";
    });
    inner += '<text x="' + ((PAD.l + W - PAD.r) / 2) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="' + TEXT + '"></text>';
    return wrap(inner, spec);
  }

  /* Render the same spec as an accessible <table>. */
  function tableFor(spec) {
    var html = '<table class="data-table" data-sortable><thead><tr>';
    if (spec.type === "hbar" || spec.type === "donut") {
      html += "<th data-sort>Name</th><th data-sort data-num>Value</th></tr></thead><tbody>";
      spec.data.forEach(function (d) {
        html += "<tr><td>" + esc(d.name) + '</td><td data-value="' + d.value + '">' + esc(fmt(d.value, spec.valueFmt)) + "</td></tr>";
      });
    } else if (spec.type === "scatter") {
      html += "<th data-sort>Province</th><th data-sort data-num>Population (mn)</th><th data-sort data-num>GRDP (Rp T)</th><th data-sort data-num>GRDP/capita (Rp mn)</th></tr></thead><tbody>";
      spec.points.forEach(function (p) {
        html += "<tr><td>" + esc(p.name) + '</td><td data-value="' + p.x + '">' + p.x + '</td><td data-value="' + p.y + '">' + p.y + '</td><td data-value="' + (p.r || "") + '">' + (p.r || "—") + "</td></tr>";
      });
    } else {
      html += "<th data-sort>Year</th>";
      spec.series.forEach(function (s) { html += "<th data-sort data-num>" + esc(s.name) + "</th>"; });
      html += "</tr></thead><tbody>";
      spec.labels.forEach(function (lab, i) {
        html += "<tr><td>" + esc(lab) + "</td>";
        spec.series.forEach(function (s) {
          html += '<td data-value="' + s.values[i] + '">' + esc(fmt(s.values[i], spec.valueFmt)) + "</td>";
        });
        html += "</tr>";
      });
    }
    return html + "</tbody></table>";
  }

  function render(container, spec) {
    var html;
    if (spec.type === "line") html = lineChart(spec, false);
    else if (spec.type === "area") html = lineChart(spec, true);
    else if (spec.type === "columns") html = columnChart(spec);
    else if (spec.type === "hbar") html = hbarChart(spec);
    else if (spec.type === "donut") html = donutChart(spec);
    else if (spec.type === "scatter") html = scatterChart(spec);
    else html = "";
    container.innerHTML = html;
    container.setAttribute("data-chart-type", spec.type);
    container.__spec = spec;
  }

  return { render: render, tableFor: tableFor, fmt: fmt, esc: esc, PALETTE: PALETTE };
})();
/* Charts render synchronously at DOMContentLoaded; no network, no fonts. */
