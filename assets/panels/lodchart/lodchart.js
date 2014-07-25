// Generated by CoffeeScript 1.7.1
var lodchart;

lodchart = function() {
  var axispos, chart, chrGap, chrSelect, darkrect, height, lightrect, linecolor, linewidth, lodcurve, lodvarname, margin, markerSelect, nyticks, pad4heatmap, pointcolor, pointsAtMarkers, pointsize, pointstroke, rotate_ylab, title, titlepos, width, xlab, xscale, ylab, ylim, yscale, yticks;
  width = 800;
  height = 500;
  margin = {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };
  axispos = {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  titlepos = 20;
  ylim = null;
  nyticks = 5;
  yticks = null;
  chrGap = 8;
  darkrect = "#c8c8c8";
  lightrect = "#e6e6e6";
  linecolor = "darkslateblue";
  linewidth = 2;
  pointcolor = "#E9CFEC";
  pointsize = 0;
  pointstroke = "black";
  title = "";
  xlab = "Chromosome";
  ylab = "LOD score";
  rotate_ylab = null;
  yscale = d3.scale.linear();
  xscale = null;
  pad4heatmap = false;
  lodcurve = null;
  lodvarname = null;
  markerSelect = null;
  chrSelect = null;
  pointsAtMarkers = true;
  chart = function(selection) {
    return selection.each(function(data) {
      var chr, curves, g, gEnter, hiddenpoints, lodvarnum, markerpoints, markertip, svg, titlegrp, x, xaxis, yaxis, _i, _len, _ref, _ref1;
      lodvarname = lodvarname != null ? lodvarname : data.lodnames[0];
      data[lodvarname] = (function() {
        var _i, _len, _ref, _results;
        _ref = data[lodvarname];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          _results.push(Math.abs(x));
        }
        return _results;
      })();
      ylim = ylim != null ? ylim : [0, d3.max(data[lodvarname])];
      lodvarnum = data.lodnames.indexOf(lodvarname);
      svg = d3.select(this).selectAll("svg").data([data]);
      gEnter = svg.enter().append("svg").append("g");
      svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
      g = svg.select("g");
      g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", height).attr("width", width).attr("fill", darkrect).attr("stroke", "none");
      margin.inner = (_ref = margin != null ? margin.inner : void 0) != null ? _ref : 0;
      yscale.domain(ylim).range([height + margin.top, margin.top + margin.inner]);
      yticks = yticks != null ? yticks : yscale.ticks(nyticks);
      data = reorgLodData(data, lodvarname);
      data = chrscales(data, width, chrGap, margin.left, pad4heatmap);
      xscale = data.xscale;
      chrSelect = g.append("g").attr("class", "chrRect").selectAll("empty").data(data.chrnames).enter().append("rect").attr("id", function(d) {
        return "chrrect" + d;
      }).attr("x", function(d, i) {
        if (i === 0 && pad4heatmap) {
          return data.chrStart[i];
        }
        return data.chrStart[i] - chrGap / 2;
      }).attr("width", function(d, i) {
        if ((i === 0 || i + 1 === data.chrnames.length) && pad4heatmap) {
          return data.chrEnd[i] - data.chrStart[i] + chrGap / 2;
        }
        return data.chrEnd[i] - data.chrStart[i] + chrGap;
      }).attr("y", margin.top).attr("height", height).attr("fill", function(d, i) {
        if (i % 2) {
          return darkrect;
        }
        return lightrect;
      }).attr("stroke", "none");
      xaxis = g.append("g").attr("class", "x axis");
      xaxis.selectAll("empty").data(data.chrnames).enter().append("text").text(function(d) {
        return d;
      }).attr("x", function(d, i) {
        return (data.chrStart[i] + data.chrEnd[i]) / 2;
      }).attr("y", margin.top + height + axispos.xlabel);
      xaxis.append("text").attr("class", "title").attr("y", margin.top + height + axispos.xtitle).attr("x", margin.left + width / 2).text(xlab);
      rotate_ylab = rotate_ylab != null ? rotate_ylab : ylab.length > 1;
      yaxis = g.append("g").attr("class", "y axis");
      yaxis.selectAll("empty").data(yticks).enter().append("line").attr("y1", function(d) {
        return yscale(d);
      }).attr("y2", function(d) {
        return yscale(d);
      }).attr("x1", margin.left).attr("x2", margin.left + width).attr("fill", "none").attr("stroke", "white").attr("stroke-width", 1).style("pointer-events", "none");
      yaxis.selectAll("empty").data(yticks).enter().append("text").attr("y", function(d) {
        return yscale(d);
      }).attr("x", margin.left - axispos.ylabel).text(function(d) {
        return formatAxis(yticks)(d);
      });
      yaxis.append("text").attr("class", "title").attr("y", margin.top + height / 2).attr("x", margin.left - axispos.ytitle).text(ylab).attr("transform", rotate_ylab ? "rotate(270," + (margin.left - axispos.ytitle) + "," + (margin.top + height / 2) + ")" : "");
      lodcurve = function(chr, lodcolumn) {
        return d3.svg.line().x(function(d) {
          return xscale[chr](d);
        }).y(function(d, i) {
          return yscale(data.lodByChr[chr][i][lodcolumn]);
        });
      };
      curves = g.append("g").attr("id", "curves");
      _ref1 = data.chrnames;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        chr = _ref1[_i];
        curves.append("path").datum(data.posByChr[chr]).attr("d", lodcurve(chr, lodvarnum)).attr("stroke", linecolor).attr("fill", "none").attr("stroke-width", linewidth).style("pointer-events", "none");
      }
      if (pointsize > 0) {
        markerpoints = g.append("g").attr("id", "markerpoints_visible");
        markerpoints.selectAll("empty").data(data.markers).enter().append("circle").attr("cx", function(d) {
          return xscale[d.chr](d.pos);
        }).attr("cy", function(d) {
          return yscale(d.lod);
        }).attr("r", pointsize).attr("fill", pointcolor).attr("stroke", pointstroke).attr("pointer-events", "hidden");
      }
      if (pointsAtMarkers) {
        hiddenpoints = g.append("g").attr("id", "markerpoints_hidden");
        markertip = d3.tip().attr('class', 'd3-tip').html(function(d) {
          return [d.name, " LOD = " + (d3.format('.2f')(d.lod))];
        }).direction("e").offset([0, 10]);
        svg.call(markertip);
        markerSelect = hiddenpoints.selectAll("empty").data(data.markers).enter().append("circle").attr("cx", function(d) {
          return xscale[d.chr](d.pos);
        }).attr("cy", function(d) {
          return yscale(d.lod);
        }).attr("id", function(d) {
          return d.name;
        }).attr("r", d3.max([pointsize * 2, 3])).attr("opacity", 0).attr("fill", pointcolor).attr("stroke", pointstroke).attr("stroke-width", "1").on("mouseover.paneltip", function(d) {
          d3.select(this).attr("opacity", 1);
          return markertip.show(d);
        }).on("mouseout.paneltip", function() {
          return d3.select(this).attr("opacity", 0).call(markertip.hide);
        });
      }
      titlegrp = g.append("g").attr("class", "title").append("text").attr("x", margin.left + width / 2).attr("y", margin.top - titlepos).text(title);
      return g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", height).attr("width", function() {
        if (pad4heatmap) {
          return data.chrEnd.slice(-1)[0] - margin.left;
        }
        return data.chrEnd.slice(-1)[0] - margin.left + chrGap / 2;
      }).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "none");
    });
  };
  chart.width = function(value) {
    if (!arguments.length) {
      return width;
    }
    width = value;
    return chart;
  };
  chart.height = function(value) {
    if (!arguments.length) {
      return height;
    }
    height = value;
    return chart;
  };
  chart.margin = function(value) {
    if (!arguments.length) {
      return margin;
    }
    margin = value;
    return chart;
  };
  chart.titlepos = function(value) {
    if (!arguments.length) {
      return titlepos;
    }
    titlepos;
    return chart;
  };
  chart.axispos = function(value) {
    if (!arguments.length) {
      return axispos;
    }
    axispos = value;
    return chart;
  };
  chart.ylim = function(value) {
    if (!arguments.length) {
      return ylim;
    }
    ylim = value;
    return chart;
  };
  chart.nyticks = function(value) {
    if (!arguments.length) {
      return nyticks;
    }
    nyticks = value;
    return chart;
  };
  chart.yticks = function(value) {
    if (!arguments.length) {
      return yticks;
    }
    yticks = value;
    return chart;
  };
  chart.chrGap = function(value) {
    if (!arguments.length) {
      return chrGap;
    }
    chrGap = value;
    return chart;
  };
  chart.darkrect = function(value) {
    if (!arguments.length) {
      return darkrect;
    }
    darkrect = value;
    return chart;
  };
  chart.lightrect = function(value) {
    if (!arguments.length) {
      return lightrect;
    }
    lightrect = value;
    return chart;
  };
  chart.linecolor = function(value) {
    if (!arguments.length) {
      return linecolor;
    }
    linecolor = value;
    return chart;
  };
  chart.linewidth = function(value) {
    if (!arguments.length) {
      return linewidth;
    }
    linewidth = value;
    return chart;
  };
  chart.pointcolor = function(value) {
    if (!arguments.length) {
      return pointcolor;
    }
    pointcolor = value;
    return chart;
  };
  chart.pointsize = function(value) {
    if (!arguments.length) {
      return pointsize;
    }
    pointsize = value;
    return chart;
  };
  chart.pointstroke = function(value) {
    if (!arguments.length) {
      return pointstroke;
    }
    pointstroke = value;
    return chart;
  };
  chart.title = function(value) {
    if (!arguments.length) {
      return title;
    }
    title = value;
    return chart;
  };
  chart.xlab = function(value) {
    if (!arguments.length) {
      return xlab;
    }
    xlab = value;
    return chart;
  };
  chart.ylab = function(value) {
    if (!arguments.length) {
      return ylab;
    }
    ylab = value;
    return chart;
  };
  chart.rotate_ylab = function(value) {
    if (!arguments.length) {
      return rotate_ylab;
    }
    rotate_ylab = value;
    return chart;
  };
  chart.lodvarname = function(value) {
    if (!arguments.length) {
      return lodvarname;
    }
    lodvarname = value;
    return chart;
  };
  chart.pad4heatmap = function(value) {
    if (!arguments.length) {
      return pad4heatmap;
    }
    pad4heatmap = value;
    return chart;
  };
  chart.pointsAtMarkers = function(value) {
    if (!arguments.length) {
      return pointsAtMarkers;
    }
    pointsAtMarkers = value;
    return chart;
  };
  chart.yscale = function() {
    return yscale;
  };
  chart.xscale = function() {
    return xscale;
  };
  chart.lodcurve = function() {
    return lodcurve;
  };
  chart.markerSelect = function() {
    return markerSelect;
  };
  chart.chrSelect = function() {
    return chrSelect;
  };
  return chart;
};
