class Colorer {
	constructor(indicator_values) {
		this.indicator_values = indicator_values;
		this.colors = d3.scaleQuantize()
				.range(['#feedde','#fdbe85','#fd8d3c','#e6550d','#a63603']);
				// ['#feedde','#fdd0a2','#fdae6b','#fd8d3c','#f16913','#d94801','#8c2d04']);

	}

	getColor(indicator, area_id) {
		const ind_min = this.getMin(indicator);
		const ind_max = this.getMax(indicator);
		var span = (ind_max - ind_min) / 5;

		this.colors = this.colors.domain([ind_min+d, ind_min+2*d, ind_min+3*d,
								 ind_min+4*d, ind_min+5*d]);
		const ind_val = this.indicator_values[indicator][area_id];
		console.log()

		if (ind_val >= 0) {
			return this.colors(ind_val);
		} else {
			return 'black';
		}
	}

	getMax(indicator) {
		return Math.max.apply(null, Object
			.keys(this.indicator_values[indicator])
			.map(key => this.indicator_values[indicator][key])
			.filter(v => !!v));
	}

	getMin(indicator) {
		return Math.min.apply(null, Object
			.keys(this.indicator_values[indicator])
			.map(key => this.indicator_values[indicator][key])
			.filter(v => !!v));
	}


}