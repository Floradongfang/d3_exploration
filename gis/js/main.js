// XHR: XMLHttpRequest API (superclass of .dsv/.csv/.tsv, .xml, .html, .json)
var PromiseWrapper = (xhr, d) => new Promise(
				resolve => xhr(d, (p) => resolve(p)));

const map_svg = d3.select('#map');

Promise
	.all([
		PromiseWrapper(d3.json, "data/cb_2016_us_county_20m_geo.json"),
		PromiseWrapper(d3.json, "data/cb_2016_us_state_20m_geo.json"),
		PromiseWrapper(d3.csv, "data/ACS_16_pop_demos.csv"),
		PromiseWrapper(d3.json, "data/state.json")
	])
	.then(resolve => {
		// console.log(map);
		// console.log(resolve[0]);
		console.log(resolve[2]);
		const map = new Choropleth(map_svg, resolve[0], resolve[1], resolve[2])
		// console.log(resolve[0].features);
		map.dispatch.on('hover', (d, i) => {
			resolve[3].hover = d;
			map.hover(resolve[3]);
		})

	});

