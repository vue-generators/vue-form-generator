# vue-form-generator [![NPM version](https://img.shields.io/npm/v/vue-form-generator.svg)](https://www.npmjs.com/package/vue-form-generator) ![VueJS v2.x compatible](https://img.shields.io/badge/vue%202.x-compatible-green.svg)
A schema-based form generator component for Vue.js.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/912039aa815e40de8315032519aa7e6c)](https://www.codacy.com/app/mereg-norbert/vue-form-generator?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=sleroy/vue-form-generator&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/sleroy/vue-form-generator.svg?branch=master)](https://travis-ci.org/sleroy/vue-form-generator)
[![Coverage Status](https://coveralls.io/repos/github/sleroy/vue-form-generator/badge.svg?branch=master)](https://coveralls.io/github/sleroy/vue-form-generator?branch=master)
[![NPMS.io score](https://badges.npms.io/vue-form-generator.svg)]()
[![Package Quality](http://npm.packagequality.com/shield/vue-form-generator.svg)](http://packagequality.com/#?package=vue-form-generator)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fsleroy%2Fvue-form-generator.svg?type=shield)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fsleroy%2Fvue-form-generator?ref=badge_shield)

[![Dependency Status](https://david-dm.org/sleroy/vue-form-generator.svg)](https://david-dm.org/sleroy/vue-form-generator)
[![devDependency Status](https://david-dm.org/sleroy/vue-form-generator/dev-status.svg)](https://david-dm.org/sleroy/vue-form-generator#info=devDependencies)
[![Downloads](https://img.shields.io/npm/dt/vue-form-generator.svg)](https://www.npmjs.com/package/vue-form-generator)

## Demo
[JSFiddle simple example](https://jsfiddle.net/sleroy/0mg1v81e/)

[![Screenshot](https://sleroy.gitbooks.io/vueformgenerator/content/assets/vfg-example1.png)](https://jsfiddle.net/sleroy/0mg1v81e/)

## Features
- reactive forms based on schemas
- multiple object editing
- 21 field types
- built-in validators
- core & full bundles (11kb and 19kb gzipped)
- Bootstrap friendly templates
- customizable styles
- can be extended easily with custom fields
- ...etc

## Documentation
[Online documentation on Gitbook](https://sleroy.gitbooks.io/vueformgenerator/content/)

## Dependencies
vue-form-generator uses [fecha](https://github.com/taylorhakes/fecha) and [lodash](https://lodash.com/) internally.

While built-in fields don't need external dependencies, optional fields may need other libraries.  
These dependencies fall into two camps: jQuery or Vanilla. You can find almost the same functionality in both flavors.
In the end, it's your choice to depend on jQuery or not.

You can find details about dependencies in the official [documentation](https://sleroy.gitbooks.io/vueformgenerator/content/) under each specific component.

## Installation
### NPM
You can install it via [NPM](http://npmjs.org/) or [yarn](https://yarnpkg.com/).

#### Latest version for Vue 2.x
```
$ npm install vue-form-generator
```

#### Legacy version for Vue 1.0.x
```
$ npm install vue-form-generator@0.6.1
```

### Manual
Download zip package and unpack and add the vfg.css and vfg.js file to your project from dist folder.
```
https://github.com/sleroy/vue-form-generator/archive/master.zip
```

### Core vs Full version

VueFormGenerator come in two version : `core` and `full`.
Core is a more minimal version with only half the fields.
Full is core + other fields.

* Full bundle: 75 kB (gzipped: 19 kB)
* Core bundle: 39 kB (gzipped: 11 kB)

If you don't know what to choose, don't worry, the full is the default version.  
If you want the slim down version, here is the changes:

```js
// the "core" way
<script>
  import VueFormGenerator from "vue-form-generator/dist/vfg-core.js";
  import "vue-form-generator/dist/vfg-core.css";
</script>
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
        type: "input",
        inputType: "text",
        label: "ID (disabled text field)",
        model: "id",
        readonly: true,         
        disabled: true
      },{
        type: "input",
        inputType: "text",
        label: "Name",
        model: "name",
        placeholder: "Your name",
        featured: true,
        required: true
      },{
        type: "input",
        inputType: "password",
        label: "Password",
        model: "password",
        min: 6,
        required: true,
        hint: "Minimum 6 characters",
        validator: VueFormGenerator.validators.string
      },{
        type: "select",
        label: "Skills",
        model: "skills",      
        values: ["Javascript", "VueJS", "CSS3", "HTML5"]
      },{
        type: "input",
        inputType: "email",
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

Usage in local components
```js
import VueFormGenerator from "vue-form-generator";

//component javascript
export default{
  components:{
    "vue-form-generator": VueFormGenerator.component
  }
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
```bash
npm test
```
or 
```bash
npm run ci
```

## More fields *new*
VueFormGenerator supports custom fields. If you decide to release your custom field into the wild, please open a new issue so we can add you to a list here! Please try to use this naming convention for your custom field : vfg-field-* Example :

- `vfg-field-myfield`
- `vfg-field-calendar`
- `vfg-field-awesome-dropdown`

This way, it will be easier for everyone to find it. Thank you !

## Contribution
Please send pull requests improving the usage and fixing bugs, improving documentation and providing better examples, or providing some testing, because these things are important.

## License
vue-form-generator is available under the [MIT license](https://tldrlegal.com/license/mit-license).

## Contact

Copyright (C) 2017 sleroy

[![@sleroy](https://img.shields.io/badge/github-sleroy-green.svg)](https://github.com/sleroy) [![@sleroy](https://img.shields.io/badge/twitter-sleroycsi-blue.svg)](https://twitter.com/sleroycsi)
