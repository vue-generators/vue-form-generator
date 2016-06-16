import moment from "moment";
import Fakerator from "fakerator";
import {} from "lodash";

import { validators } from "../src";

let fakerator = new Fakerator();

module.exports = {
	fields: [
		{
			type: "text",
			label: "ID",
			model: "id",
			readonly: true,
			editableIfNew: true, // TODO
			featured: false,
			disabled: true
		},
		{
			type: "select",
			label: "Type",
			model: "type",
			required: true,
			values: [
				{ id: "personal", name: "Personal" },
				{ id: "business", name: "Business" }
			],
			default: "personal"
		},	
		{
			type: "text",
			label: "First name",
			model: "firstName",
			featured: true,
			required: true,
			placeholder: "User's first name",
			styleClasses: "half-width",
			validator: validators.string,

			onChanged(model, newVal, oldVal, field) {
				//console.log(`Model's name changed from ${oldVal} to ${newVal}. Model:`, model);
			},

			onValidated(model, errors, field) {
				//if (errors.length > 0)
				//	console.warn("Validation error in Name field! Errors:", errors);
			}
		},
		{
			type: "text",
			label: "Last name",
			model: "lastName",
			featured: true,
			required: true,
			placeholder: "User's last name",
			styleClasses: "half-width",
			validator: validators.string
		},	
		{
			type: "text",
			label: "Username",
			model: "userName",
			featured: true,
			required: true,
			min: 5,
			placeholder: "User's last name",
			validator: validators.string
		},
		{
			type: "password",
			label: "Password",
			model: "password",
			min: 6,
			required: true,
			hint: "Minimum 6 characters",
			validator: validators.string			
		},	
	
		{
			type: "selectEx",
			label: "Skills",
			model: "skills",
			multi: true,
			required: true,
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
		},	
		{
			type: "text",
			label: "Company name",
			model: "company.name",
			styleClasses: "company",
			visible(model) { return model && model.type == "business"; }
		},
		{
			type: "text",
			label: "Company phone",
			model: "company.phone",
			styleClasses: "company",
			pattern: "^\\+[0-9]{2}-[237]0-[0-9]{3}-[0-9]{4}$",
			placeholder: "User's phone number",
			hint: "Format: +36-(20|30|70)-000-0000",
			visible(model) { return model && model.type == "business"; }
		},			
		{
			type: "email",
			label: "E-mail",
			model: "email",
			placeholder: "User's e-mail address"
		},		
		{
			type: "text",
			label: "Phone",
			model: "phone",
			pattern: "^\\+[0-9]{2}-[237]0-[0-9]{3}-[0-9]{4}$",
			placeholder: "User's phone number",
			hint: "Format: +36-(20|30|70)-000-0000",
			help: "You can use any <b>formatted</b> texts. Or place a <a target='_blank' href='https://github.com/icebob/vue-form-generator'>link</a> to another site."
			//validator: validators.regexp
		},
		{
			type: "masked",
			label: "Mobile",
			model: "mobile",
			mask: "(99) 999-9999",
			validator: validators.required
		},		
		{
			type: "spectrum",
			label: "Color",
			model: "favoriteColor",
			required: true,
			colorOptions: {
				//preferredFormat: "rgb"
			},
			validator: validators.required
		},	
		{
			type: "image",
			label: "Avatar",
			model: "avatar",
			required: true,
			browse: true,
			validator: validators.required

		},
		{
			type: "number",
			label: "Age",
			model: "age",
			multi: true,
			disabled: true,
			placeholder: "User's age",
			hint: "Minimum 18 age.",
			min: 18,
			max: 100,
			validator: [
				validators.integer,
				validators.number
			]
		},
		{
			type: "dateTime",
			label: "DOB",
			model: "dob",
			required: true,
			placeholder: "User's birth of date",
			min: moment("1900-01-01").toDate(),
			max: moment("2016-01-01").toDate(),
			validator: [
				validators.date
			],
			dateTimePickerOptions: {
				format: "YYYY-MM-DD"
			},			
			onChanged(model, newVal, oldVal, field) {
				model.age = moment().year() - moment(newVal).year();
			}

		},	

		{
			type: "dateTime",
			label: "DT",
			model: "dt",
			multi: true,
			validator: [
				validators.date
			],
			dateTimePickerOptions: {
				format: "YYYY-MM-DD HH:mm:ss"
			}

		},

		{
			type: "dateTime",
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

		{
			type: "slider",
			label: "Rank",
			model: "rank",
			multi: true,
			min: 1,
			max: 10,
			required: true,
			sliderOptions: {
				grid: true
			},
			validator: validators.integer
		},	

		{
			type: "slider",
			label: "Income",
			model: "income",
			multi: true,
			min: 0,
			max: 100000,
			sliderOptions: {
				type: "double",
				prefix: "$",
				step: 1000
			}
		},

		{
			type: "select",
			label: "Language",
			model: "language",
			required: true,
			values: [
				{ id: "en-GB", name: "English (GB)" },
				{ id: "en-US", name: "English (US)" },
				{ id: "de", name: "German" },
				{ id: "it", name: "Italic" },
				{ id: "fr", name: "French" }
			],
			validator: validators.required
		},
		{
			type: "selectEx",
			label: "Country",
			model: "address.country",
			multi: true,
			required: true,
			values: ["United Kingdom", "France", "Germany"],
			//default: "United Kingdom",
			multiSelect: false,
			selectOptions: {
				// https://silviomoreto.github.io/bootstrap-select/options/
				liveSearch: true,
				size: 10
			},
			validator: validators.required
		},
		{
			type: "text",
			label: "City",
			model: "address.city",
			multi: true,
			validator: validators.required
		},
		{
			type: "text",
			label: "Street",
			model: "address.street"
		},        
		{
			type: "text",
			label: "GPS",
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
					model.address.geo.latitude = 0

				if (values.length > 1 && values[1].trim() != "")
					model.address.geo.longitude = parseFloat(values[1].trim());
				else 
					model.address.geo.longitude = 0
			},
			buttons: [
				{
					classes: "btn-location",
					label: "Current location",
					onclick: function(model) {
					    if (navigator.geolocation) {
    						navigator.geolocation.getCurrentPosition((pos) => {
							if (!model.address)
								model.address = {};

							if (!model.address.geo)
								model.address.geo = {};

							model.address.geo.latitude = pos.coords.latitude.toFixed(5);
							model.address.geo.longitude = pos.coords.longitude.toFixed(5);
    						});
						} else {
    						alert("Geolocation is not supported by this browser.");
						}
					}
				},
				{
					classes: "btn-clear",
					label: "Clear",
					onclick: function(model) {
						model.address.geo = {
							latitude: 0,
							longitude: 0
						};
					}
				}
			]
		}, 
		{
			type: "staticMap",
			label: "Map",
			model: "address.geo",
			visible: false				
		},
		{
			type: "select",
			label: "Role",
			model: "role",
			required: true,
			values: [
				{ id: "admin", name: "Administrator"},
				{ id: "moderator", name: "Moderator"},
				{ id: "user", name: "Registered User"},
				{ id: "visitor", name: "Visitor"}
			],
			validator: validators.required
		},		
		{
			type: "label",
			label: "Created",
			model: "created",
			get(model) { return model && model.created ? moment(model.created).format("LLL") : "-"; }
		},
		{
			type: "switch",
			label: "Status",
			model: "status",
			multi: true,
			default: true,
			textOn: "Active",
			textOff: "Inactive"
		},
		{
			type: "textArea",
			label: "Biography",
			model: "bio",
			hint: "Max 500 characters",
			max: 500,
			placeholder: "User's biography",
			rows: 4,
			validator: validators.string
		}
	]
}