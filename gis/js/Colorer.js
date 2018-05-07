class Colorer {
	constructor(indicator_values) {
		this.indicator_values = indicator_values;

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