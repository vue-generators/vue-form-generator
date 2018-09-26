/* eslint no-console: 0 */
import fecha from "fecha";

import { validators } from "../../../src";

let customAsyncValidator = function(value) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (value) resolve();
			else reject(["Invalid value from async validator"]);
		}, 1000);
	});
};

export default {
	fields: [
		/** *********/
		/*  INPUT   */
		/** *********/
		{
			type: "input",
			model: "",
			label: "--- INPUT ---",
			fieldClasses: "alert alert-info",
			fieldOptions: {
				inputType: "hidden"
			}
		},
		{
			type: "input",
			model: "id",
			label: "Hidden",
			inputName: "hiddenField",
			fieldOptions: {
				inputType: "hidden"
			}
		},
		{
			type: "input",
			model: "firstName",
			label: "First name",
			placeholder: "User's first name",
			featured: true,
			required: true,
			help: "First name of user",
			validator: validators.string,
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "text"
			},
			onChanged(model, newVal, oldVal) {
				console.log(`Model's name changed from ${oldVal} to ${newVal}. Model:`, model);
			},
			onValidated(model, errors) {
				if (errors.length > 0) {
					console.warn("Validation error in Name field! Errors:", errors);
				}
			}
		},
		{
			type: "input",
			model: "lastName",
			label: "Last name",
			placeholder: "User's last name",
			featured: true,
			required: true,
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "text"
			},
			validator: validators.string
		},
		{
			type: "input",
			model: "website",
			label: "URL",
			placeholder: "Enter your website",
			inputName: "website",
			fieldOptions: {
				inputType: "url"
			},
			validator: customAsyncValidator // validators.url
		},
		{
			type: "input",
			model: "phone",
			label: "Telephone",
			placeholder: "Enter your phone number",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "tel"
			}
		},
		{
			type: "input",
			model: "password",
			label: "Password",
			placeholder: "Enter your password",
			hint: "Minimum 6 characters",
			required: true,
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "password",
				min: 6
			},
			validator: validators.string.locale({
				fieldIsRequired: "The password is required!",
				textTooSmall: "Password must be at least {1} characters!"
			})
		},
		{
			type: "input",
			model: "dob",
			label: "Date",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "date"
				// format: "YYYY.MM.DD HH:mm:ss"
			}
		},
		{
			type: "input",
			model: "dob2",
			label: "Datetime",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "datetime"
			}
		},
		{
			type: "input",
			model: "dob3",
			label: "Datetime local",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "datetime-local"
			}
		},
		{
			type: "input",
			model: "time",
			label: "Time",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "time",
				step: 1
			}
		},
		{
			type: "input",
			model: "month",
			label: "Month",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "month"
			}
		},
		{
			type: "input",
			model: "week",
			label: "Week",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "week"
			}
		},
		{
			type: "input",
			label: "Number",
			model: "age",
			// validator: validators.number
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "number"
			}
		},
		{
			type: "input",
			model: "rank",
			label: "Range",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "range",
				min: 0,
				max: 10
			}
		},
		{
			type: "input",
			model: "color",
			label: "Color",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "color"
			}
		},
		{
			type: "input",
			model: "checkbox",
			label: "Checkbox (show useless)",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "checkbox"
			}
		},
		{
			type: "input",
			model: "search",
			label: "Search USELESS",
			placeholder: "Entrez un mot-clef",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "search"
			}
		},
		{
			type: "input",
			model: "radio",
			label: "radio USELESS",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "radio"
			}
		},
		{
			type: "input",
			model: "image",
			label: "Image USELESS",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "image"
			}
		},
		{
			type: "input",
			model: "button",
			label: "Button USELESS",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "button"
			}
		},
		{
			type: "input",
			model: "reset",
			label: "Reset USELESS",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "reset"
			}
		},
		{
			type: "input",
			model: "submit",
			label: "Submit USELESS",
			fieldClasses: "half-width",
			fieldOptions: {
				inputType: "submit"
			}
		},

		/** ************/
		/*  BUILD IN   */
		/** ************/

		{
			type: "input",
			model: "",
			label: "--- BUILD IN ---",
			fieldClasses: "alert alert-info",
			fieldOptions: {
				inputType: "hidden"
			}
		},
		{
			type: "checklist",
			model: "checklistcombobox",
			label: "CHECKLIST (combobox)",
			fieldOptions: {
				listBox: false
			},
			values: [
				{
					name: "HTML5",
					value: "HTML5-123"
				},
				{
					name: "Javascript",
					value: "Javascript-123"
				},
				{
					name: "CSS3",
					value: "CSS3-123"
				},
				{
					name: "CoffeeScript",
					value: "CoffeeScript-123"
				},
				{
					name: "AngularJS",
					value: "AngularJS-123"
				},
				{
					name: "ReactJS",
					value: "ReactJS-123"
				},
				{
					name: "VueJS",
					value: "VueJS-123"
				}
			]
		},
		{
			type: "checklist",
			model: "checklistlistbox",
			label: "CHECKLIST (listBox)",
			fieldOptions: {
				listBox: true
			},
			values: [
				{
					name: "HTML5",
					value: "HTML5-123"
				},
				{
					name: "Javascript",
					value: "Javascript-123"
				},
				{
					name: "CSS3",
					value: "CSS3-123"
				},
				{
					name: "CoffeeScript",
					value: "CoffeeScript-123"
				},
				{
					name: "AngularJS",
					value: "AngularJS-123"
				},
				{
					name: "ReactJS",
					value: "ReactJS-123"
				},
				{
					name: "VueJS",
					value: "VueJS-123"
				}
			]
		},
		{
			type: "radios",
			model: "radios",
			label: "RADIOS (object)",
			fieldOptions: {
				value: "value",
				name: "name"
			},
			values: [
				{
					name: "HTML5",
					value: "HTML5-123"
				},
				{
					name: "Javascript",
					value: "Javascript-123"
				},
				{
					name: "CSS3",
					value: "CSS3-123"
				},
				{
					name: "CoffeeScript",
					value: "CoffeeScript-123"
				},
				{
					name: "AngularJS",
					value: "AngularJS-123"
				},
				{
					name: "ReactJS",
					value: "ReactJS-123"
				},
				{
					name: "VueJS",
					value: "VueJS-123"
				}
			]
		},
		{
			type: "radios",
			model: "radios2",
			label: "RADIOS2 (array)",
			values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"]
		},
		{
			type: "image",
			model: "avatar",
			label: "Avatar (image field)",
			inputName: "photo",
			required: true,
			validator: validators.required,
			fieldOptions: {
				browse: true,
				hideInput: false
			}
		},
		{
			type: "textArea",
			model: "bio",
			label: "Biography (textArea field)",
			placeholder: "User's biography",
			hint(model) {
				if (model && model.bio) {
					return model.bio.length + " of max 500 characters used!";
				}
			},
			validator: validators.string,
			fieldOptions: {
				max: 500,
				rows: 4
			}
		},
		{
			type: "input",
			model: "address.geo",
			label: "Field with buttons",
			disabled: false,
			fieldOptions: {
				inputType: "text"
			},
			get(model) {
				if (model && model.address && model.address.geo)
					return model.address.geo.latitude + ", " + model.address.geo.longitude;
			},
			set(model, val) {
				let values = val.split(",");
				if (!model.address) model.address = {};
				if (!model.address.geo) model.address.geo = {};
				if (values.length > 0 && values[0].trim() !== "") {
					model.address.geo.latitude = parseFloat(values[0].trim());
				} else {
					model.address.geo.latitude = 0;
				}
				if (values.length > 1 && values[1].trim() !== "") {
					model.address.geo.longitude = parseFloat(values[1].trim());
				} else {
					model.address.geo.longitude = 0;
				}
			},
			buttons: [
				{
					classes: "btn-location",
					label: "Current location",
					onclick(model) {
						return this.$parent.getLocation(model);
					}
				},
				{
					classes: "btn-clear",
					label: "Clear",
					onclick(model) {
						model.address.geo = {
							latitude: 0,
							longitude: 0
						};
					}
				}
			]
		},
		// {
		// 	type: "staticMap",
		// 	model: "address.geo",
		// 	label: "Map",
		// 	visible: false,
		// 	fieldOptions: {
		// 		lat: "latitude",
		// 		lng: "longitude",
		// 		zoom: 6,
		// 		sizeX: 640,
		// 		sizeY: 640,
		// 		scale: 1,
		// 		format: "png",
		// 		// maptype:"satellite",
		// 		language: "FR-fr",
		// 		// region:
		// 		markers: "color:blue%7Clabel:S%7C43.107733,4.541936"
		// 		// path:
		// 		// visible:
		// 		// style:"feature:road.highway%7Celement:labels.text.stroke%7Cvisibility:on%7Ccolor:0xb06eba&style=feature:road.highway%7Celement:labels.text.fill%7Cvisibility:on%7Ccolor:0xffffff",
		// 		// key:
		// 		// signature:
		// 	}
		// },
		{
			type: "switch",
			model: "status",
			label: "Status (switch field)",
			fieldClasses: "half-width",
			fieldOptions: {
				textOn: "Active",
				textOff: "Inactive"
			}
		},
		{
			type: "switch",
			model: "sex",
			label: "Sex (switch field)",
			fieldClasses: "half-width",
			fieldOptions: {
				textOn: "Female",
				textOff: "Male",
				valueOn: "female",
				valueOff: "male"
			}
		},
		{
			type: "label",
			model: "created",
			label: "Created (label field)",
			fieldClasses: "half-width"
		},
		{
			type: "submit",
			label: "",
			disabled() {
				// console.log("Disabled: ", this.errors.length > 0);
				return this.errors.length > 0;
			},
			fieldClasses: "half-width",
			fieldOptions: {
				buttonText: "Submit form",
				validateBeforeSubmit: true,
				onSubmit(model) {
					console.log("Form submitted!", model);
					alert("Form submitted!");
				}
			}
		},
		{
			type: "select",
			model: "type",
			label: "Type (select field)",
			required: true,
			values: [
				{
					id: "personal",
					name: "Personal"
				},
				{
					id: "business",
					name: "Business"
				}
			]
		},

		{
			type: "select",
			model: "role",
			label: "Role",
			required: true,
			validator: validators.required,
			fieldClasses: "half-width",
			fieldOptions: {
				noneSelectedText: "Nincs kijelölve"
			},
			values: [
				{
					id: "admin",
					name: "Administrator"
				},
				{
					id: 0,
					name: "Zero"
				},
				{
					id: "moderator",
					name: "Moderator"
				},
				{
					id: "user",
					name: "Registered User"
				},
				{
					id: "visitor",
					name: "Visitor"
				}
			]
		},
		{
			type: "select",
			model: "language",
			label: "Language",
			hint: "Your native language",
			required: true,
			validator: validators.required,
			fieldClasses: "half-width",
			values: [
				{
					id: "en-GB",
					name: "English (GB)"
				},
				{
					id: "en-US",
					name: "English (US)"
				},
				{
					id: "de",
					name: "German"
				},
				{
					id: "it",
					name: "Italic"
				},
				{
					id: "fr",
					name: "French"
				}
			]
		},

		/** **********/
		/*  JQUERY   */
		/** **********/

		{
			type: "input",
			model: "",
			label: "--- JQUERY ---",
			fieldClasses: "alert alert-info",
			fieldOptions: {
				inputType: "hidden"
			}
		},
		{
			type: "spectrum",
			model: "favoriteColor",
			label: "Color (spectrum field)",
			required: true,
			validator: validators.required,
			fieldOptions: {
				// preferredFormat: "rgb"
			}
		},
		{
			type: "masked",
			model: "mobile",
			label: "Mobile  (masked field)",
			validator: validators.required,
			fieldClasses: ["half-width", "first"],
			fieldOptions: {
				mask: "(99) 999-9999"
			}
		},
		/* {
			type: "selectEx",
			model: "address.country",
			label: "Country (selectEx field)",
			required: true,
			validator: validators.required,
			fieldClasses: "half-width",
			fieldOptions: {
				// https://silviomoreto.github.io/bootstrap-select/options/
				liveSearch: true,
				size: 10,
				noneSelectedText: "Nincs kijelölve"
				multiSelect: false,
			},
			values: ["United Kingdom", "France", "Germany"]
		}, */
		/* {
			type: "selectEx",
			model: "skills",
			label: "Skills (selectEx field)",
			required: false,
			validator: validators.array
			fieldOptions: {
				// https://silviomoreto.github.io/bootstrap-select/options/
				liveSearch: true,
				//maxOptions: 3,
				//size: 4,
				//actionsBox: true,
				selectedTextFormat: "count > 3",
				multiSelect: true,
				min: 2,
				max: 4,
			},
			values: [
				"HTML5",
				"Javascript",
				"CSS3",
				"CoffeeScript",
				"AngularJS",
				"ReactJS",
				"VueJS"
			]
		}, */
		{
			type: "rangeSlider",
			model: "rank",
			label: "Rank (rangeSlider field)",
			required: true,
			validator: validators.integer,
			fieldOptions: {
				min: 0,
				max: 10,
				grid: true
			}
		},
		{
			type: "rangeSlider",
			model: "income",
			label: "Income",
			fieldOptions: {
				min: 0,
				max: 100000,
				type: "double",
				prefix: "$",
				step: 1000,
				force_edges: true
			}
		},
		{
			type: "dateTimePicker",
			model: "dob4",
			label: "DOB (dateTimePicker field)",
			placeholder: "User's birth of date",
			required: true,
			validator: [validators.date],
			fieldOptions: {
				minDate: fecha.parse("1900-01-01", "YYYY-MM-DD"),
				maxDate: new Date(),
				format: "YYYY-MM-DD"
			}
		},
		{
			type: "dateTimePicker",
			model: "dob5",
			label: "DT",
			validator: [validators.date],
			fieldOptions: {
				format: "YYYY-MM-DD HH:mm:ss"
			}
		},
		{
			type: "dateTimePicker",
			label: "Time",
			model: "time",
			/* validator: [
				validators.time
			], */
			fieldOptions: {
				format: "HH:mm:ss"
			}
		},

		/** ***********/
		/*  VANILLA   */
		/** ***********/

		{
			type: "input",
			model: "",
			label: "--- VANILLA ---",
			fieldClasses: "alert alert-info",
			fieldOptions: {
				inputType: "hidden"
			}
		},
		{
			type: "googleAddress",
			model: "location",
			label: "Location (googleAddress)",
			placeholder: "Location",
			fieldOptions: {
				onPlaceChanged(value, place, rawPlace) {
					console.log("Location changed! " + value);
					console.log(place);
					console.log(rawPlace);
				}
			}
		},
		{
			type: "noUiSlider",
			model: "rank2",
			label: "Rank (noUiSlider field)",
			required: true,
			disabled: false,
			fieldOptions: {
				min: 1,
				max: 10,
				connect: [true, false], // "lower", "upper", true, false
				// margin: 2 //number
				// limit: 2 //number
				step: 1,
				// orientation:"horizontal", //"vertical", "horizontal"
				// direction: "ltr", //"ltr", "rtl"
				// tooltips: false, // false, true, formatter, array[formatter or false]
				// animate: true,
				range: {
					min: [0],
					max: [10]
				},
				pips: {
					mode: "count",
					values: 6,
					density: 10,
					stepped: true
				}
			}
		},
		{
			type: "noUiSlider",
			model: "income2",
			label: "Rank (noUiSlider field)",
			required: true,
			disabled: false,
			fieldOptions: {
				min: 0,
				max: 100000,
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
					min: [0],
					max: [100000]
				},
				pips: {
					mode: "count",
					values: 6,
					density: 10,
					stepped: true
				}
			}
		},
		{
			type: "cleave",
			model: "mobile",
			label: "Mobile  (Cleave.js field)",
			validator: validators.required,
			fieldClasses: "half-width",
			fieldOptions: {
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
			}
		},
		{
			type: "pikaday",
			model: "dob6",
			label: "DOB (pikaday field)",
			placeholder: "User's birth of date",
			required: true,
			validator: validators.date,
			fieldOptions: {
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
			}
			// onChanged(model, newVal, oldVal, field) {
			// 	// model.age = moment().year() - moment(newVal).year();
			// }
		},
		{
			type: "vueMultiSelect",
			model: "skills",
			label: "Skills (vue-multiSelect field)",
			required: true,
			validator: validators.array,
			placeholder: "placeholder",
			fieldOptions: {
				multiple: true,
				max: 4,
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
			values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"],
			onChanged(model, newVal, oldVal) {
				console.log(`Model's skills changed from ${oldVal} to ${newVal}. Model:`, model);
			}
		},

		/** *****************/
		/*  CUSTOM FIELDS   */
		/** *****************/

		{
			type: "input",
			model: "",
			label: "--- CUSTOM FIELDS ---",
			fieldClasses: "alert alert-info",
			fieldOptions: {
				inputType: "hidden"
			}
		},
		{
			type: "awesome",
			model: "userName",
			label: "Awesome (custom field)"
		}
	]
};
