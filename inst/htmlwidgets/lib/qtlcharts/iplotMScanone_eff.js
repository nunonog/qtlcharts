// Generated by CoffeeScript 1.12.6
var iplotMScanone_eff;

iplotMScanone_eff = function(widgetdiv, lod_data, eff_data, times, chartOpts) {
  var altrectcolor, axispos, c, chartdivid, chrGap, chrlinecolor, chrlinewidth, colors, eff_linecolor, eff_linewidth, eff_nlines, eff_pointcolor, eff_pointsize, eff_pointstroke, eff_ylab, eff_ylim, effect_text, g_heatmap, g_horpanel, g_verpanel, hbot, height, horpanel, horslice, htop, i, j, k, len, len1, linecolor, linewidth, lod_labels, margin, mylodheatmap, nullcolor, nxticks, plotHorSlice, plotVerSlice, rectcolor, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref24, ref25, ref26, ref27, ref28, ref29, ref3, ref30, ref31, ref32, ref33, ref4, ref5, ref6, ref7, ref8, ref9, svg, these_pos, titlepos, verpanel, verpanel_axis_text, verpanel_xscale, verslice, widgetdivid, width, wleft, wright, x, xlab, xlim, xticks, ylab, zlab, zlim, zmax, zthresh;
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
  chrGap = (ref7 = chartOpts != null ? chartOpts.chrGap : void 0) != null ? ref7 : 6;
  rectcolor = (ref8 = chartOpts != null ? chartOpts.rectcolor : void 0) != null ? ref8 : "#e6e6e6";
  altrectcolor = (ref9 = chartOpts != null ? chartOpts.altrectcolor : void 0) != null ? ref9 : "#c8c8c8";
  nullcolor = (ref10 = chartOpts != null ? chartOpts.nullcolor : void 0) != null ? ref10 : "#e6e6e6";
  chrlinecolor = (ref11 = chartOpts != null ? chartOpts.chrlinecolor : void 0) != null ? ref11 : "";
  chrlinewidth = (ref12 = chartOpts != null ? chartOpts.chrlinewidth : void 0) != null ? ref12 : 2;
  colors = (ref13 = chartOpts != null ? chartOpts.colors : void 0) != null ? ref13 : ["slateblue", "white", "crimson"];
  zlim = (ref14 = chartOpts != null ? chartOpts.zlim : void 0) != null ? ref14 : null;
  zthresh = (ref15 = chartOpts != null ? chartOpts.zthresh : void 0) != null ? ref15 : null;
  xlab = (ref16 = chartOpts != null ? chartOpts.xlab : void 0) != null ? ref16 : null;
  ylab = (ref17 = chartOpts != null ? chartOpts.ylab : void 0) != null ? ref17 : "";
  zlab = (ref18 = chartOpts != null ? chartOpts.zlab : void 0) != null ? ref18 : "LOD score";
  eff_ylim = (ref19 = chartOpts != null ? chartOpts.eff_ylim : void 0) != null ? ref19 : null;
  eff_ylab = (ref20 = chartOpts != null ? chartOpts.eff_ylab : void 0) != null ? ref20 : "";
  linecolor = (ref21 = chartOpts != null ? chartOpts.linecolor : void 0) != null ? ref21 : "darkslateblue";
  linewidth = (ref22 = chartOpts != null ? chartOpts.linewidth : void 0) != null ? ref22 : 2;
  eff_linecolor = (ref23 = chartOpts != null ? chartOpts.eff_linecolor : void 0) != null ? ref23 : null;
  eff_linewidth = (ref24 = chartOpts != null ? chartOpts.eff_linewidth : void 0) != null ? ref24 : 2;
  eff_pointcolor = (ref25 = chartOpts != null ? chartOpts.eff_pointcolor : void 0) != null ? ref25 : null;
  eff_pointsize = (ref26 = chartOpts != null ? chartOpts.eff_pointsize : void 0) != null ? ref26 : 0;
  eff_pointstroke = (ref27 = chartOpts != null ? chartOpts.eff_pointstroke : void 0) != null ? ref27 : "black";
  nxticks = (ref28 = chartOpts != null ? chartOpts.nxticks : void 0) != null ? ref28 : 5;
  xticks = (ref29 = chartOpts != null ? chartOpts.xticks : void 0) != null ? ref29 : null;
  lod_labels = (ref30 = chartOpts != null ? chartOpts.lod_labels : void 0) != null ? ref30 : null;
  chartdivid = (ref31 = chartOpts != null ? chartOpts.chartdivid : void 0) != null ? ref31 : 'chart';
  widgetdivid = d3.select(widgetdiv).attr('id');
  margin = d3panels.check_listarg_v_default(margin, {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  });
  axispos = d3panels.check_listarg_v_default(axispos, {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  });
  wright = width - wleft;
  hbot = height - htop;
  zmax = d3panels.matrixMaxAbs(lod_data.lod);
  zlim = zlim != null ? zlim : [-zmax, 0, zmax];
  if (times != null) {
    lod_data.y = times;
  } else {
    lod_data.ycat = lod_data.lodname;
  }
  lod_data.posIndexByChr = d3panels.reorgByChr(lod_data.chrname, lod_data.chr, (function() {
    var results;
    results = [];
    for (i in lod_data.pos) {
      results.push(i);
    }
    return results;
  })());
  if (lod_labels != null) {
    lod_data.lodname = lod_labels;
  }
  if (lod_data.chrname == null) {
    lod_data.chrname = d3panels.unique(lod_data.chr);
  }
  if (lod_data.chrstart == null) {
    lod_data.chrstart = [];
    ref32 = lod_data.chrname;
    for (j = 0, len = ref32.length; j < len; j++) {
      c = ref32[j];
      these_pos = (function() {
        var results;
        results = [];
        for (i in lod_data.chr) {
          if (lod_data.chr[i] === c) {
            results.push(lod_data.pos[i]);
          }
        }
        return results;
      })();
      lod_data.chrstart.push(d3.min(these_pos));
    }
  }
  if (lod_data.chrend == null) {
    lod_data.chrend = [];
    ref33 = lod_data.chrname;
    for (k = 0, len1 = ref33.length; k < len1; k++) {
      c = ref33[k];
      these_pos = (function() {
        var results;
        results = [];
        for (i in lod_data.chr) {
          if (lod_data.chr[i] === c) {
            results.push(lod_data.pos[i]);
          }
        }
        return results;
      })();
      lod_data.chrend.push(d3.max(these_pos));
    }
  }
  x = times != null ? times : (function() {
    var results;
    results = [];
    for (i in lod_data.lod[0]) {
      results.push(i);
    }
    return results;
  })();
  xlim = times != null ? d3.extent(times) : [-0.5, x.length - 0.5];
  nxticks = times != null ? nxticks : 0;
  xticks = times != null ? xticks : null;
  mylodheatmap = d3panels.lodheatmap({
    height: htop,
    width: wleft,
    margin: margin,
    axispos: axispos,
    titlepos: titlepos,
    chrGap: chrGap,
    rectcolor: rectcolor,
    altrectcolor: altrectcolor,
    chrlinecolor: chrlinecolor,
    chrlinewidth: chrlinewidth,
    colors: colors,
    zlim: zlim,
    zthresh: zthresh,
    ylab: ylab,
    yticks: xticks,
    nyticks: nxticks,
    nullcolor: nullcolor,
    tipclass: widgetdivid
  });
  svg = d3.select(widgetdiv).select("svg");
  g_heatmap = svg.append("g").attr("id", "heatmap");
  mylodheatmap(g_heatmap, lod_data);
  horpanel = d3panels.chrpanelframe({
    height: hbot,
    width: wleft,
    margin: margin,
    axispos: axispos,
    titlepos: titlepos,
    chrGap: chrGap,
    rectcolor: rectcolor,
    altrectcolor: altrectcolor,
    chrlinecolor: chrlinecolor,
    chrlinewidth: chrlinewidth,
    xlab: xlab,
    ylab: zlab,
    ylim: [0, zlim[2] * 1.05],
    tipclass: widgetdivid
  });
  g_horpanel = svg.append("g").attr("transform", "translate(0," + htop + ")").attr("id", "lodchart");
  horpanel(g_horpanel, {
    chr: lod_data.chrname,
    start: lod_data.chrstart,
    end: lod_data.chrend
  });
  horslice = null;
  plotHorSlice = function(lodcolumn) {
    horslice = d3panels.add_lodcurve({
      linecolor: linecolor,
      linewidth: linewidth,
      pointsize: 0,
      pointcolor: "",
      pointstroke: ""
    });
    return horslice(horpanel, {
      chr: lod_data.chr,
      pos: lod_data.pos,
      marker: lod_data.marker,
      lod: (function() {
        var results;
        results = [];
        for (i in lod_data.pos) {
          results.push(d3panels.abs(lod_data.lod[i][lodcolumn]));
        }
        return results;
      })(),
      chrname: lod_data.chrname
    });
  };
  eff_ylim = eff_ylim != null ? eff_ylim : d3panels.matrixExtent(eff_data.map(function(d) {
    return d3panels.matrixExtent(d.data);
  }));
  eff_nlines = eff_data[0].data.length;
  eff_linecolor = eff_linecolor != null ? eff_linecolor : d3panels.selectGroupColors(eff_nlines, "dark");
  eff_pointcolor = eff_pointcolor != null ? eff_pointcolor : d3panels.selectGroupColors(eff_nlines, "dark");
  eff_linecolor = d3panels.forceAsArray(eff_linecolor);
  eff_pointcolor = d3panels.forceAsArray(eff_pointcolor);
  verpanel = d3panels.panelframe({
    height: htop,
    width: wright,
    margin: margin,
    axispos: axispos,
    titlepos: titlepos,
    xlab: ylab,
    ylab: eff_ylab,
    rectcolor: rectcolor,
    xlim: xlim,
    ylim: eff_ylim,
    nxticks: nxticks,
    xticks: xticks,
    tipclass: widgetdivid
  });
  g_verpanel = svg.append("g").attr("transform", "translate(" + wleft + ",0)").attr("id", "curvechart");
  verpanel(g_verpanel);
  if (times == null) {
    verpanel_axis_text = g_verpanel.append("g").attr("class", "x axis").append("text").text("").attr("y", htop - margin.bottom + axispos.xlabel);
    verpanel_xscale = verpanel.xscale();
  }
  verslice = [];
  effect_text = null;
  plotVerSlice = function(posindex) {
    var this_slice;
    this_slice = d3panels.add_curves({
      linecolor: eff_linecolor,
      linewidth: eff_linewidth
    });
    this_slice(verpanel, {
      x: [x],
      y: eff_data[posindex].data,
      group: (function() {
        var results;
        results = [];
        for (i in eff_data[posindex].names) {
          results.push(+i + 1);
        }
        return results;
      })()
    });
    verslice.push(this_slice);
    if (eff_data[posindex].names.length > 1) {
      return effect_text = g_verpanel.append("g").attr("id", "effect_text").selectAll("empty").data(eff_data[posindex].names).enter().append("text").text(function(d) {
        return d;
      }).attr("x", function(d, i) {
        return wright - margin.right + axispos.ylabel;
      }).attr("y", function(d, i) {
        var z;
        z = eff_data[posindex].data[i];
        return verpanel.yscale()(z[z.length - 1]);
      }).attr("fill", function(d, i) {
        return eff_linecolor[i];
      }).style("dominant-baseline", "middle").style("text-anchor", "start");
    }
  };
  return mylodheatmap.cells().on("mouseover", function(d) {
    var p;
    plotHorSlice(d.lodindex);
    g_horpanel.select("g.title text").text("" + lod_data.lodname[d.lodindex]);
    plotVerSlice(lod_data.posIndexByChr[d.chr][d.posindex]);
    p = d3.format(".1f")(d.pos);
    g_verpanel.select("g.title text").text(d.chr + "@" + p);
    if (times == null) {
      return verpanel_axis_text.text("" + lod_data.lodname[d.lodindex]).attr("x", verpanel_xscale(d.lodindex));
    }
  }).on("mouseout", function(d) {
    if (horslice != null) {
      horslice.remove();
    }
    g_horpanel.select("g.title text").text("");
    if (verslice.length > 0) {
      verslice.forEach(function(p) {
        return p.remove();
      });
    }
    g_verpanel.select("g.title text").text("");
    if (times == null) {
      verpanel_axis_text.text("");
    }
    if (effect_text != null) {
      return effect_text.remove();
    }
  });
};
