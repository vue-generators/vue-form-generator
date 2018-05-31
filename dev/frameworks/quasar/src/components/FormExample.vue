<template>
  <div class="doc-container">
    <div class="row gutter-md">
      <div class="col">
        VFG Native
        <br>
        <br>
        <vue-form-generator
          :schema="modelSchema"
          :model="model"
          :options="formOptionsNative"
          @model-updated="modelUpdated"
        />
      </div>
      <div class="col">
        VFG Quasar
        <br>
        <br>
        <vue-form-generator
          :schema="modelSchema"
          :model="model"
          :options="formOptionsQuasar"
          @model-updated="modelUpdated"
        />
      </div>
      <div class="col">
        Quasar Reference
        <br>
        <br>
        <q-input
          v-model="model.name"
          :stack-label="modelSchema.fields[0].label"
          :placeholder="modelSchema.fields[0].placeholder"
        />
        <q-checkbox
          v-model="model.home"
          :label="modelSchema.fields[1].label"
          color="secondary"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueFormGenerator from 'vue-form-generator'

export default {

  name: 'FormExample',
  data: () => ({
    model: {},
    modelSchema: {
      fields: [
        {
          type: 'input',
          inputType: 'text',
          label: 'Name',
          model: 'name',
          placeholder: 'Screen name',
          featured: true,
          required: true
        }, {
          type: 'checkbox',
          label: 'Is home screen',
          model: 'home',
          default: true
        }
      ]
    },
    formOptionsNative: {
      validateAfterLoad: true,
      validateAfterChanged: true
    }
  }),
  components: {
    'vue-form-generator': VueFormGenerator.component
    // ModelEditor
  },
  computed: {
    formOptionsQuasar () {
      return {
        ...this.formOptionsNative,
        framework: 'quassar'
      }
    }
  }
}
</script>

<style>
</style>
