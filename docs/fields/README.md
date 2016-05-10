# Available fields

## Built-in fields

For this fields there is no need 3rd party libraries

- [`text`](text.md) - Simple text input field
- `email` - E-mail address input field
- `password` - Password input field
- `number` - Number input field
- `textArea` - Text area field
- `checkbox` - Checkbox for boolean values
- `select` - Select list
- `color` - Color picker (built-in HTML5 control)
- `checklist` - Checkbox list to select multiple values
- `range` - Range slider (built-in HTML5 control)
- `image` - Image select field (URL or upload in base64 string)
- `label` - Static text (e.g. timestamp, creation time...etc)

## Optional fields

For this fields needs 3rd party libraries

- `selectEx` - select list with the bootstrap-select component
- `dateTime` - datetime picker with bootstrap-datetimepicker component
- `masked` - Masked text input field with maskedinput component
- `slider` - pretty range slider with ion.rangeSlider component
- `spectrum` - Color picker with "The No Hassle" Spectrum jQuery Colorpicker component

## Common properties of field

Property 		| Type 			| Description
--------------- | ------------- | -----------
type 			| `String` 		| Type of field
label 			| `String` 		| Label of field
model 			| `String` 		| Name of property in the model
featured 		| `boolean` 	| is it a featured (bold) field?
disabled 		| `boolean` 	| if true, disable this field
required 		| `boolean` 	| if true, must be fill this field
default			|  any	| Default value of the field (for create a new model)
validator 		| `Function` or `Array` | Validator for value. It can be array of functions too.
onChanged		| `Function` 	| Event if this field value is changed. `onChanged(model, newVal, oldVal, field) { ... }`
onValidated		| `Function` 	| Event if validation executed. `onValidated(model, errors, field) { ... }`

## Example

```js
	{
		type: "text",
		label: "Name",
		model: "name",
		readonly: false,
		featured: true,
		disabled: false,
		required: true,
		default: "Anonymous",
		validator: validators.string,

		onChanged(model, newVal, oldVal, field) {
			console.log(`Model's name changed from ${oldVal} to ${newVal}. Model:`, model);
		},

		onValidated(model, errors, field) {
			if (errors.length > 0)
				console.warn("Validation error in Name field! Errors:", errors);
		}
	}
```