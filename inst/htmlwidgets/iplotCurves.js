// Generated by CoffeeScript 2.2.2
// iplotCurves: Plot of a bunch of curves, linked to points in 0, 1, or 2 scatterplots
// Karl W Broman
HTMLWidgets.widget({
  name: "iplotCurves",
  type: "output",
  initialize: function(widgetdiv, width, height) {
    return d3.select(widgetdiv).append("svg").attr("width", width).attr("height", height).attr("class", "qtlcharts");
  },
  renderValue: function(widgetdiv, x) {
    var chartOpts, ref, ref1, ref2, svg, widgetid;
    svg = d3.select(widgetdiv).select("svg");
    // clear svg and remove tool tips
    svg.selectAll("*").remove();
    widgetid = d3.select(widgetdiv).attr('id');
    d3.selectAll(`div.d3-tip.${widgetid}`).remove();
    chartOpts = (ref = x.chartOpts) != null ? ref : [];
    chartOpts.width = (ref1 = chartOpts != null ? chartOpts.width : void 0) != null ? ref1 : svg.attr("width");
    chartOpts.height = (ref2 = chartOpts != null ? chartOpts.height : void 0) != null ? ref2 : svg.attr("height");
    svg.attr("width", chartOpts.width);
    svg.attr("height", chartOpts.height);
    return iplotCurves(widgetdiv, x.data.curve_data, x.data.scatter1_data, x.data.scatter2_data, chartOpts);
  },
  resize: function(widgetdiv, width, height) {
    return d3.select(widgetdiv).select("svg").attr("width", width).attr("height", height);
  }
});
