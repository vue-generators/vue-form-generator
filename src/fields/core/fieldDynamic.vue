<template>
  <div class="wrapper">
    <div v-for="(row, index) in value">
      <vue-form-generator :schema="schema.schema" :model="value[index]" :options="formOptions"></vue-form-generator>
    </div>
  </div>
</template>

<script>
import abstractField from "../abstractField";

export default {
  mixins: [abstractField]
};

</script>

<style lang="sass">
</style>
