<template>
  <div class="doc-container">
    <div class="row gutter-md">
      <div class="col">
        <p>
          Comparison between different types
        </p>
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
              @input="modelUpdated"
            />
            <q-checkbox
              v-model="model.home"
              :label="modelSchema.fields[1].label"
              @input="modelUpdated"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row gutter-md">
      <div class="col">
        <p>
          Comparison between different types
        </p>
        <br>
        <div class="row gutter-md">
          <div class="col">
            <p>
              Scheme
            </p>
            <JsonEditor
              :objData="modelSchema"
              v-model="modelSchema">
            </JsonEditor>
          </div>
          <div class="col">
            <p>
              Model
            </p>
            {{ model }}
          </div>
        </div>
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
          label: 'My Text',
          model: 'myText',
          placeholder: 'Enter text here',
          featured: true,
          required: true
        }, {
          type: 'checkbox',
          label: 'My Checkbox',
          model: 'myCheckbox',
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
  },
  methods: {
    modelUpdated () {
      console.log('Model updated')
    }
  }
}
</script>

<style>
</style>
