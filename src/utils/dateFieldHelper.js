import fecha from "fecha";

export default {
	formatValueToField(value) {
		if (value != null) {
			let dt = this.fieldOptions.format ? fecha.parse(value, this.fieldOptions.format) : new Date(value);
			return fecha.format(dt, this.getDateFormat());
		}

		return value;
	},

	formatValueToModel(value) {
		if (value != null) {
			let m = fecha.parse(value, this.getDateFormat());
			if (this.fieldOptions.format) {
				value = fecha.format(m, this.fieldOptions.format);
			} else {
				value = m.valueOf();
			}
		}

		return value;
	}
};
