// Generated by CoffeeScript 1.9.3
var iplotMScanone_noeff;

iplotMScanone_noeff = function(widgetdiv, lod_data, times, chartOpts) {
  var axispos, chartdivid, chr, chrGap, colors, curindex, curvechart_xaxis, darkrect, extra_digits, g_curvechart, g_heatmap, g_lodchart, hbot, height, htop, i, j, k, len, len1, lightrect, linecolor, linewidth, lod4curves, lod_labels, lod_ylab, lodchart_curves, lodcolumn, lodcurve, margin, mycurvechart, mylodchart, mylodheatmap, nullcolor, nxticks, plotLodCurve, plotPointsInCurvechart, pointcolor, points_in_curvechart, pointsize, pointstroke, pos, posindex, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref24, ref25, ref3, ref4, ref5, ref6, ref7, ref8, ref9, svg, titlepos, width, wleft, wright, x, xscale, xticks, y, zlim, zthresh;
  height = (ref = chartOpts != null ? chartOpts.height : void 0) != null ? ref : 700;
  width = (ref1 = chartOpts != null ? chartOpts.width : void 0) != null ? ref1 : 1000;
  wleft = (ref2 = chartOpts != null ? chartOpts.wleft : void 0) != null ? ref2 : width * 0.65;
  htop = (ref3 = chartOpts != null ? chartOpts.htop : void 0) != null ? ref3 : height / 2;
  margin = (ref4 = chartOpts != null ? chartOpts.margin : void 0) != null ? ref4 : {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };
  axispos = (ref5 = chartOpts != null ? chartOpts.axispos : void 0) != null ? ref5 : {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  titlepos = (ref6 = chartOpts != null ? chartOpts.titlepos : void 0) != null ? ref6 : 20;
  chrGap = (ref7 = chartOpts != null ? chartOpts.chrGap : void 0) != null ? ref7 : 8;
  darkrect = (ref8 = chartOpts != null ? chartOpts.darkrect : void 0) != null ? ref8 : "#C8C8C8";
  lightrect = (ref9 = chartOpts != null ? chartOpts.lightrect : void 0) != null ? ref9 : "#E6E6E6";
  nullcolor = (ref10 = chartOpts != null ? chartOpts.nullcolor : void 0) != null ? ref10 : "#E6E6E6";
  colors = (ref11 = chartOpts != null ? chartOpts.colors : void 0) != null ? ref11 : ["slateblue", "white", "crimson"];
  zlim = (ref12 = chartOpts != null ? chartOpts.zlim : void 0) != null ? ref12 : null;
  zthresh = (ref13 = chartOpts != null ? chartOpts.zthresh : void 0) != null ? ref13 : null;
  lod_ylab = (ref14 = chartOpts != null ? chartOpts.lod_ylab : void 0) != null ? ref14 : "";
  linecolor = (ref15 = chartOpts != null ? chartOpts.linecolor : void 0) != null ? ref15 : "darkslateblue";
  linewidth = (ref16 = chartOpts != null ? chartOpts.linewidth : void 0) != null ? ref16 : 2;
  pointcolor = (ref17 = chartOpts != null ? chartOpts.pointcolor : void 0) != null ? ref17 : "slateblue";
  pointsize = (ref18 = chartOpts != null ? chartOpts.pointsize : void 0) != null ? ref18 : 0;
  pointstroke = (ref19 = chartOpts != null ? chartOpts.pointstroke : void 0) != null ? ref19 : "black";
  nxticks = (ref20 = chartOpts != null ? chartOpts.nxticks : void 0) != null ? ref20 : 5;
  xticks = (ref21 = chartOpts != null ? chartOpts.xticks : void 0) != null ? ref21 : null;
  lod_labels = (ref22 = chartOpts != null ? chartOpts.lod_labels : void 0) != null ? ref22 : null;
  chartdivid = (ref23 = chartOpts != null ? chartOpts.chartdivid : void 0) != null ? ref23 : 'chart';
  wright = width - wleft;
  hbot = height - htop;
  if (lod_labels == null) {
    lod_labels = times != null ? (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = times.length; j < len; j++) {
        x = times[j];
        results.push(formatAxis(times, extra_digits = 1)(x));
      }
      return results;
    })() : lod_data.lodnames;
  }
  mylodheatmap = lodheatmap().height(htop - margin.top - margin.bottom).width(wleft - margin.left - margin.right).margin(margin).axispos(axispos).titlepos(titlepos).chrGap(chrGap).rectcolor(lightrect).colors(colors).zlim(zlim).zthresh(zthresh).quantScale(times).lod_labels(lod_labels).ylab(lod_ylab).nullcolor(nullcolor);
  svg = d3.select(widgetdiv).select("svg");
  g_heatmap = svg.append("g").attr("id", "heatmap").datum(lod_data).call(mylodheatmap);
  mylodchart = lodchart().height(hbot - margin.top - margin.bottom).width(wleft - margin.left - margin.right).margin(margin).axispos(axispos).titlepos(titlepos).chrGap(chrGap).linecolor("none").pad4heatmap(true).darkrect(darkrect).lightrect(lightrect).ylim([0, d3.max(mylodheatmap.zlim())]).pointsAtMarkers(false);
  g_lodchart = svg.append("g").attr("transform", "translate(0," + htop + ")").attr("id", "lodchart").datum(lod_data).call(mylodchart);
  lodcurve = function(chr, lodcolumn) {
    return d3.svg.line().x(function(d) {
      return mylodchart.xscale()[chr](d);
    }).y(function(d, i) {
      return mylodchart.yscale()(Math.abs(lod_data.lodByChr[chr][i][lodcolumn]));
    });
  };
  lodchart_curves = null;
  plotLodCurve = function(lodcolumn) {
    var chr, j, len, ref24, results;
    lodchart_curves = g_lodchart.append("g").attr("id", "lodcurves");
    ref24 = lod_data.chrnames;
    results = [];
    for (j = 0, len = ref24.length; j < len; j++) {
      chr = ref24[j];
      lodchart_curves.append("path").datum(lod_data.posByChr[chr]).attr("d", lodcurve(chr, lodcolumn)).attr("stroke", linecolor).attr("fill", "none").attr("stroke-width", linewidth).style("pointer-events", "none");
      if (pointsize > 0) {
        results.push(lodchart_curves.append("g").attr("id", "lodpoints").selectAll("empty").data(lod_data.posByChr[chr]).enter().append("circle").attr("cx", function(d) {
          return mylodchart.xscale()[chr](d);
        }).attr("cy", function(d, i) {
          return mylodchart.yscale()(Math.abs(lod_data.lodByChr[chr][i][lodcolumn]));
        }).attr("r", pointsize).attr("fill", pointcolor).attr("stroke", pointstroke));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
  lod4curves = {
    data: []
  };
  for (pos in lod_data.pos) {
    y = (function() {
      var j, len, ref24, results;
      ref24 = lod_data.lodnames;
      results = [];
      for (j = 0, len = ref24.length; j < len; j++) {
        lodcolumn = ref24[j];
        results.push(Math.abs(lod_data[lodcolumn][pos]));
      }
      return results;
    })();
    x = (function() {
      var results;
      results = [];
      for (i in lod_data.lodnames) {
        results.push(+i);
      }
      return results;
    })();
    lod4curves.data.push({
      x: x,
      y: y
    });
  }
  mycurvechart = curvechart().height(htop - margin.top - margin.bottom).width(wright - margin.left - margin.right).margin(margin).axispos(axispos).titlepos(titlepos).xlab(lod_ylab).ylab("LOD score").strokecolor("none").rectcolor(lightrect).xlim([-0.5, lod_data.lodnames.length - 0.5]).ylim([0, d3.max(mylodheatmap.zlim())]).nxticks(0).commonX(false);
  g_curvechart = svg.append("g").attr("transform", "translate(" + wleft + ",0)").attr("id", "curvechart").datum(lod4curves).call(mycurvechart);
  console.log(mycurvechart.xscale());
  console.log(mycurvechart.yscale());
  points_in_curvechart = null;
  plotPointsInCurvechart = function(pos_index) {
    return g_curvechart.append("g").attr("id", "pointsInCurveChart").selectAll("empty").data(lod4curves.data[pos_index]).enter().append("circle").attr("cx", function(d) {
      return mycurvechart.xscale()(d.x);
    }).attr("cy", function(d) {
      return mycurvechart.yscale()(d.y);
    }).attr("r", pointsize).attr("fill", pointcolor).attr("stroke", pointstroke);
  };
  if (times != null) {
    xscale = d3.scale.linear().range(mycurvechart.xscale().range());
    xscale.domain([times[0], times[times.length - 1]]);
    xticks = xticks != null ? xticks : xscale.ticks(nxticks);
    curvechart_xaxis = g_curvechart.select("g.x.axis");
    curvechart_xaxis.selectAll("empty").data(xticks).enter().append("line").attr("x1", function(d) {
      return xscale(d);
    }).attr("x2", function(d) {
      return xscale(d);
    }).attr("y1", margin.top).attr("y2", htop - margin.bottom).attr("fill", "none").attr("stroke", "white").attr("stroke-width", 1).style("pointer-events", "none");
    curvechart_xaxis.selectAll("empty").data(xticks).enter().append("text").attr("x", function(d) {
      return xscale(d);
    }).attr("y", htop - margin.bottom + axispos.xlabel).text(function(d) {
      return formatAxis(xticks)(d);
    });
  } else {
    curvechart_xaxis = g_curvechart.select("g.x.axis").selectAll("empty").data(lod_labels).enter().append("text").attr("id", function(d, i) {
      return "xaxis" + i;
    }).attr("x", function(d, i) {
      return mycurvechart.xscale()(i);
    }).attr("y", htop - margin.bottom + axispos.xlabel).text(function(d) {
      return d;
    }).attr("opacity", 0);
  }
  posindex = {};
  curindex = 0;
  ref24 = lod_data.chrnames;
  for (j = 0, len = ref24.length; j < len; j++) {
    chr = ref24[j];
    posindex[chr] = {};
    ref25 = lod_data.posByChr[chr];
    for (k = 0, len1 = ref25.length; k < len1; k++) {
      pos = ref25[k];
      posindex[chr][pos] = curindex;
      curindex += 1;
    }
  }
  mycurvechart.curvesSelect().on("mouseover.panel", null).on("mouseout.panel", null);
  return mylodheatmap.cellSelect().on("mouseover", function(d) {
    var p;
    plotLodCurve(d.lodindex);
    g_lodchart.select("g.title text").text("" + lod_labels[d.lodindex]);
    g_curvechart.selectAll("path.path" + posindex[d.chr][d.pos]).attr("stroke", linecolor);
    if (pointsize > 0) {
      plotPointsInCurvechart(posindex[d.chr][d.pos]);
    }
    p = d3.format(".1f")(d.pos);
    g_curvechart.select("g.title text").text(d.chr + "@" + p);
    if (times == null) {
      return g_curvechart.select("text#xaxis" + d.lodindex).attr("opacity", 1);
    }
  }).on("mouseout", function(d) {
    lodchart_curves.remove();
    if (pointsize > 0) {
      g_curvechart.select("g#pointsInCurveChart").remove();
    }
    g_lodchart.select("g.title text").text("");
    g_curvechart.selectAll("path.path" + posindex[d.chr][d.pos]).attr("stroke", null);
    g_curvechart.select("g.title text").text("");
    if (times == null) {
      return g_curvechart.select("text#xaxis" + d.lodindex).attr("opacity", 0);
    }
  });
};
