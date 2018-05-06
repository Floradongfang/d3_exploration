// XHR: XMLHttpRequest API (superclass of .dsv/.csv/.tsv, .xml, .html, .json)
var PromiseWrapper = (xhr, d) => new Promise(
				resolve => xhr(d, (p) => resolve(p)));

const map_svg = d3.select('#map');

Promise
	.all([
		PromiseWrapper(d3.json, "data/cb_2016_us_county_20m.json")
	])
	.then(resolve => {
		const map = new Choropleth(map_svg, resolve[0])
		console.log(map);
	});

