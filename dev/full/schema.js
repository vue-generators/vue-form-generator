import fecha from "fecha";

import {
	validators
} from "../../src";

let customAsyncValidator = function(value) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (value)
				resolve();
			else
				resolve([ "Invalid value from async validator" ]);
		}, 1000);
	});
};

module.exports = {
	fields: [

		/***********/
		/*  INPUT  */
		/***********/
		{
			type: "input",
			inputType: "hidden",
			label: "--- INPUT ---",
			model: "",
			styleClasses: "alert alert-info"
		}, {
			type: "input",
			inputType: "hidden",
			label: "Hidden",
			model: "id",
			inputName: "hiddenField"
		}, {
			type: "input",
			inputType: "text",
			label: "First name",
			model: "firstName",
			featured: true,
			required: true,
			help: "First name of user",
			placeholder: "User's first name",
			styleClasses: "half-width",
			validator: validators.string,
			onChanged(model, newVal, oldVal, field) {
				console.log(`Model's name changed from ${oldVal} to ${newVal}. Model:`, model);
			},
			onValidated(model, errors, field) {
				if (errors.length > 0)
					console.warn("Validation error in Name field! Errors:", errors);
			}
		}, {
			type: "input",
			inputType: "text",
			label: "Last name",
			model: "lastName",
			featured: true,
			required: true,
			placeholder: "User's last name",
			styleClasses: "half-width",
			validator: validators.string
		}, {
			type: "input",
			inputType: "url",
			label: "URL",
			model: "website",
			placeholder: "Enter your website",
			inputName: "website",
			validator: customAsyncValidator //validators.url
		}, {
			type: "input",
			inputType: "tel",
			label: "Telephone",
			model: "phone",
			placeholder: "Enter your phone number",
			styleClasses: "half-width"
		}, {
			type: "input",
			inputType: "password",
			label: "Password",
			model: "password",
			placeholder: "Enter your password",
			min: 6,
			required: true,
			hint: "Minimum 6 characters",
			styleClasses: "half-width",
			validator: validators.string.locale({
				fieldIsRequired: "The password is required!",
				textTooSmall: "Password must be at least {1} characters!"
			})
		}, {
			type: "input",
			inputType: "date",
			label: "Date",
			model: "dob",
			styleClasses: "half-width"
			//format: "YYYY.MM.DD HH:mm:ss"
		}, {
			type: "input",
			inputType: "datetime",
			label: "Datetime",
			model: "dob",
			styleClasses: "half-width"
		}, {
			type: "input",
			inputType: "datetime-local",
			label: "Datetime local",
			model: "dob",
			styleClasses: "half-width"
		}, {
			type: "input",
			inputType: "time",
			label: "Time",
			model: "time",
			step: 1,
			styleClasses: "half-width"
		}, {
			type: "input",
			inputType: "month",
			label: "Month",
			model: "month",
			styleClasses: "half-width"
		}, {
			type: "input",
			inputType: "week",
			label: "Week",
			model: "week",
			styleClasses: "half-width"
		}, {
			type: "input",
			inputType: "number",
			label: "Number",
			model: "age",
			styleClasses: "half-width"
			//validator: validators.number
		}, {
			type: "input",
			inputType: "range",
			label: "Range",
			model: "rank",
			min: 0,
			max: 10,
			styleClasses: "half-width"
		}, {
			type: "input",
			inputType: "color",
			label: "Color",
			model: "color",
			styleClasses: "half-width"
		}, {
			type: "input",
			inputType: "checkbox",
			label: "Checkbox (show useless)",
			model: "checkbox",
			styleClasses: "half-width"
		}, {
			type: "input",
			inputType: "search",
			label: "Search USELESS",
			model: "search",
			placeholder: "Entrez un mot-clef",
			styleClasses: "half-width"
		}, {
			type: "input",
			inputType: "radio",
			label: "radio USELESS",
			model: "radio",
			styleClasses: "half-width"
		}, {
			type: "input",
			inputType: "file",
			label: "File USELESS",
			model: "file"
		}, {
			type: "input",
			inputType: "image",
			label: "Image USELESS",
			model: "image",
			styleClasses: "half-width"
		}, {
			type: "input",
			inputType: "button",
			label: "Button USELESS",
			model: "button",
			styleClasses: "half-width"
		}, {
			type: "input",
			inputType: "reset",
			label: "Reset USELESS",
			model: "reset",
			styleClasses: "half-width"
		}, {
			type: "input",
			inputType: "submit",
			label: "Submit USELESS",
			model: "submit",
			styleClasses: "half-width"
		},

		/**************/
		/*  BUILD IN  */
		/**************/

		{
			type: "input",
			inputType: "hidden",
			label: "--- BUILD IN ---",
			model: "",
			styleClasses: "alert alert-info"
		}, {
			type: "checklist",
			label: "CHECKLIST combobox",
			model: "checklistcombobox",
			listBox: false,
			values: [{
				name: "HTML5",
				value: "HTML5-123"
			}, {
				name: "Javascript",
				value: "Javascript-123"
			}, {
				name: "CSS3",
				value: "CSS3-123"
			}, {
				name: "CoffeeScript",
				value: "CoffeeScript-123"
			}, {
				name: "AngularJS",
				value: "AngularJS-123"
			}, {
				name: "ReactJS",
				value: "ReactJS-123"
			}, {
				name: "VueJS",
				value: "VueJS-123"
			}],
		}, {
			type: "checklist",
			label: "CHECKLIST listBox",
			model: "checklistlistbox",
			listBox: true,
			values: [{
				name: "HTML5",
				value: "HTML5-123"
			}, {
				name: "Javascript",
				value: "Javascript-123"
			}, {
				name: "CSS3",
				value: "CSS3-123"
			}, {
				name: "CoffeeScript",
				value: "CoffeeScript-123"
			}, {
				name: "AngularJS",
				value: "AngularJS-123"
			}, {
				name: "ReactJS",
				value: "ReactJS-123"
			}, {
				name: "VueJS",
				value: "VueJS-123"
			}],
		}, {
			type: "radios",
			label: "RADIOS",
			model: "radios",
			values: [{
				name: "HTML5",
				value: "HTML5-123"
			}, {
				name: "Javascript",
				value: "Javascript-123"
			}, {
				name: "CSS3",
				value: "CSS3-123"
			}, {
				name: "CoffeeScript",
				value: "CoffeeScript-123"
			}, {
				name: "AngularJS",
				value: "AngularJS-123"
			}, {
				name: "ReactJS",
				value: "ReactJS-123"
			}, {
				name: "VueJS",
				value: "VueJS-123"
			}],
			radiosOptions: {
				value: "value",
				name: "name"
			}
		}, {
			type: "radios",
			label: "RADIOS2",
			model: "radios2",
			values: [
				"HTML5",
				"Javascript",
				"CSS3",
				"CoffeeScript",
				"AngularJS",
				"ReactJS",
				"VueJS"
			]
		}, {
			type: "image",
			label: "Avatar (image field)",
			model: "avatar",
			required: true,
			browse: true,
			hideInput: false,
			inputName: "photo",
			validator: validators.required
		}, {
			type: "textArea",
			label: "Biography (textArea field)",
			model: "bio",
			hint(model) {
				if (model && model.bio) {
					return model.bio.length + " of max 500 characters used!";
				}
			},
			max: 500,
			placeholder: "User's biography",
			rows: 4,
			validator: validators.string
		}, {
			type: "input",
			inputType: "text",
			label: "Field with buttons",
			model: "address.geo",
			disabled: false,
			get(model) {
				if (model && model.address && model.address.geo)
					return model.address.geo.latitude + ", " + model.address.geo.longitude;
			},
			set(model, val) {
				let values = val.split(",");
				if (!model.address)
					model.address = {};
				if (!model.address.geo)
					model.address.geo = {};
				if (values.length > 0 && values[0].trim() != "")
					model.address.geo.latitude = parseFloat(values[0].trim());
				else
					model.address.geo.latitude = 0;
				if (values.length > 1 && values[1].trim() != "")
					model.address.geo.longitude = parseFloat(values[1].trim());
				else
					model.address.geo.longitude = 0;
			},
			buttons: [{
				classes: "btn-location",
				label: "Current location",
				onclick: function(model) {
					return this.$parent.getLocation(model);
				}
			}, {
				classes: "btn-clear",
				label: "Clear",
				onclick: function(model) {
					model.address.geo = {
						latitude: 0,
						longitude: 0
					};
				}
			}]
		}, {
			type: "staticMap",
			label: "Map",
			model: "address.geo",
			visible: false,
			staticMapOptions: {
				lat: "latitude",
				lng: "longitude",
				zoom: 6,
				sizeX: 640,
				sizeY: 640,
				scale: 1,
				format: "png",
				// maptype:"satellite",
				language: "FR-fr",
				// region:
				markers: "color:blue%7Clabel:S%7C43.107733,4.541936",
				// path:
				// visible:
				// style:"feature:road.highway%7Celement:labels.text.stroke%7Cvisibility:on%7Ccolor:0xb06eba&style=feature:road.highway%7Celement:labels.text.fill%7Cvisibility:on%7Ccolor:0xffffff",
				// key:
				// signature:
			}
		}, {
			type: "switch",
			label: "Status (switch field)",
			model: "status",
			multi: true,
			default: true,
			textOn: "Active",
			textOff: "Inactive",
			styleClasses: "half-width"
		}, {
			type: "switch",
			label: "Sex (switch field)",
			model: "sex",
			multi: true,
			default: "male",
			textOn: "Female",
			textOff: "Male",
			valueOn: "female",
			valueOff: "male",
			styleClasses: "half-width"
		}, {
			type: "label",
			label: "Created (label field)",
			model: "created",
			get(model) {
				// return model && model.created ? fecha.format(model.created,"MMMM  D YYYY H") : "-";
			},
			styleClasses: "half-width"
		}, {
			type: "submit",
			label: "",
			buttonText: "Submit form",
			validateBeforeSubmit: true,
			onSubmit(model, schema) {
				console.log("Form submitted!", model);
				alert("Form submitted!");
			},
			styleClasses: "half-width",
			disabled() {
				//console.log("Disabled: ", this.errors.length > 0);
				return this.errors.length > 0;
			}
		}, {
			type: "select",
			label: "Type (select field)",
			model: "type",
			required: true,
			values: [{
				id: "personal",
				name: "Personal"
			}, {
				id: "business",
				name: "Business"
			}],
			default: "personal"
		},


		{
			type: "select",
			label: "Role",
			model: "role",
			required: true,
			selectOptions: {
				noneSelectedText: "Nincs kijelölve"
			},
			values: [{
				id: "admin",
				name: "Administrator"
			}, {
				id: 0,
				name: "Zero"
			}, {
				id: "moderator",
				name: "Moderator"
			}, {
				id: "user",
				name: "Registered User"
			}, {
				id: "visitor",
				name: "Visitor"
			}],
			styleClasses: "half-width",
			validator: validators.required
		}, {
			type: "select",
			label: "Language",
			model: "language",
			required: true,
			values: [{
				id: "en-GB",
				name: "English (GB)"
			}, {
				id: "en-US",
				name: "English (US)"
			}, {
				id: "de",
				name: "German"
			}, {
				id: "it",
				name: "Italic"
			}, {
				id: "fr",
				name: "French"
			}],
			hint: "Your native language",
			styleClasses: "half-width",
			validator: validators.required
		},


		/************/
		/*  JQUERY  */
		/************/

		{
			type: "input",
			inputType: "hidden",
			label: "--- JQUERY ---",
			model: "",
			styleClasses: "alert alert-info"
		}, {
			type: "spectrum",
			label: "Color (spectrum field)",
			model: "favoriteColor",
			required: true,
			colorOptions: {
				//preferredFormat: "rgb"
			},
			validator: validators.required
		}, {
			type: "masked",
			label: "Mobile  (masked field)",
			model: "mobile",
			mask: "(99) 999-9999",
			styleClasses: ["half-width", "first"],
			validator: validators.required
		},
		/*{
			type: "selectEx",
			label: "Country (selectEx field)",
			model: "address.country",
			multi: true,
			required: true,
			values: ["United Kingdom", "France", "Germany"],
			//default: "United Kingdom",
			multiSelect: false,
			selectOptions: {
				// https://silviomoreto.github.io/bootstrap-select/options/
				liveSearch: true,
				size: 10,
				noneSelectedText: "Nincs kijelölve"
			},
			styleClasses: "half-width",
			validator: validators.required
		}, */
		/*{
			type: "selectEx",
			label: "Skills (selectEx field)",
			model: "skills",
			multi: true,
			required: false,
			multiSelect: true,
			selectOptions: {
				// https://silviomoreto.github.io/bootstrap-select/options/
				liveSearch: true,
				//maxOptions: 3,
				//size: 4,
				//actionsBox: true,
				selectedTextFormat: "count > 3"
			},
			values: [
				"HTML5",
				"Javascript",
				"CSS3",
				"CoffeeScript",
				"AngularJS",
				"ReactJS",
				"VueJS"
			],
			min: 2,
			max: 4,
			validator: validators.array
		},*/
		{
			type: "rangeSlider",
			label: "Rank (rangeSlider field)",
			model: "rank",
			multi: true,
			min: 0,
			max: 10,
			required: true,
			rangeSliderOptions: {
				grid: true
			},
			validator: validators.integer
		}, {
			type: "rangeSlider",
			label: "Income",
			model: "income",
			multi: true,
			min: 0,
			max: 100000,
			rangeSliderOptions: {
				type: "double",
				prefix: "$",
				step: 1000,
				force_edges: true
			}
		}, {
			type: "dateTimePicker",
			label: "DOB (dateTimePicker field)",
			model: "dob",
			required: true,
			placeholder: "User's birth of date",
			min: fecha.parse("1900-01-01", "YYYY-MM-DD"),
			max: fecha.parse("2018-01-01", "YYYY-MM-DD"),
			validator: [
				validators.date
			],
			dateTimePickerOptions: {
				format: "YYYY-MM-DD"
			},
			onChanged(model, newVal, oldVal, field) {
				//model.age = moment().year() - moment(newVal).year();
			}
		}, {
			type: "dateTimePicker",
			label: "DT",
			model: "dob",
			multi: true,
			validator: [
				validators.date
			],
			dateTimePickerOptions: {
				format: "YYYY-MM-DD HH:mm:ss"
			}
		}, {
			type: "dateTimePicker",
			label: "Time",
			model: "time",
			multi: true,
			format: "HH:mm:ss",
			/*validator: [
				validators.time
			],*/
			dateTimePickerOptions: {
				format: "HH:mm:ss"
			}
		},


		/*************/
		/*  VANILLA  */
		/*************/

		{
			type: "input",
			inputType: "hidden",
			label: "--- VANILLA ---",
			model: "",
			styleClasses: "alert alert-info"
		}, {
			type: "googleAddress",
			label: "Location (googleAddress)",
			model: "location",
			placeholder: "Location",
			onPlaceChanged(value, place, rawPlace, model, schema) {
				console.log("Location changed! " + value);
				//console.log(place);
				//console.log(rawPlace);
			}
		}, {
			type: "noUiSlider",
			label: "Rank (noUiSlider field)",
			model: "rank",
			multi: true,
			min: 1,
			max: 10,
			required: true,
			disabled: false,
			noUiSliderOptions: {
				connect: [true, false], // "lower", "upper", true, false
				// margin: 2 //number
				// limit: 2 //number
				step: 1,
				// orientation:"horizontal", //"vertical", "horizontal"
				// direction: "ltr", //"ltr", "rtl"
				// tooltips: false, // false, true, formatter, array[formatter or false]
				// animate: true,
				range: {
					"min": [0],
					"max": [10]
				},
				pips: {
					mode: "count",
					values: 6,
					density: 10,
					stepped: true
				}
			}
		}, {
			type: "noUiSlider",
			label: "Rank (noUiSlider field)",
			model: "income",
			multi: true,
			min: 0,
			max: 100000,
			required: true,
			disabled: false,
			noUiSliderOptions: {
				double: true,
				connect: [false, true, false], // "lower", "upper", true, false
				// margin: 2 //number
				// limit: 2 //number
				step: 1000,
				// orientation:"vertical", //"vertical", "horizontal"
				// direction: "ltr", //"ltr", "rtl"
				tooltips: true, // false, true, formatter, array[formatter or false]
				animate: false,
				range: {
					"min": [0],
					"max": [100000]
				},
				pips: {
					mode: "count",
					values: 6,
					density: 10,
					stepped: true
				}
			}
		}, {
			type: "cleave",
			label: "Mobile  (Cleave.js field)",
			model: "mobile",
			cleaveOptions: {
				// Credit Card
				creditCard: false,
				onCreditCardTypeChanged(type) {
					console.log("onCreditCardTypeChanged", type);
				},
				// Phone
				phone: false,
				phoneRegionCode: "AU",
				// Date
				date: false,
				datePattern: ["d", "m", "Y"],
				// Numerals
				numeral: false,
				numeralThousandsGroupStyle: "thousand",
				numeralDecimalScale: 2,
				numeralDecimalMark: ".",
				// General
				blocks: [0, 2, 0, 3, 4],
				delimiter: " ",
				delimiters: ["(", ")", " ", "-", "-"],
				// prefix: '(',
				numericOnly: true,
				uppercase: false,
				lowercase: false
			},
			styleClasses: "half-width",
			validator: validators.required
		}, {
			type: "pikaday",
			label: "DOB (pikaday field)",
			model: "dob",
			required: true,
			placeholder: "User's birth of date",
			validator: validators.date,
			pikadayOptions: {
				// bound: true,
				// position: 'bottom left',
				// reposition: true,
				// container: ,
				// format: 'YYYY-MM-DD HH:mm:ss',
				// formatStrict: ,
				// defaultDate: ,
				// setDefaultDate: ,
				// firstDay: 1,
				// minDate: ,
				// maxDate: ,
				// disableWeekends: false,
				// disableDayFn: ,
				// yearRange: ,
				// showWeekNumber: false,
				// isRTL: false,
				// i18n: {
				//     previousMonth : 'Previous Month',
				//     nextMonth     : 'Next Month',
				//     months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
				//     weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
				//     weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
				// },
				// yearSuffix: ,
				// showMonthAfterYear: false,
				// showDaysInNextAndPreviousMonths: false,
				// numberOfMonths: ,
				// mainCalendar: ,
				// theme: null,
				// onSelect: ,
				// onOpen: ,
				// onClose: ,
				// onDraw: ,
			},
			onChanged(model, newVal, oldVal, field) {
				// model.age = moment().year() - moment(newVal).year();
			}
		}, {
			type: "vueMultiSelect",
			label: "Skills (vue-multiSelect field)",
			model: "skills",
			required: true,
			selectOptions: {
				multiple: true,
				// id:25,
				// trackBy:"name",
				// label: "name",
				searchable: true,
				clearOnSelect: true,
				hideSelected: true,
				// maxHeight:300,
				// allowEmpty:true,
				// resetAfter:false,
				// closeOnSelect: true,
				// customLabel:function(){return ""},
				taggable: true,
				tagPlaceholder: "tagPlaceholder",
				onNewTag(newTag, id, options, value) {
					console.log("onNewTag", newTag, id, options, value);
					options.push(newTag);
					value.push(newTag);
				},
				// showPointer: true,
				onSearch(searchQuery, id, options) {
					console.log("onSearch", searchQuery, id, options);
				}
				// selectLabel: "selectLabel",
				// selectedLabel: "selectedLabel",
				// deselectLabel: "deselectLabel",
				// limit:2,
				// limitText: count => `and ${count} more`,
				// loading: false
			},
			values: [
				"HTML5",
				"Javascript",
				"CSS3",
				"CoffeeScript",
				"AngularJS",
				"ReactJS",
				"VueJS"
			],
			onChanged(model, newVal, oldVal, field) {
				console.log(`Model's skills changed from ${oldVal} to ${newVal}. Model:`, model);
			},
			max: 4,
			placeholder: "placeholder",
			validator: validators.array
		},

		/*******************/
		/*  CUSTOM FIELDS  */
		/*******************/

		{
			type: "input",
			inputType: "hidden",
			label: "--- CUSTOM FIELDS ---",
			model: "",
			styleClasses: "alert alert-info"
		}, {
			type: "awesome",
			label: "Awesome (custom field)",
			model: "userName"
		},

		/****************/
		/*  DEPRECATED  */
		/****************/

		// {
		// 	type: "text",
		// 	label: "ID (disabled text field)",
		// 	model: "id",
		// 	readonly: true,
		// 	editableIfNew: true, // TODO
		// 	featured: false,
		// 	disabled: true
		// },
		// {
		// 	type: "password",
		// 	label: "Password (password field)",
		// 	model: "password",
		// 	min: 6,
		// 	required: true,
		// 	hint: "Minimum 6 characters",
		// 	styleClasses: "half-width",
		// 	validator: validators.string
		// },
		// {	
		// 		type: "text",
		// 		label: "Username",
		// 		model: "userName",
		// 		featured: true,
		// 		required: true,
		// 		min: 5,
		// 		placeholder: "User's last name",
		// 		styleClasses: ["half-width", "first"],
		// 		validator: validators.string
		// 	}, 
		// {
		// 		type: "text",
		// 		label: "Company name",
		// 		model: "company.name",
		// 		styleClasses: ["company", "half-width"],
		// 		visible(model) {
		// 			return model && model.type == "business";
		// 		}
		// 	}, 
		// 	{
		// 		type: "text",
		// 		label: "Company phone",
		// 		model: "company.phone",
		// 		styleClasses: "company",
		// 		pattern: "^\\+[0-9]{2}-[237]0-[0-9]{3}-[0-9]{4}$",
		// 		placeholder: "User's phone number",
		// 		hint: "Format: +36-(20|30|70)-000-0000",
		// 		styleClasses: "half-width",
		// 		visible(model) {
		// 			return model && model.type == "business";
		// 		}
		// 	}, 
		// 	{
		// 		type: "email",
		// 		label: "E-mail (email field)",
		// 		model: "email",
		// 		placeholder: "User's e-mail address"
		// 	},  
		// 	{
		// 		type: "text",
		// 		label: "Phone",
		// 		model: "phone",
		// 		pattern: "^\\+[0-9]{2}-[237]0-[0-9]{3}-[0-9]{4}$",
		// 		placeholder: "User's phone number",
		// 		hint: "Format: +36-(20|30|70)-000-0000",
		// 		help: "You can use any <b>formatted</b> texts. Or place a <a target='_blank' href='https://github.com/icebob/vue-form-generator'>link</a> to another site.",
		// 		styleClasses: "half-width"
		// 			//validator: validators.regexp
		// 	}, 
		// 	{
		// 		type: "color",
		// 		label: "Color (basic)",
		// 		model: "favoriteColor",
		// 		required: true,
		// 		colorOptions: {
		// 			//preferredFormat: "rgb"
		// 		},
		// 		validator: validators.required
		// 	}, 
		// 	{
		// 		type: "number",
		// 		label: "Age (number field)",
		// 		model: "age",
		// 		multi: true,
		// 		disabled: true,
		// 		placeholder: "User's age",
		// 		hint: "Minimum 18 age.",
		// 		min: 18,
		// 		max: 100,
		// 		validator: [
		// 			validators.integer,
		// 			validators.number
		// 		]
		// 	}, 
		// 	{
		// 		type: "text",
		// 		label: "City",
		// 		model: "address.city",
		// 		multi: true,
		// 		styleClasses: "half-width",
		// 		validator: validators.required
		// 	}, {
		// 		type: "text",
		// 		label: "Street",
		// 		model: "address.street"
		// 	}, {
		// 		type: "text",
		// 		label: "GPS",
		// 		model: "address.geo",
		// 		disabled: false,
		// 		get(model) {
		// 			if (model && model.address && model.address.geo)
		// 				return model.address.geo.latitude + ", " + model.address.geo.longitude;
		// 		},
		// 		set(model, val) {
		// 			let values = val.split(",");
		// 			if (!model.address)
		// 				model.address = {};
		// 			if (!model.address.geo)
		// 				model.address.geo = {};
		// 			if (values.length > 0 && values[0].trim() != "")
		// 				model.address.geo.latitude = parseFloat(values[0].trim());
		// 			else
		// 				model.address.geo.latitude = 0
		// 			if (values.length > 1 && values[1].trim() != "")
		// 				model.address.geo.longitude = parseFloat(values[1].trim());
		// 			else
		// 				model.address.geo.longitude = 0
		// 		},
		// 		buttons: [{
		// 			classes: "btn-location",
		// 			label: "Current location",
		// 			onclick: function(model) {
		// 				if (navigator.geolocation) {
		// 					navigator.geolocation.getCurrentPosition((pos) => {
		// 						if (!model.address)
		// 							model.address = {};
		// 						if (!model.address.geo)
		// 							model.address.geo = {};
		// 						model.address.geo.latitude = pos.coords.latitude.toFixed(5);
		// 						model.address.geo.longitude = pos.coords.longitude.toFixed(5);
		// 					});
		// 				} else {
		// 					alert("Geolocation is not supported by this browser.");
		// 				}
		// 			}
		// 		}, {
		// 			classes: "btn-clear",
		// 			label: "Clear",
		// 			onclick: function(model) {
		// 				model.address.geo = {
		// 					latitude: 0,
		// 					longitude: 0
		// 				};
		// 			}
		// 		}]
		// 	}, 

	]
};