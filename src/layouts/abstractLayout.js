/**
 * Defines the Abstract Layout for Form Generator
 */
// import Vue from "vue";
import {  each,  isFunction,  isNil,  isArray,  isString} from "lodash";
import {  slugifyFormID} from "../utils/schema";

export default {

  props: {
    schema: Object,
    model: Object,
    options: {
      type: Object,
      default () {
        return {
          validateAfterLoad: false,
          validateAfterChanged: false,
          validationErrorClass: "error",
          validationSuccessClass: "",
        };
      }
    },

    multiple: {
      type: Boolean,
      default: false
    },

    isNewModel: {
      type: Boolean,
      default: false
    },

    tag: {
      type: String,
      default: "fieldset",
      validator: function(value) {
        return value.length > 0;
      }
    }
  },

  data() {
    return {
      errors: [] // Validation errors
    };
  },
  computed: {
    /** Get the list of fields */
    fields() {
      let res = [];
      if (this.schema && this.schema.fields) {
        each(this.schema.fields, (field) => {
          if (!this.multiple || field.multi === true)
            res.push(field);
        });
      }

      return res;
    },
    /** Get the list of groups */
    groups() {
      let res = [];
      if (this.schema && this.schema.groups) {
        each(this.schema.groups, (group) => {
          res.push(group);
        });
      }

      return res;
    }
  },
  /** Watched expressions */
  watch: {
    // new model loaded
    model: function(newModel, oldModel) {
      if (oldModel == newModel) // model property changed, skip
        return;

      if (newModel != null) {
        this.$nextTick(() => {
          // Model changed!
          if (this.options.validateAfterLoad === true && this.isNewModel !== true)
            this.validate();
          else
            this.clearValidationErrors();
        });
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.model) {
        // First load, running validation if neccessary
        if (this.options.validateAfterLoad === true && this.isNewModel !== true) {
          this.validate();
        } else {
          this.clearValidationErrors();
        }
      }
    });
  },

  methods: {
    // Get style classes of field
    getFieldRowClasses(field) {
      const hasErrors = this.fieldErrors(field).length > 0;
      let baseClasses = {
        error: hasErrors,
        disabled: this.fieldDisabled(field),
        readonly: this.fieldReadonly(field),
        featured: this.fieldFeatured(field),
        required: this.fieldRequired(field)
      };

      let {
        validationErrorClass,
        validationSuccessClass
      } = this.options;
      if (validationErrorClass && validationSuccessClass) {
        if (hasErrors) {
          baseClasses[validationErrorClass] = true;
          baseClasses.error = false;
        } else {
          baseClasses[validationSuccessClass] = true;
        }
      }

      if (isArray(field.styleClasses)) {
        each(field.styleClasses, (c) => baseClasses[c] = true);
      } else if (isString(field.styleClasses)) {
        baseClasses[field.styleClasses] = true;
      }

      baseClasses["field-" + field.type] = true;

      return baseClasses;
    },

    // Get type of field 'field-xxx'. It'll be the name of HTML element
    getFieldType(fieldSchema) {
      return "field-" + fieldSchema.type;
    },

    // Should field type have a label?
    fieldTypeHasLabel(field) {
      let relevantType = "";
      if (field.type === "input") {
        relevantType = field.inputType;
      } else {
        relevantType = field.type;
      }

      switch (relevantType) {
        case "button":
        case "submit":
        case "reset":
          return false;
        default:
          return true;
      }
    },

    // Get disabled attr of field
    fieldDisabled(field) {
      if (isFunction(field.disabled))
        return field.disabled.call(this, this.model, field, this);

      if (isNil(field.disabled))
        return false;

      return field.disabled;
    },

    // Get required prop of field
    fieldRequired(field) {
      if (isFunction(field.required))
        return field.required.call(this, this.model, field, this);

      if (isNil(field.required))
        return false;

      return field.required;
    },

    // Get visible prop of field
    fieldVisible(field) {
      if (isFunction(field.visible))
        return field.visible.call(this, this.model, field, this);

      if (isNil(field.visible))
        return true;

      return field.visible;
    },

    // Get readonly prop of field
    fieldReadonly(field) {
      if (isFunction(field.readonly))
        return field.readonly.call(this, this.model, field, this);

      if (isNil(field.readonly))
        return false;

      return field.readonly;
    },

    // Get featured prop of field
    fieldFeatured(field) {
      if (isFunction(field.featured))
        return field.featured.call(this, this.model, field, this);

      if (isNil(field.featured))
        return false;

      return field.featured;
    },

    buttonClickHandler(btn, field, event) {
      return btn.onclick.call(this, this.model, field, event, this);
    },

    // Child field executed validation
    onFieldValidated(res, errors, field) {
      // Remove old errors for this field
      this.errors = this.errors.filter(e => e.field != field.schema);

      if (!res && errors && errors.length > 0) {
        // Add errors with this field
        errors.forEach((err) => {
          this.errors.push({
            field: field.schema,
            error: err
          });
        });
      }

      let isValid = this.errors.length == 0;
      this.$emit("validated", isValid, this.errors);
    },

    // Validating the model properties
    validate() {
      this.clearValidationErrors();

      this.$children.forEach((child) => {
        if (isFunction(child.validate)) {
          let errors = child.validate(true);
          errors.forEach((err) => {
            this.errors.push({
              field: child.schema,
              error: err
            });
          });
        }
      });

      let isValid = this.errors.length == 0;
      this.$emit("validated", isValid, this.errors);
      return isValid;
    },

    // Clear validation errors
    clearValidationErrors() {
      this.errors.splice(0);

      each(this.$children, (child) => {
        child.clearValidationErrors();
      });
    },

    modelUpdated(newVal, schema) {
      this.$emit("model-updated", newVal, schema);
    },

    buttonVisibility(field) {
      return field.buttons && field.buttons.length > 0;
    },

    fieldErrors(field) {
      let res = this.errors.filter(e => e.field == field);
      return res.map(item => item.error);
    },

    getFieldID(schema) {
      const idPrefix = this.options && this.options.fieldIdPrefix ? this.options.fieldIdPrefix : "";
      return slugifyFormID(schema, idPrefix);
    }
  }


};
