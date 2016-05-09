import { isNil, isNumber, isString } from "lodash";
import moment from "moment";

function checkEmpty(value, required) {
	if (isNil(value) || value === "") {
		if (required)
			return ["This field is required!"];
		else
			return [];
	}
	return null;
}

module.exports = {
	
	number(value, field) {
		let res = checkEmpty(value, field.required); if (res != null) return res;

		let err = [];
		if (isNumber(value)) {
			if (!isNil(field.min) && value < field.min)
				err.push("The number is too small! Minimum: " + field.min);

			if (!isNil(field.max) && value > field.max)
				err.push("The number is too big! Maximum: " + field.max);

		} else 
			err.push("This is not a number!");

		return err;
	},

	integer(value, field) {
		let res = checkEmpty(value, field.required); if (res != null) return res;

		if (!(Number(value) === value && value % 1 === 0))
			return ["Invalid number!"];
		
		return [];
	},

	double(value, field) {
		let res = checkEmpty(value, field.required); if (res != null) return res;

		if (!(Number(value) === value && value % 1 !== 0))
			return ["Invalid number!"];
		
		return [];
	},

	string(value, field) {
		let res = checkEmpty(value, field.required); if (res != null) return res;

		let err = [];
		if (isString(value)) {
			if (!isNil(field.min) && value.length < field.min)
				err.push(`The length of text is too small! Current: ${value.length}, Minimum: ${field.min}`);

			if (!isNil(field.max) && value.length > field.max)
				err.push(`The length of text is too big! Current: ${value.length}, Maximum: ${field.max}`);

		} else 
			err.push("This is not a text!");

		return err;
	},

	date(value, field) {
		let res = checkEmpty(value, field.required); if (res != null) return res;

		let m = moment(value);
		if (!m.isValid()) 
			return ["Invalid date!"];

		let err = [];

		if (!isNil(field.min)) {
			let min = moment(field.min);
			if (m.isBefore(min))
				err.push(`The date is too early! Current: ${m.format("L")}, Minimum: ${min.format("L")}`);
		}

		if (!isNil(field.max)) {
			let max = moment(field.max);
			if (m.isAfter(max))
				err.push(`The date is too late! Current: ${m.format("L")}, Maximum: ${max.format("L")}`);
		}

		return err;
	},

	regexp(value, field) {
		let res = checkEmpty(value, field.required); if (res != null) return res;

		if (!isNil(field.pattern)) {
			let re = new RegExp(field.pattern);
			if (!re.test(value))
				return ["Invalid format!"];
		}
	},

	email(value, field) {
		let res = checkEmpty(value, field.required); if (res != null) return res;

		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(value))
			return ["Invalid e-mail address!"];
	},	

	url(value, field) {
		let res = checkEmpty(value, field.required); if (res != null) return res;

		let re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
		if (!re.test(value))
			return ["Invalid URL!"];
	},	

	creditCard(value, field) {
		let res = checkEmpty(value, field.required); if (res != null) return res;

		/*  From validator.js code 
			https://github.com/chriso/validator.js/blob/master/src/lib/isCreditCard.js
		*/
		const creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
		const sanitized = value.replace(/[^0-9]+/g, "");
		if (!creditCard.test(sanitized)) {
			return ["Invalid card format!"];
		}
		let sum = 0;
		let digit;
		let tmpNum;
		let shouldDouble;
		for (let i = sanitized.length - 1; i >= 0; i--) {
			digit = sanitized.substring(i, (i + 1));
			tmpNum = parseInt(digit, 10);
			if (shouldDouble) {
				tmpNum *= 2;
				if (tmpNum >= 10) {
					sum += ((tmpNum % 10) + 1);
				} else {
					sum += tmpNum;
				}
			} else {
				sum += tmpNum;
			}
			shouldDouble = !shouldDouble;
		}

		if (!((sum % 10) === 0 ? sanitized : false))
			return ["Invalid card number!"];
	},

	alpha(value, field) {
		let res = checkEmpty(value, field.required); if (res != null) return res;

		// TODO
	},

	alphaNumeric(value, field) {
		let res = checkEmpty(value, field.required); if (res != null) return res;

		// TODO
	}
};