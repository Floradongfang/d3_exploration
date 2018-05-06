class Choropleth {
	constructor(svg, geojson, outline) {
		const self = this;
		this.svg = svg;
		this.geojson = geojson;
		this.outline = outline;

		this.map = d3.geoPath().projection(d3.geoAlbersUsa());

		// The term 'counties' essentially means 'polygon'
		this.counties = this.svg.append('g');

		this.counties.selectAll('path')
			.data(this.geojson.features)
			.enter()
			.append('path')
				.attr('d', this.map);
				// .classed('feature', true);

		console.log(this.counties);

		this.counties
			.data(this.outline.features)
			.append('path')
			.attr(this.map)
			// .classed('outline', true)
			// .lower()
	}

	// update() {
	// 	const self = this;
	// 	this.counties.selectAll('path').classed

	// }
}