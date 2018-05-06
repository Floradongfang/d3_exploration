class Choropleth {
	constructor(svg, features) {
		const self = this;
		this.svg = svg;
		this.features = features;

		this.map = d3.geoPath().projection(d3.geoAlbersUsa());

		// The term 'counties' essentially means 'polygon'
		this.counties = this.svg.append('g');


	}


}