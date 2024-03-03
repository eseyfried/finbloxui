<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-column-selector" :class="componentClasses.getClassByType('component')"> 
        <slot
            name="button"
            :props="props"
            :attrs="{ class: 'fb-column-selector-button' }"
            :eventHandlers="{ click: handleButtonClick }"
        >
            <button
                class="fb-column-selector-button"
                :class="componentClasses.getClassByType('buttonSecondary')"
                @click="handleButtonClick"
            >
                {{ buttonLabel }}
            </button>
        </slot>
        <ul :class="{'fb-column-selector-visible' : showColumns  }" ref="target">
            <template v-for="column in columns" :key="column">
                <li :class="{ 'fb-column-selector-selected': selectedColumnNames.includes(column.name) }">
                    <slot
                        name="column"
                        :props="props"
                        :column="column"
                        :attrs="{ class: { 'fb-column-selector-selected': selectedColumnNames.includes(column.name) }}"
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
import { ref, toRef, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
import * as componentClasses from "@/modules/useCommonCSS";

// vars
const props = defineProps({
    columns: {
        type: Array,
        default: () => [],
        desc: "An array of column objects."
    },
    buttonLabel: {
        type: String,
        default: "Columns",
        desc: "The trigger button text label"
    },
    defaultSelectedColumns: {
        type: Array,
        default: () => [],
        desc: "An array of column objects"
    },
});
const emit = defineEmits([
    'fb-column-selector-selected:click',
    'fb-column-selector-button:click'
]);
const showColumns = ref(false);
const target = ref(null);


onClickOutside(target, () => { showColumns.value = false; });

// methods

const selectedColumns = toRef(props,props.defaultSelectedColumns.length > 0 ? 'defaultSelectedColumns' : 'columns');
// const selectedColumns = initSelectedColumns

const handleColumnSelection = (column) => {
    if (selectedColumnNames.value.includes(column.name)) {
        // delete column from selected columns
        const index = selectedColumns.value.findIndex((col) => col.name === column.name)
        if (index > -1) {
            console.log(selectedColumns.value.splice(index, 1))
        }
    } else {
        selectedColumns.value.push(column);
    }
    emit("fb-column-selector-selected:click", selectedColumns.value);
}
const handleButtonClick = () => {
    showColumns.value  = !showColumns.value
    emit("fb-column-selector-button:click", !showColumns.value);
}

const selectedColumnNames = computed(() => selectedColumns.value.map(column => column.name))


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