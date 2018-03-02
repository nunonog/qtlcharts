// Generated by CoffeeScript 2.2.2
// iplotScantwo: interactive plot of scantwo results (2-dim, 2-QTL genome scan)
// Karl W Broman
HTMLWidgets.widget({
  name: "iplotScantwo",
  type: "output",
  initialize: function(widgetdiv, width, height) {
    return d3.select(widgetdiv).append("svg").attr("class", "qtlcharts").attr("width", width).attr("height", height - 24); // 24 = form div height
  },
  renderValue: function(widgetdiv, x) {
    var chartOpts, ref, ref1, ref2, svg, widgetid;
    svg = d3.select(widgetdiv).select("svg");
    // clear svg and remove tool tips
    svg.selectAll("*").remove();
    widgetid = d3.select(widgetdiv).attr('id');
    d3.selectAll(`div.d3-tip.${widgetid}`).remove();
    chartOpts = (ref = x.chartOpts) != null ? ref : {};
    chartOpts.width = (ref1 = chartOpts != null ? chartOpts.width : void 0) != null ? ref1 : svg.attr("width");
    chartOpts.height = (ref2 = chartOpts != null ? chartOpts.height : void 0) != null ? ref2 : +svg.attr("height") + 24; // 24 = form height
    chartOpts.height -= 24; // 24 = form height
    svg.attr("width", chartOpts.width);
    svg.attr("height", chartOpts.height);
    return iplotScantwo(widgetdiv, x.scantwo_data, x.phenogeno_data, chartOpts);
  },
  resize: function(widgetdiv, width, height) {
    return d3.select(widgetdiv).select("svg").attr("width", width).attr("height", height);
  }
});
