<template>
    <div class="container">
        <h1>Basic</h1>
        <div class="row">
            <div class="col-sm-12">
                <vue-form-generator :schema="schema" :model="model" :options="formOptions" ref="form" :is-new-model="isNewModel" @model-updated="modelUpdated" @validated="onValidated"></vue-form-generator>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <pre v-if="model" v-html="prettyModel"></pre>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import VueFormGenerator from "../../src";

    import { filters } from "./utils";

    import {each, isFunction, cloneDeep, merge} from 'lodash';  

    Vue.use(VueFormGenerator);

    export default {
        components: {
        },

        filters: filters,

        data() {
            return {
                isNewModel: false, 

                selected: [],

                model: {
                    first_name: "David",
                    last_name: "Higgins",
                    status: true,
                },

                // rows: users,

                schema: {
                    fields: [
                        {
                            "type": "input",
                            "inputType": "text",
                            "label": "First Name",
                            "model": "first_name"
                        },
                        {
                            "type": "checkbox",
                            "label": "Active",
                            "model": "status",
                        },
                        {
                            "type": "input",
                            "inputType": "color",
                            "label": "Color",
                            "model": "color"
                        },
                        {
                            "type": "submit",
                            "buttonText": "Change Previous Type",
                            "onSubmit": () => {
                                // this.schema.fields[2].type = "input";
                                if(this.schema.fields[2].inputType == "color") {
                                    this.schema.fields[2].inputType = "text";
                                } else {
                                    this.schema.fields[2].inputType = "color";
                                }
                            }
                        }
                    ]
                },

                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateBeforeSave: true
                }
            }
        },

        computed: {
            validationErrors() {
                if (this.$refs.form && this.$refs.form.errors) 
                    return this.$refs.form.errors;

                return [];
            },
            prettyModel(){
                return filters.prettyJSON(this.model);
            }
        },

        methods: {
            showWarning() { 
                if (this.$refs.form && this.$refs.form.errors) {
                    return this.$refs.form.errors.length > 0 
                }
            },

            onSelectRow(event, row, add) {
                this.isNewModel = false;
                if ( (add || (event && event.ctrlKey))) {
                    if (this.selected.indexOf(row) != -1){
                        var index = this.selected.indexOf(row);
                        this.selected.splice(index, 1);
                    } else {
                        this.selected.push(row);
                    }
                } else {
                    this.clearSelection();
                    this.selected.push(row);
                }
                this.generateModel();
            },

            clearSelection() {
                this.selected.splice(0);
                this.generateModel();
            },  

            onValidated(res, errors) {
                console.log("VFG validated:", res, errors);
            },

            generateModel() {
                if (this.selected.length == 1) {
                    this.model = cloneDeep(this.selected[0]);
                } else if (this.selected.length > 1) {
                    this.model = VueFormGenerator.schema.mergeMultiObjectFields(Schema, this.selected);
                } else {
                    this.model = null;              
                }
            },

            newModel() {
                console.log("Create new model...");
                this.selected.splice(0);
                let newRow = VueFormGenerator.schema.createDefaultObject(Schema, { id: this.getNextID() })
                this.isNewModel = true;
                this.model = newRow;

                let el = document.querySelector("div.form input:nth-child(1):not([readonly]):not(:disabled)");
                if (el)
                    el.focus()

            },          

            saveModel() {
                console.log("Save model...");
                if (this.formOptions.validateBeforeSave === false ||  this.validate()) {
                    this.mergeModelValues();

                    if (this.isNewModel) {
                        this.rows.push(this.model);
                        this.onSelectRow(null, this.model, false);
                    }

                } else {
                    console.warn("Error saving model...");
                    // Validation error
                }
            },

            mergeModelValues() {
                let model = this.model;
                if (model && this.selected.length > 0) {
                    each(this.selected, (row) => {
                        merge(row, model);
                    });
                }
            },

            deleteModel() {
                if (this.selected.length > 0) {
                    each(this.selected, (row) => {
                        let index = this.rows.indexOf(row);
                        this.rows.splice(index, 1)
                    })
                    this.clearSelection();
                }
            },

            getNextID() {
                let id = 0;

                each(this.rows, (row) => {
                    if (row.id > id)
                        id = row.id;
                });

                return ++id;
            },

            validate()  {
                //console.log("validate", this.$refs.form, this.$refs.form.validate());
                return this.$refs.form.validate();
            },

            modelUpdated(newVal, schema) {
                console.log("main model has updated", newVal, schema);
            },


            getLocation(model) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((pos) => {
                        if (!model.address)
                            model.address = {};
                        if (!model.address.geo)
                            model.address.geo = {};
                        model.address.geo.latitude = pos.coords.latitude.toFixed(5);
                        model.address.geo.longitude = pos.coords.longitude.toFixed(5);
                    });
                } else {
                    alert("Geolocation is not supported by this browser.");
                }               
            }

             
        },
        
        mounted() {
            this.$nextTick(function () {
                window.app = this;

                // Localize validate errors
                // VueFormGenerator.validators.resources.fieldIsRequired = "Ezt a mezőt kötelező kitölteni!";
                // VueFormGenerator.validators.resources.textTooSmall = "A szöveg túl rövid! Jelenleg: {0}, minimum: {1}";
            })
        }
    }

    // window.Vue = require('vue');
</script>

<style lang="sass">
    @import url(http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700|Open+Sans+Condensed:300&subset=latin,latin-ext);

    html {
        font-family: "Open Sans";
                font-size: 14px;
    }

    * {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    pre {
        overflow: auto;
        
        .string { color: #885800; }
        .number { color: blue; }
        .boolean { color: magenta; }
        .null { color: red; }
        .key { color: green; }      
    } 

    .control-buttons {
        button {
            margin: 0.2em 0.3em;
            padding: 6px 20px;
            position: relative;

            i {
                margin-right: 0.3em;
            }
        }

        i.fa.fa-warning {
            position: absolute;
            top: 0px;
            right: 0px;
            color: Orange;          
        }
    }

    .errors {
        .alert {
            padding: 4px;
            width: 80%;
            margin: 5px auto;
        }
    }

    fieldset.vue-form-generator {

        .form-group.half-width {
            width: 50%;
        }

        .half-width + .half-width {
            &:not(.first) {
                padding-left: 0.5rem;
            }
        }

    }
</style>