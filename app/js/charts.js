/* Indonesia in Numbers — hand-rolled SVG chart builders. No library, no network.
   Every chart: units, ticks, end labels, tabular numbers, ≥11px labels. */
var Charts = (function () {
  var PAL = ["#C8102E","#1F4E79","#0E6B5C","#A97B00","#7A5C9E","#B3541E"];
  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function fmt(n, d){ return Number(n).toLocaleString("en-US",{minimumFractionDigits:(d==null?0:d), maximumFractionDigits:(d==null?0:d)}); }
  function axis(vb, w, h, pad, min, max, unit){
    var s = "";
    for (var i = 0; i <= 4; i++) {
      var v = min + (max - min) * i / 4, y = pad.t + (h - pad.t - pad.b) * (1 - i / 4);
      s += '<line x1="' + pad.l + '" y1="' + y + '" x2="' + (w - pad.r) + '" y2="' + y + '" stroke="#D8D2C4" stroke-width="1"/>';
      s += '<text x="' + (pad.l - 6) + '" y="' + (y + 4) + '" text-anchor="end" font-size="11" fill="#6B655C">' + fmt(v) + '</text>';
    }
    if (unit) s += '<text x="' + pad.l + '" y="' + (pad.t - 8) + '" font-size="11" fill="#6B655C">' + esc(unit) + '</text>';
    return s;
  }
  function lineChart(labels, values, opt){
    opt = opt || {};
    var w = 640, h = 300, pad = {t:26, r:52, b:30, l:52};
    var min = opt.min != null ? opt.min : Math.min.apply(null, values.concat([0]));
    var max = opt.max != null ? opt.max : Math.max.apply(null, values);
    if (max === min) max = min + 1;
    var X = function (i){ return pad.l + (w - pad.l - pad.r) * i / (labels.length - 1); };
    var Y = function (v){ return pad.t + (h - pad.t - pad.b) * (1 - (v - min) / (max - min)); };
    var pts = values.map(function (v, i){ return X(i).toFixed(1) + "," + Y(v).toFixed(1); }).join(" ");
    var s = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(opt.title || "line chart") + '">';
    s += axis(null, w, h, pad, min, max, opt.unit);
    if (opt.area) s += '<polygon points="' + pad.l + ',' + Y(min) + ' ' + pts + ' ' + X(labels.length - 1) + ',' + Y(min) + '" fill="#C8102E" opacity="0.10"/>';
    s += '<polyline points="' + pts + '" fill="none" stroke="' + (opt.color || "#C8102E") + '" stroke-width="2.5"/>';
    values.forEach(function (v, i){
      s += '<circle cx="' + X(i) + '" cy="' + Y(v) + '" r="4" fill="' + (opt.color || "#C8102E") + '"><title>' + esc(labels[i]) + ': ' + fmt(v, opt.dec) + (opt.unit2 || "") + '</title></circle>';
      if (opt.showLabels || i === 0 || i === values.length - 1)
        s += '<text x="' + X(i) + '" y="' + (Y(v) - 10) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#1C1A17">' + fmt(v, opt.dec) + '</text>';
      s += '<text x="' + X(i) + '" y="' + (h - 8) + '" text-anchor="middle" font-size="11" fill="#6B655C">' + esc(labels[i]) + '</text>';
    });
    return s + "</svg>";
  }
  function barV(labels, values, opt){
    opt = opt || {};
    var w = 640, h = 300, pad = {t:26, r:16, b:44, l:56};
    var max = Math.max.apply(null, values) * 1.12;
    var bw = (w - pad.l - pad.r) / labels.length;
    var s = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(opt.title || "bar chart") + '">';
    s += axis(null, w, h, pad, 0, max, opt.unit);
    values.forEach(function (v, i){
      var bh = (h - pad.t - pad.b) * v / max, x = pad.l + bw * i + bw * 0.16, y = pad.t + (h - pad.t - pad.b) - bh;
      var c = opt.colors ? opt.colors[i % opt.colors.length] : PAL[i % PAL.length];
      s += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + (bw * 0.68).toFixed(1) + '" height="' + bh.toFixed(1) + '" fill="' + c + '"><title>' + esc(labels[i]) + ': ' + fmt(v, opt.dec) + (opt.unit2 || "") + '</title></rect>';
      s += '<text x="' + (x + bw * 0.34).toFixed(1) + '" y="' + (y - 5).toFixed(1) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#1C1A17">' + fmt(v, opt.dec) + '</text>';
      s += '<text x="' + (x + bw * 0.34).toFixed(1) + '" y="' + (h - 24) + '" text-anchor="middle" font-size="11" fill="#6B655C">' + esc(opt.short ? opt.short[i] : labels[i]) + '</text>';
    });
    return s + "</svg>";
  }
  function barH(labels, values, opt){
    opt = opt || {};
    var rowH = 34, w = 640, h = rowH * labels.length + 46;
    var max = Math.max.apply(null, values) * 1.15, padL = 150, padR = 64;
    var s = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(opt.title || "horizontal bar chart") + '">';
    if (opt.unit) s += '<text x="' + padL + '" y="16" font-size="11" fill="#6B655C">' + esc(opt.unit) + '</text>';
    values.forEach(function (v, i){
      var y = 26 + i * rowH, bw = (w - padL - padR) * v / max;
      var c = opt.colors ? opt.colors[i % opt.colors.length] : PAL[i % PAL.length];
      s += '<text x="' + (padL - 8) + '" y="' + (y + 15) + '" text-anchor="end" font-size="12" fill="#1C1A17">' + esc(labels[i]) + '</text>';
      s += '<rect x="' + padL + '" y="' + y + '" width="' + bw.toFixed(1) + '" height="20" fill="' + c + '"><title>' + esc(labels[i]) + ': ' + fmt(v, opt.dec) + (opt.unit2 || "") + '</title></rect>';
      s += '<text x="' + (padL + bw + 6).toFixed(1) + '" y="' + (y + 15) + '" font-size="12" font-weight="700" fill="#1C1A17">' + fmt(v, opt.dec) + '</text>';
    });
    return s + "</svg>";
  }
  function donut(pairs, opt){
    opt = opt || {};
    var w = 640, h = 300, cx = 150, cy = 150, r = 105, ir = 62, total = 0;
    pairs.forEach(function (p){ total += p[1]; });
    var s = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(opt.title || "donut chart") + '">';
    var a0 = -Math.PI / 2;
    pairs.forEach(function (p, i){
      var a1 = a0 + (p[1] / total) * Math.PI * 2;
      var large = (a1 - a0) > Math.PI ? 1 : 0;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      var xi1 = cx + ir * Math.cos(a1), yi1 = cy + ir * Math.sin(a1);
      var xi0 = cx + ir * Math.cos(a0), yi0 = cy + ir * Math.sin(a0);
      s += '<path d="M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' L' + xi1.toFixed(1) + ' ' + yi1.toFixed(1) + ' A' + ir + ' ' + ir + ' 0 ' + large + ' 0 ' + xi0.toFixed(1) + ' ' + yi0.toFixed(1) + ' Z" fill="' + PAL[i % PAL.length] + '"><title>' + esc(p[0]) + ': ' + fmt(p[1], 1) + '%</title></path>';
      a0 = a1;
    });
    s += '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" font-size="22" font-weight="700" font-family="Georgia,serif">' + esc(opt.center || "") + '</text>';
    s += '<text x="' + cx + '" y="' + (cy + 16) + '" text-anchor="middle" font-size="11" fill="#6B655C">' + esc(opt.centerSub || "") + '</text>';
    var ly = 30;
    pairs.forEach(function (p, i){
      s += '<rect x="300" y="' + (ly - 10) + '" width="12" height="12" fill="' + PAL[i % PAL.length] + '"/>';
      s += '<text x="318" y="' + ly + '" font-size="12" fill="#1C1A17">' + esc(p[0]) + ' — ' + fmt(p[1], 1) + '%</text>';
      ly += 22;
    });
    return s + "</svg>";
  }
  function scatter(pts, opt){
    opt = opt || {};
    var w = 640, h = 320, pad = {t:26, r:60, b:34, l:60};
    var xs = pts.map(function (p){ return p[1]; }), ys = pts.map(function (p){ return p[2]; });
    var xmin = Math.min.apply(null, xs) * 0.9, xmax = Math.max.apply(null, xs) * 1.05;
    var ymin = 0, ymax = Math.max.apply(null, ys) * 1.1;
    var X = function (v){ return pad.l + (w - pad.l - pad.r) * (v - xmin) / (xmax - xmin); };
    var Y = function (v){ return pad.t + (h - pad.t - pad.b) * (1 - (v - ymin) / (ymax - ymin)); };
    var s = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(opt.title || "scatter chart") + '">';
    s += axis(null, w, h, pad, ymin, ymax, opt.yUnit);
    pts.forEach(function (p){
      s += '<circle cx="' + X(p[1]).toFixed(1) + '" cy="' + Y(p[2]).toFixed(1) + '" r="6" fill="#C8102E"><title>' + esc(p[0]) + ': pop ' + p[1] + 'M, GRDP Rp' + p[2] + 'T</title></circle>';
      s += '<text x="' + (X(p[1]) + 9).toFixed(1) + '" y="' + (Y(p[2]) + 4).toFixed(1) + '" font-size="11" fill="#1C1A17">' + esc(p[0]) + '</text>';
    });
    s += '<text x="' + (w / 2) + '" y="' + (h - 6) + '" text-anchor="middle" font-size="11" fill="#6B655C">' + esc(opt.xUnit || "") + '</text>';
    return s + "</svg>";
  }
  function tableFor(headers, rows){
    var s = '<table><thead><tr>';
    headers.forEach(function (h){ s += '<th>' + esc(h) + '</th>'; });
    s += '</tr></thead><tbody>';
    rows.forEach(function (r){
      s += '<tr>';
      r.forEach(function (c, i){ s += '<td class="' + (i > 0 ? 'num' : '') + '">' + esc(c) + '</td>'; });
      s += '</tr>';
    });
    return s + '</tbody></table>';
  }
  return { line: lineChart, barV: barV, barH: barH, donut: donut, scatter: scatter, table: tableFor, fmt: fmt, esc: esc };
})();
