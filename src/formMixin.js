import { isArray, isString } from "lodash";

export default {
	methods: {
		getStyleClasses(field, baseClasses) {
			let styleClasses = field.styleClasses;

			if (isArray(styleClasses)) {
				styleClasses.forEach((c) => {
					baseClasses[c] = true;
				});
			} else if (isString(styleClasses)) {
				baseClasses[styleClasses] = true;
			}
			return baseClasses;
		}
	}
};
