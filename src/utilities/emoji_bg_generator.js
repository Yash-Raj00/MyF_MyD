var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var svgNS = svg.namespaceURI;

var rect = document.createElementNS(svgNS, "rect");
rect.setAttribute("x", 5);
rect.setAttribute("y", 5);
rect.setAttribute("width", 500);
rect.setAttribute("height", 500);
rect.setAttribute("fill", "#ffffff");
svg.appendChild(rect);
document.body.appendChild(svg);
