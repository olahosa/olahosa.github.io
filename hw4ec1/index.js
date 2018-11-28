//Width and height
var w = 400;
var h = 400;

d3.select("svg").remove();

// Create SVG element
var svg = d3.select("body")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

svg.append("rect")
	.attr("x", "0")
	.attr("y", "0")
	.attr("width", w)
	.attr("height", h)
	.attr("fill", d3.rgb(100, 0, 0));
