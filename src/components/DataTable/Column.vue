<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    field: {
        type: String,
        default: null,
    },
    header: {
        type: String,
        default: null,
    },
    showTotal: {
        type: Boolean,
        default: false,
    },
    sortable: {
        type: Boolean,
        default: false
    },
    formatters: {
        type: [String, Function, Array],
        default: null,
    },
    emptyString: {
        type: String,
        default: "--",
    },
    type: {
        type: String,
        default: "data",
        validator(value) {
            // The value must match one of these strings
            return ["data", "actions", "quote"].includes(value)
        },
    },
    quoteDetailOptions: {
        type: Object,
        default: () => {},
    },
    actionMenuItems: {
        type: Array,
        default: () => [],
    }
});
</script>