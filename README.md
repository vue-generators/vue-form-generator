# vue-form-generator [![NPM version](https://img.shields.io/npm/v/vue-form-generator.svg)](https://www.npmjs.com/package/vue-form-generator)
A schema-based form generator component for Vue.js

[![Downloads](https://img.shields.io/npm/dt/vue-form-generator.svg)](https://www.npmjs.com/package/vue-form-generator)

## Demo
[JSFiddle simple example](https://jsfiddle.net/icebob/0mg1v81e/)

## Features
- multiple objects editing
- 18 built-in field types
- built-in validations
- Bootstrap friendly templates
- ...etc

## Dependencies
- [jQuery](http://www.jquery.com)
- [Moment.js](http://momentjs.com/) (built-in)
- [lodash](https://lodash.com/) (built-in)
- [BootStrap](http://getbootstrap.com/) (optional)
- [bootstrap-select](https://silviomoreto.github.io/bootstrap-select/) for `selectEx` fields (optional)
- [bootstrap-datetimepicker](https://github.com/Eonasdan/bootstrap-datetimepicker) for `datetime` fields (optional)
- [spectrum](https://github.com/bgrins/spectrum) for `spectrum` color picker fields (optional)
- [maskedinput](http://digitalbush.com/projects/masked-input-plugin/) for `masked` fields

## Installation
### NPM
Installation uses the [npm](http://npmjs.org/) package manager. Just type the following command after installing npm.
```
$ npm install vue-form-generator
```
### Manual
Download zip package and unpack and add the `vue-form-generator.js` or `vue-form-generator.min.js` file to your project from dist folder.
```
https://github.com/icebob/vue-form-generator/archive/master.zip
```

## Usage
Simply require it and add as a component:
```js
import VueFormGenerator from "vue-form-generator";

export default {
  ...
  components: {
    VueFormGenerator: VueFormGenerator.component
  }
  ...
```

## Examples
### Schema sample
```js
{
    fields: [{
        type: "text",
        label: "ID",
        model: "id",
        readonly: true,
        featured: false,
        disabled: true
    }, {
        type: "text",
        label: "Name",
        model: "name",
        readonly: false,
        featured: true,
        required: true,
        disabled: false,
        placeholder: "User's name",
        validator: VueFormGenerator.validators.string
    }, {
        type: "password",
        label: "Password",
        model: "password",
        min: 6,
        required: true,
        hint: "Minimum 6 characters",
        validator: VueFormGenerator.validators.string
    }, {
        type: "email",
        label: "E-mail",
        model: "email",
        placeholder: "User's e-mail address",
        validator: VueFormGenerator.validators.email
    }, {
        type: "checklist",
        label: "Skills",
        model: "skills",
        multi: true,
        required: true,
        multiSelect: true,
        values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"]
    }, {
        type: "checkbox",
        label: "Status",
        model: "status",
        multi: true,
        readonly: false,
        featured: false,
        disabled: false,
        default: true
    }]
}
```

## Development
This command will start a `webpack-dev-server` with content of `dev` folder.
```bash
npm run dev
```

## Build
This command will build a distributable version in the `dist` directory.
```bash
npm run build
```

## Test
TODO

## TODO
* [x] Date picker with bootstrap-datepicker
* [x] Time picker
* [x] HTML5 Color picker
* [x] Color picker with spectrum
* [x] Image editor
* [ ] Better slider
* [ ] Groupable fields
* [ ] Validation handling with multiple models
* [ ] Bundle for vendor files
* [ ] Unit tests, coverage and CI
* [ ] try [joi](https://www.npmjs.com/package/joi) for validation

## License
vue-form-generator is available under the [MIT license](https://tldrlegal.com/license/mit-license).

## Contact

Copyright (C) 2016 Icebob

[![@icebob](https://img.shields.io/badge/github-icebob-green.svg)](https://github.com/icebob) [![@icebob](https://img.shields.io/badge/twitter-Icebobcsi-blue.svg)](https://twitter.com/Icebobcsi)
