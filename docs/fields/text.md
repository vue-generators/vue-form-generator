# `text` field

## Special properties of field

Property 		| Type 			| Description
--------------- | ------------- | -----------
readonly		| `boolean` 	| If true, the input field is read-only
placeholder		| `String` 		| Placeholder text for input field
min 			| `Number` 		| Minimum length of text (need `validators.string`)
max 			| `Number` 		| Maximum length of text (need `validators.string`)

## Usage
A featured and required name input field, where the length of name must be between 3 and 50 characters

```js
{
	type: "text",
	label: "Name",
	model: "name",
	featured: true,
	min: 3,
	max: 50,
	required: true,
	placeholder: "User's full name",
	validator: validators.string
}
```
Test field for website address with url validators
```js
{
	type: "text",
	label: "Website",
	model: "web",
	max: 255,
	validator: [
		validators.string
		validators.url
	]
}
```