class Choropleth {
	constructor(svg, geojson, outline) {
		const self = this;
		this.svg = svg;
		this.geojson = geojson;
		this.outline = outline;

		this.dispatch = d3.dispatch('click', 'hover');
		this.map = d3.geoPath().projection(d3.geoAlbersUsa());
		this.legend = this.svg.append('g').attr('transform', `translate(280,15)`);

		// The term 'counties' essentially means 'polygon'
		this.counties = this.svg.append('g');

		this.counties.selectAll('path')
			.data(this.geojson.features)
			.enter()
			.append('path')
				.attr('d', this.map)
				.classed('feature', true)
				.on('mouseover', (d, i) => self.dispatch
					.call('hover', {}, d.properties.GEOID, i));

		console.log("this.counties: ");
		console.log(this.counties);
		console.log(this.geojson.features);

		// this.counties
		// 	.data(this.outline.features)
		// 	.append('path')
		// 	.attr(this.map)
		// 	// .classed('outline', true)
		// 	// .lower()
	}

	update() {
		const self = this;
		this.state = state;
		this.counties.selectAll('path').classed('active', function (d, i) {
				if (state.selected[d.properties.GEOID]) { d3.select(this).raise(); }
				state,selected[d.properties.GEOID];
			})
			.transition()
			.duration(50)
			.attr('fill', '#2ca25f');

	}
	hover(state) {
		this.counties.selectAll('path').classed('hover', (d, i) => 
			d.properties.GEOID === state.hover);
	}
}