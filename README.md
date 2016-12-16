# vue-form-generator [![NPM version](https://img.shields.io/npm/v/vue-form-generator.svg)](https://www.npmjs.com/package/vue-form-generator)
A schema-based form generator component for Vue.js v1.x.x

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/912039aa815e40de8315032519aa7e6c)](https://www.codacy.com/app/mereg-norbert/vue-form-generator?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=icebob/vue-form-generator&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/icebob/vue-form-generator.svg?branch=master)](https://travis-ci.org/icebob/vue-form-generator)
[![Coverage Status](https://coveralls.io/repos/github/icebob/vue-form-generator/badge.svg?branch=master)](https://coveralls.io/github/icebob/vue-form-generator?branch=master)
[![NPMS.io score](https://badges.npms.io/vue-form-generator.svg)]()
[![Package Quality](http://npm.packagequality.com/shield/vue-form-generator.svg)](http://packagequality.com/#?package=vue-form-generator)

[![Dependency Status](https://david-dm.org/icebob/vue-form-generator.svg)](https://david-dm.org/icebob/vue-form-generator)
[![devDependency Status](https://david-dm.org/icebob/vue-form-generator/dev-status.svg)](https://david-dm.org/icebob/vue-form-generator#info=devDependencies)
[![Downloads](https://img.shields.io/npm/dt/vue-form-generator.svg)](https://www.npmjs.com/package/vue-form-generator)

**Vue v2.x support is under development!**

## Demo
[JSFiddle simple example](https://jsfiddle.net/icebob/0mg1v81e/)

[![Screenshot](https://icebob.gitbooks.io/vueformgenerator/content/assets/vfg-example1.png)](https://jsfiddle.net/icebob/0mg1v81e/)

## Features
- multiple objects editing
- 27 field types
- built-in validators
- Bootstrap friendly templates
- customizable styles
- ...etc

## Documentation
[Online documentation on Gitbook](https://icebob.gitbooks.io/vueformgenerator/content/)

## Dependencies
vue-form-generator use [Moment.js](http://momentjs.com/) and [lodash](https://lodash.com/) internally.

While built-in fields don't need external dependencies, optional fields may need other libraries.  
These dependency fall in two camp: jQuery or Vanilla. You can find almost the same functionality in both flavor.  
That way, it's your choice to depend on jQuery or not.

You can find details about dependencies in [documentation](https://icebob.gitbooks.io/vueformgenerator/content/).

## Installation
### NPM
You can install it via [NPM](http://npmjs.org/).
```
$ npm install vue-form-generator
```
### Manual
Download zip package and unpack and add the `vue-form-generator.css` and `vue-form-generator.js` file to your project from dist folder.
```
https://github.com/icebob/vue-form-generator/archive/master.zip
```

## Usage
```html
<template>
  <div class="panel-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
  </div>
</template>

<script>
import VueFormGenerator from "vue-form-generator";

Vue.use(VueFormGenerator);

export default {
  data: {
  
    model: {             
      id: 1,
      name: "John Doe",
      password: "J0hnD03!x4",
      skills: ["Javascript", "VueJS"],
      email: "john.doe@gmail.com",
      status: true
    },
  
    schema: {
      fields: [{
        type: "text",
        label: "ID (disabled text field)",
        model: "id",
        readonly: true,         
        disabled: true
      },{
        type: "text",
        label: "Name",
        model: "name",
        placeholder: "Your name",
        featured: true,
        required: true
      },{
        type: "password",
        label: "Password",
        model: "password",
        min: 6,
        required: true,
        hint: "Minimum 6 characters",
        validator: validators.string
      },{
        type: "select",
        label: "skills",
        model: "type",      
        values: ["Javascript", "VueJS", "CSS3", "HTML5"]
      },{
        type: "email",
        label: "E-mail",
        model: "email",
        placeholder: "User's e-mail address"
      },{
        type: "checkbox",
        label: "Status",
        model: "status",
        default: true
      }]
    },

    formOptions: {
      validateAfterLoad: true,
      validateAfterChanged: true
    }
  }
}
</script>
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
```bash
npm test
```

See: https://github.com/icebob/vue-form-generator/projects/1

## Contribution
Please send pull requests improving the usage and fixing bugs, improving documentation and providing better examples, or providing some testing, because these things are important.

## License
vue-form-generator is available under the [MIT license](https://tldrlegal.com/license/mit-license).

## Contact

Copyright (C) 2016 Icebob

[![@icebob](https://img.shields.io/badge/github-icebob-green.svg)](https://github.com/icebob) [![@icebob](https://img.shields.io/badge/twitter-Icebobcsi-blue.svg)](https://twitter.com/Icebobcsi)
