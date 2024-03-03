<!-- eslint-disable vue/multi-word-component-names -->
<template></template>
<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    field: {
        type: String,
        default: null,
        desc: "The field name from the data row object"
    },
    header: {
        type: String,
        default: null,
        desc: "The text label for the table column header"
    },
    showTotal: {
        type: Boolean,
        default: false,
        desc: "Show column total"
    },
    sortable: {
        type: Boolean,
        default: false,
        desc: "Enable sorting for this column"
    },
    formatters: {
        type: [String, Function, Array],
        default: null,
        desc: "Apply one or more formatters to data value"
    },
    emptyString: {
        type: String,
        default: "-",
        desc: "String to render when data value is null or empty"
    },
    type: {
        type: String,
        default: "data",
        validator(value) {
            // The value must match one of these strings
            return ["data", "actions", "quote"].includes(value)
        },
        desc: "The type of column",
        options: ["data", "actions", "quote"]
    },
    quoteDetailOptions: {
        type: Object,
        default: () => { return {} },
        desc: "QuoteDetail component options"
    },
    contextMenuOptions: {
        type: Object,
        default: () => { return {} },
        desc: "ActionMenu component items"
    }
});
</script>