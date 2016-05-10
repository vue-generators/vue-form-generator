# VueFormGenerator component

## Component properties

Property | Type | Description
-------- | ---- | -----------
[schema](schema.md)| `Object` | Schema object with fields
[options](options.md) | `Object` | form options
model | `Object` | Model/target object
multiple | `boolean` | Is it a multiple merged model? We only show `multi: true` fields
isNewModel | `boolean` | If model is new/empty, we won't validate after it load

## Usage
```html
<template>
  <div class="panel-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
  </div>
</template>

<script>
import VueFormGenerator from "vue-form-generator";

export default {
  ...
  components: {
    VueFormGenerator: VueFormGenerator.component
  },
  
  data: {
    schema: { ... },
    model:             
      id: 1,
      name: "John Doe",
      password: "J0hnD03!x4",
      skills: ["Javascript", "VueJS"],
      email: "john.doe@gmail.com",
      status: true
    },
    formOptions: {
      validateAfterLoad: true,
      validateAfterChanged: true
    }
  }
  ...
</script>
```