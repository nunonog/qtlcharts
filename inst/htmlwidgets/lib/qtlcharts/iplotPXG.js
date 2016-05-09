// Generated by CoffeeScript 1.10.0
var iplotPXG;

iplotPXG = function(widgetdiv, data, chartOpts) {
  var axispos, chartdivid, gen, gnames, group, height, horizontal, i, inferred, j, jitter, margin, mychart, nyticks, phe, pointcolor, pointsize, pointstroke, rectcolor, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, results, title, titlepos, widgetdivid, width, x, xlab, y, yNA, ylab, ylim, yticks;
  gen = (function() {
    var j, len, ref, results;
    ref = data.geno[0];
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      x = ref[j];
      results.push(Math.abs(x));
    }
    return results;
  })();
  inferred = (function() {
    var j, len, ref, results;
    ref = data.geno[0];
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      x = ref[j];
      results.push(x < 0);
    }
    return results;
  })();
  group = (function() {
    var j, len, results;
    results = [];
    for (j = 0, len = inferred.length; j < len; j++) {
      i = inferred[j];
      results.push(i + 1);
    }
    return results;
  })();
  console.log(group);
  phe = data.pheno;
  gnames = ((function() {
    var results;
    results = [];
    for (y in data.genonames) {
      results.push(data.genonames[y]);
    }
    return results;
  })())[0];
  height = (ref = chartOpts != null ? chartOpts.height : void 0) != null ? ref : 550;
  width = (ref1 = chartOpts != null ? chartOpts.width : void 0) != null ? ref1 : 400;
  title = (ref2 = chartOpts != null ? chartOpts.title : void 0) != null ? ref2 : "";
  margin = (ref3 = chartOpts != null ? chartOpts.margin : void 0) != null ? ref3 : {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };
  xlab = (ref4 = chartOpts != null ? chartOpts.xlab : void 0) != null ? ref4 : "Genotype";
  ylab = (ref5 = chartOpts != null ? chartOpts.ylab : void 0) != null ? ref5 : "Phenotype";
  axispos = (ref6 = chartOpts != null ? chartOpts.axispos : void 0) != null ? ref6 : {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  titlepos = (ref7 = chartOpts != null ? chartOpts.titlepos : void 0) != null ? ref7 : 20;
  jitter = (ref8 = chartOpts != null ? chartOpts.jitter : void 0) != null ? ref8 : "beeswarm";
  ylim = (ref9 = chartOpts != null ? chartOpts.ylim : void 0) != null ? ref9 : null;
  yticks = (ref10 = chartOpts != null ? chartOpts.yticks : void 0) != null ? ref10 : null;
  nyticks = (ref11 = chartOpts != null ? chartOpts.nyticks : void 0) != null ? ref11 : 5;
  rectcolor = (ref12 = chartOpts != null ? chartOpts.rectcolor : void 0) != null ? ref12 : "#E6E6E6";
  pointcolor = (ref13 = chartOpts != null ? chartOpts.pointcolor : void 0) != null ? ref13 : "slateblue";
  pointsize = (ref14 = chartOpts != null ? chartOpts.pointsize : void 0) != null ? ref14 : 3;
  pointstroke = (ref15 = chartOpts != null ? chartOpts.pointstroke : void 0) != null ? ref15 : "black";
  yNA = (ref16 = chartOpts != null ? chartOpts.yNA : void 0) != null ? ref16 : {
    handle: true,
    force: false,
    width: 15,
    gap: 10
  };
  horizontal = (ref17 = chartOpts != null ? chartOpts.horizontal : void 0) != null ? ref17 : false;
  chartdivid = (ref18 = chartOpts != null ? chartOpts.chartdivid : void 0) != null ? ref18 : 'chart';
  widgetdivid = d3.select(widgetdiv).attr('id');
  mychart = d3panels.dotchart({
    height: height,
    width: width,
    margin: margin,
    xcategories: (function() {
      results = [];
      for (var j = 1, ref19 = gnames.length; 1 <= ref19 ? j <= ref19 : j >= ref19; 1 <= ref19 ? j++ : j--){ results.push(j); }
      return results;
    }).apply(this),
    xcatlabels: gnames,
    xlab: xlab,
    ylab: ylab,
    xNA: {
      handle: false,
      force: false
    },
    yNA: {
      handle: yNA.handle,
      force: yNA.force
    },
    yNA_size: {
      width: yNA.width,
      gap: yNA.gap
    },
    title: title,
    axispos: axispos,
    titlepos: titlepos,
    jitter: jitter,
    ylim: ylim,
    yticks: yticks,
    nyticks: nyticks,
    rectcolor: rectcolor,
    pointcolor: pointcolor,
    pointstroke: pointstroke,
    pointsize: pointsize,
    horizontal: horizontal,
    tipclass: widgetdivid
  });
  mychart(d3.select(widgetdiv).select("svg"), {
    x: gen,
    y: phe,
    indID: data.indID,
    group: group
  });
  return mychart.points().attr("fill", function(d, i) {
    if (inferred[i]) {
      return "Orchid";
    }
    return "slateblue";
  }).on("click", function(d) {
    var r;
    r = d3.select(this).attr("r");
    return d3.select(this).transition().duration(500).attr("r", r * 3).transition().duration(500).attr("r", r);
  });
};
