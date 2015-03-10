// Generated by CoffeeScript 1.9.1
HTMLWidgets.widget({
  name: "iplotScantwo",
  type: "output",
  initialize: function(widgetdiv, width, height) {
    return d3.select(widgetdiv).append("svg").attr("class", "qtlcharts").attr("width", width).attr("height", height - 24);
  },
  renderValue: function(widgetdiv, x) {
    var chartOpts, ref, ref1, ref2, svg;
    svg = d3.select(widgetdiv).select("svg");
    chartOpts = (ref = x.chartOpts) != null ? ref : {};
    chartOpts.width = (ref1 = chartOpts != null ? chartOpts.width : void 0) != null ? ref1 : svg.attr("width");
    chartOpts.height = (ref2 = chartOpts != null ? chartOpts.height : void 0) != null ? ref2 : svg.attr("height") + 24;
    svg.attr("width", chartOpts.width);
    svg.attr("height", chartOpts.height - 24);
    return iplotScantwo(widgetdiv, x.scantwo_data, x.phenogeno_data, chartOpts);
  },
  resize: function(widgetdiv, width, height) {
    return null;
  }
});
