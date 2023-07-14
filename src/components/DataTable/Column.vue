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
    sortable: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: "data",
        validator(value) {
        // The value must match one of these strings
            return ["data", "actions"].includes(value)
        },
    },
    actionMenuItems: {
        type: Array,
        default: () => [],
    }
});
</script>