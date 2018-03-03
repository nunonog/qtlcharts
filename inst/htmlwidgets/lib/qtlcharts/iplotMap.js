"use strict";

// Generated by CoffeeScript 2.2.2
// iplotMap: interactive plot of a genetic marker map
// Karl W Broman
var add_search_box, iplotMap;

iplotMap = function iplotMap(widgetdiv, data, chartOpts) {
  var axispos, chartdivid, clean_marker_name, div, height, horizontal, linecolor, linecolorhilit, linewidth, margin, markerSelect, martip, mychart, nyticks, rectcolor, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, selectedMarker, shiftStart, svg, tickwidth, title, titlepos, widgetdivid, width, xlab, xlineOpts, ylab, ylim, yticks;
  // chartOpts start
  width = (ref = chartOpts != null ? chartOpts.width : void 0) != null ? ref : 1000; // width of chart in pixels
  height = (ref1 = chartOpts != null ? chartOpts.height : void 0) != null ? ref1 : 600; // height of chart in pixels
  margin = (ref2 = chartOpts != null ? chartOpts.margin : void 0) != null ? ref2 : {
    left: 60,
    top: 40,
    right: 100,
    bottom: 40,
    inner: 10 // margins in pixels (left, top, right, bottom, inner)
  };
  axispos = (ref3 = chartOpts != null ? chartOpts.axispos : void 0) != null ? ref3 : {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5 // position of axis labels in pixels (xtitle, ytitle, xlabel, ylabel)
  };
  titlepos = (ref4 = chartOpts != null ? chartOpts.titlepos : void 0) != null ? ref4 : 20; // position of chart title in pixels
  ylim = (ref5 = chartOpts != null ? chartOpts.ylim : void 0) != null ? ref5 : null; // y-axis limits
  nyticks = (ref6 = chartOpts != null ? chartOpts.nyticks : void 0) != null ? ref6 : 5; // no. ticks on y-axis
  yticks = (ref7 = chartOpts != null ? chartOpts.yticks : void 0) != null ? ref7 : null; // vector of tick positions on y-axis
  xlineOpts = (ref8 = chartOpts != null ? chartOpts.xlineOpts : void 0) != null ? ref8 : {
    color: "#cdcdcd",
    width: 5 // color and width of vertical lines
  };
  tickwidth = (ref9 = chartOpts != null ? chartOpts.tickwidth : void 0) != null ? ref9 : 10; // width of tick marks at markers, in pixels
  rectcolor = (ref10 = chartOpts != null ? chartOpts.rectcolor : void 0) != null ? ref10 : "#E6E6E6"; // color of background rectangle
  linecolor = (ref11 = chartOpts != null ? chartOpts.linecolor : void 0) != null ? ref11 : "slateblue"; // color of lines
  linecolorhilit = (ref12 = chartOpts != null ? chartOpts.linecolorhilit : void 0) != null ? ref12 : "Orchid"; // color of lines, when highlighted
  linewidth = (ref13 = chartOpts != null ? chartOpts.linewidth : void 0) != null ? ref13 : 3; // width of lines
  title = (ref14 = chartOpts != null ? chartOpts.title : void 0) != null ? ref14 : ""; // title for chart
  xlab = (ref15 = chartOpts != null ? chartOpts.xlab : void 0) != null ? ref15 : "Chromosome"; // x-axis label
  ylab = (ref16 = chartOpts != null ? chartOpts.ylab : void 0) != null ? ref16 : "Position (cM)"; // y-axis label
  shiftStart = (ref17 = chartOpts != null ? chartOpts.shiftStart : void 0) != null ? ref17 : false; // if true, shift the start of chromosomes to 0
  horizontal = (ref18 = chartOpts != null ? chartOpts.horizontal : void 0) != null ? ref18 : false; // if true, have chromosomes on vertical axis and positions horizontally
  // chartOpts end
  chartdivid = (ref19 = chartOpts != null ? chartOpts.chartdivid : void 0) != null ? ref19 : 'chart';
  widgetdivid = d3.select(widgetdiv).attr('id');
  // make sure list args have all necessary bits
  margin = d3panels.check_listarg_v_default(margin, {
    left: 60,
    top: 40,
    right: 100,
    bottom: 40,
    inner: 10
  });
  axispos = d3panels.check_listarg_v_default(axispos, {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  });
  mychart = d3panels.mapchart({
    height: height,
    width: width,
    margin: margin,
    axispos: axispos,
    titlepos: titlepos,
    ylim: ylim,
    yticks: yticks,
    nyticks: nyticks,
    xlineOpts: xlineOpts,
    tickwidth: tickwidth,
    rectcolor: rectcolor,
    linecolor: linecolor,
    linecolorhilit: linecolorhilit,
    linewidth: linewidth,
    title: title,
    xlab: xlab,
    ylab: ylab,
    horizontal: horizontal,
    shiftStart: shiftStart,
    tipclass: widgetdivid
  });
  // select htmlwidget div and grab its ID
  div = d3.select(widgetdiv);
  mychart(div.select("svg"), data);
  svg = mychart.svg();
  //#############################
  // code for marker search box for iplotMap
  //#############################

  // create marker tip
  martip = d3.tip().attr('class', "d3-tip " + widgetdivid).html(function (d) {
    var pos;
    pos = d3.format(".1f")(data.pos[data.marker.indexOf(d)]);
    return d + " (" + pos + ")";
  }).direction(function () {
    if (horizontal) {
      return 'n';
    }
    return 'e';
  }).offset(function () {
    if (horizontal) {
      return [-10, 0];
    }
    return [0, 10];
  });
  svg.call(martip);
  clean_marker_name = function clean_marker_name(markername) {
    return markername.replace(".", "\\.").replace("#", "\\#").replace("/", "\\/");
  };
  // grab selected marker from the search box
  selectedMarker = "";
  $("div#markerinput_" + widgetdivid).submit(function () {
    var line, newSelection;
    newSelection = document.getElementById("marker_" + widgetdivid).value;
    event.preventDefault();
    if (selectedMarker !== "") {
      div.select("line#" + clean_marker_name(selectedMarker)).attr("stroke", linecolor);
      martip.hide();
    }
    if (newSelection !== "") {
      if (data.marker.indexOf(newSelection) >= 0) {
        selectedMarker = newSelection;
        line = div.select("line#" + clean_marker_name(selectedMarker)).attr("stroke", linecolorhilit);
        martip.show(line.datum(), line.node());
        div.select("a#currentmarker").text("");
        return true;
      } else {
        div.select("a#currentmarker").text("Marker \"" + newSelection + "\" not found");
      }
    }
    return false;
  });
  // autocomplete
  $("input#marker_" + widgetdivid).autocomplete({
    autoFocus: true,
    source: function source(request, response) {
      var matches;
      matches = $.map(data.marker, function (tag) {
        if (tag.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
          return tag;
        }
      });
      return response(matches);
    },
    select: function select(event, ui) {
      $("input#marker_" + widgetdivid).val(ui.item.label);
      return $("input#submit_" + widgetdivid).submit();
    }
  });
  // grayed out "Marker name"
  $("input#marker_" + widgetdivid).each(function () {
    $("div.searchbox#markerinput_" + widgetdivid).addClass('inactive');
    return $(this).data('default', $(this).val()).focus(function () {
      $("div.searchbox#markerinput_" + widgetdivid).removeClass('inactive');
      if ($(this).val() === $(this).data('default') || $(this).val() === '') {
        return $(this).val('');
      }
    }).blur(function () {
      if ($(this).val() === '') {
        $("div.searchbox#markerinput_" + widgetdivid).addClass('inactive');
        return $(this).val($(this).data('default'));
      }
    });
  });
  // on hover, remove tool tip from marker search
  markerSelect = mychart.markerSelect();
  markerSelect.on("mouseover", function (d) {
    if (selectedMarker !== "") {
      if (selectedMarker !== d) {
        // de-highlight (if hovering over something other than the selected marker)
        div.select("line#" + clean_marker_name(selectedMarker)).attr("stroke", linecolor);
      }
      return martip.hide();
    }
  });
  if (chartOpts.heading != null) {
    d3.select("div#htmlwidget_container").insert("h2", ":first-child").html(chartOpts.heading).style("font-family", "sans-serif");
  }
  if (chartOpts.caption != null) {
    d3.select("body").append("p").attr("class", "caption").html(chartOpts.caption);
  }
  if (chartOpts.footer != null) {
    return d3.select("body").append("div").html(chartOpts.footer).style("font-family", "sans-serif");
  }
};

add_search_box = function add_search_box(widgetdiv) {
  var div, form, widgetdivid;
  div = d3.select(widgetdiv);
  widgetdivid = div.attr("id");
  form = div.append("div").attr("class", "searchbox").attr("id", "markerinput_" + widgetdivid).append("form").attr("name", "markerinput_" + widgetdivid);
  form.append("input").attr("id", "marker_" + widgetdivid).attr("type", "text").attr("value", "Marker name").attr("name", "marker");
  form.append("input").attr("type", "submit").attr("id", "submit_" + widgetdivid).attr("value", "Submit");
  return form.append("a").attr("id", "currentmarker");
};