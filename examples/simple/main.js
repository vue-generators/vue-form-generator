var VueFormGenerator = window.VueFormGenerator;

var vm = new Vue({
	el: "#app",
	components: {
		"vue-form-generator": VueFormGenerator.component
	},

	methods: {
		prettyJSON: function(json) {
			if (json) {
				json = JSON.stringify(json, undefined, 4);
				json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
				return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
					var cls = "number";
					if (/^"/.test(match)) {
						if (/:$/.test(match)) {
							cls = "key";
						} else {
							cls = "string";
						}
					} else if (/true|false/.test(match)) {
						cls = "boolean";
					} else if (/null/.test(match)) {
						cls = "null";
					}
					return "<span class=\"" + cls + "\">" + match + "</span>";
				});
			}
		}
	},

	data: {
		model: {
			id: 1,
			name: "John Doe",
			password: "J0hnD03!x4",
			skills: [
				"Javascript",
				"VueJS"
			],
			email: "john.doe@gmail.com",
			status: true
		},
		schema: {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "ID",
					model: "id",
					readonly: true,
					featured: false,
					disabled: true
				},
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					readonly: false,
					featured: true,
					required: true,
					disabled: false,
					placeholder: "User's name",
					validator: VueFormGenerator.validators.string
				},
				{
					type: "input",
					inputType: "password",
					label: "Password",
					model: "password",
					min: 6,
					required: true,
					hint: "Minimum 6 characters",
					validator: VueFormGenerator.validators.string
				},	
				{
					type: "input",
					inputType: "email",
					label: "E-mail",
					model: "email",
					placeholder: "User's e-mail address",
					validator: VueFormGenerator.validators.email
				},					
				{
					type: "checklist",
					label: "Skills",
					model: "skills",
					required: true,
					values: [
						"HTML5",
						"Javascript",
						"CSS3",
						"CoffeeScript",
						"AngularJS",
						"ReactJS",
						"VueJS"
					],
					validator: VueFormGenerator.validators.array
				},
				{
					type: "checkbox",
					label: "Status",
					model: "status",
					multi: true,
					readonly: false,
					featured: false,
					disabled: false,
					default: true
				}			
			]
		},

		formOptions: {
			validateAfterLoad: true,
			validateAfterChanged: true
		}
	}
});