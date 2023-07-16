<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-column-selector">
        <slot
            name="button"
            :props="props"
            :attrs="{ class: 'fb-column-selector-button' }"
            :eventHandlers="{ click: handleButtonClick }"
        >
            <button
                class="fb-column-selector-button"
                @click="handleButtonClick"
            >
                {{ buttonLabel }}
            </button>
        </slot>
        <ul :class="{'fb-column-selector-visible' : showColumns  }">
            <template v-for="column in columns" :key="column">
                <li :class="{ 'fb-column-selector-selected': selectedColumns.includes(column.name) }">
                    <slot
                        name="column"
                        :props="props"
                        :column="column"
                        :attrs="{ class: { 'fb-column-selector-selected': selectedColumns.includes(column.name) }}"
                        :eventHandlers="{ click: () => { return handleColumnSelection(column); } }"
                    >
                        
                        <a href="#" @click.prevent="handleColumnSelection(column)">{{ column.label }}</a>
                    </slot>
                </li>
            </template>
        </ul>
    </div>
</template>
<script setup>
// imports
import { ref } from "vue";

// vars
const props = defineProps({
    columns: {
        type: Array,
        default: () => []
    },
    buttonLabel: {
        type: String,
        default: "Columns",
    },
    defaultSelectedColumns: {
        type: Array,
        default: () => [],
    },
});
const emit = defineEmits([
    'fb-column-selector-selected:click',
    'fb-column-selector-button:click'
]);
const showColumns = ref(false);


// methods
const transformColumnsToNames = (columns) => {
    return columns.filter(column => typeof column.name === "string")
                .map((column) => column.name);
}


const handleColumnSelection = (column) => {
    if (selectedColumns.value.includes(column.name)) {
        // delete column from selected columns
        selectedColumns.value = selectedColumns.value.filter(item => {
            return item !== column.name;
        });
    } else {
        selectedColumns.value.push(column.name);
    }
    emit("fb-column-selector-selected:click", selectedColumns.value);
}
const handleButtonClick = () => {
    showColumns.value  = !showColumns.value
    emit("fb-column-selector-button:click", !showColumns.value);
}
const defaultSelectedColumns = props.defaultSelectedColumns.length > 0 ? props.defaultSelectedColumns : props.columns;
const selectedColumns = ref(transformColumnsToNames(defaultSelectedColumns));
</script>
<style lang="scss" scoped>
.fb-column-selector {
    position: relative;
}
.fb-column-selector ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: none;
    position: absolute;
    z-index: 1001;
}
.fb-column-selector-visible {
    display: block !important;
}
</style>