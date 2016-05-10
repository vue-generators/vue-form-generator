# `text` field

## Special properties of field

Property 		| Type 			| Description
--------------- | ------------- | -----------
readonly		| `boolean` 	| If true, the input field is read-only
placeholder		| `String` 		| Placeholder text for input field
min 			| `Number` 		| Minimum length of text (need `validators.string`)
max 			| `Number` 		| Maximum length of text (need `validators.string`)

## Usage

```js
	{
		type: "text",
		label: "Name",
		model: "name",
		min: 3,
		max: 50,
		required: true,
		placeholder: "User's full name",

		onChanged(model, newVal, oldVal, field) {
			console.log(`Model's name changed from ${oldVal} to ${newVal}. Model:`, model);
		},

		onValidated(model, errors, field) {
			if (errors.length > 0)
				console.warn("Validation error in Name field! Errors:", errors);
		}
	}
```