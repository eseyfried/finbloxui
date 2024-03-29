<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-column-filter" :class="componentClasses.getClassByType('component')">
        <slot
            name="button"
            :attrs="{ class: 'fb-column-filter-button' }"
            :eventHandlers="{ click: handleFilterButtonClick }"
            :props="props"
        >
            <button
                class="fb-column-filter-button"
                :class="[{ 'fb-column-filter-has-filters': hasFilters }, componentClasses.getClassByType('buttonPrimary')]"
                @click="handleFilterButtonClick()"
            >
                {{ triggerButtonLabel }}
            </button>
        </slot>
        <div class="fb-column-filter-menu" :class="{ 'fb-column-filter-menu-visible': showFilter }" ref="target">
            <template v-if="operator">
                <select
                        class="fb-column-filter-operator"
                        @change="handleTextFilterOperator()"
                        v-model="filterOperator"
                    >
                    <template v-for="(option, i) in getOperatorOptions()" :key="i">
                        <slot
                            name="operatorOption"
                            :props="props"
                            :option="option"
                            :isSelected="filterOperator === option.value"
                            :attrs="{ value: option.value, class: 'fb-column-filter-operator', class: { 'fb-column-filter-operator-selected': filterOperator === option.value } }"
                        >
                            <option
                                :value="option.value"
                                :class="{ 'fb-column-filter-operator-selected': filterOperator === option.value }"
                            >
                                {{ option.label }}
                            </option>
                        </slot>
                    </template>
                </select>
            </template>
            <template v-if="filterType === 'text'">
                <slot
                    name="textFilter"
                    :props="props"
                    :attrs="{ class: 'fb-column-filter-input', value: filterValue }"
                    :eventHandlers="{
                        input: ($event) => { 
                            filterValue = $event.target.value;
                            handleTextFilterInput();
                        },
                    }"
                >
                    <input
                        type="text"
                        ref="filterInput"
                        class="fb-column-filter-input"
                        v-model="filterValue"
                        @input="handleTextFilterInput()"
                    />
                </slot>
            </template>
            <template v-if="filterType === 'select' || filterType === 'multiselect'">
                <select
                    class="fb-column-filter-select"
                    @change="handleTextFilterOperator()"
                    v-model="filterValue"
                    :multiple="filterType === 'multiselect'"
                >
                    <template v-for="(option, i) in getUniqueOptions(selectOptions)">
                        <slot
                            name="selectOption"
                            :props="props"
                            :attrs="{ value: option.value, class: 'fb-column-filter-select', class:{ 'fb-column-filter-select-selected': filterValue === option.value } }"
                            :option="option"
                            :isSelected="filterValue === option.value"
                        >
                            <option
                                :value="option" :key="i"
                                :class="{ 'fb-column-filter-select-selected': filterValue === option.value }"
                            >
                                {{ option }}
                            </option>

                        </slot>
                    </template>
                </select>
            </template>
            <div class="fb-column-filter-buttons">
                <slot
                    name="clear"
                    :props="props"
                    :attrs="{ class: 'fb-column-filter-clear-button' }"
                    :eventHandlers="{ click: handleClearButtonClick }"
                >
                    <button class="fb-column-filter-clear-button" @click="handleClearButtonClick()">
                        {{ clearButtonLabel }}
                    </button>
                </slot>
                <slot
                    name="apply"
                    :props="props"
                    :attrs="{ class: 'fb-column-filter-apply-button' }"
                    :eventHandlers="{ click: handleApplyButtonClick }"
                >
                    <button class="fb-column-filter-apply-button" @click="handleApplyButtonClick()">
                        {{ applyButtonLabel }}
                    </button>
                </slot>
            </div>
        </div>
    </div>
</template>
<script setup>
// imports
import { ref, toRaw, nextTick } from "vue";
import { onClickOutside } from "@vueuse/core";
import * as componentClasses from "@/modules/useCommonCSS";

// vars

const filterOperator = ref(null);
const filterInput = ref(null);
const defaultFilterOperator = ref(null);
const showFilter = ref(false);
const target = ref(null);
const hasFilters = ref(false);

onClickOutside(target, () => { showFilter.value = false; });
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    filterType: {
        type: String,
        default: "text",
        validator(value) {
            // The value must match one of these strings
            return ["text", "multiselect", "select"].includes(value)
        },
        desc: "The type of filter",
        options: ["text", "multiselect", "select"]
    },
    selectOptions: {
        type: Array,
        default: () => [],
        desc: "The options for the select type filter"
    },
    operator: {
        type: String,
        default: null,
        validator(value) {
            // The value must match one of these strings
            return ["equality", "comparison"].includes(value)
        },
        desc: "The operator type",
        options: ["equality", "comparison"]
    },
    equalityOptions: {
        type: Array,
        default: () => [
            { label: "Starts With", value: "starts_with"},
            { label: "Contains", value: "contains"},
            { label: "Not Contains", value: "not_contains"},
            { label: "Ends With", value: "ends_with"},
            { label: "Equals", value: "equals"},
            { label: "Not Equals", value: "not_equals"},
        ],
        desc: "The options for the equality operator",
        options: [
            { label: "Starts With", value: "starts_with"},
            { label: "Contains", value: "contains"},
            { label: "Not Contains", value: "not_contains"},
            { label: "Ends With", value: "ends_with"},
            { label: "Equals", value: "equals"},
            { label: "Not Equals", value: "not_equals"},
        ]
    },
    comparisonOptions: {
        type: Array,
        default: () => [
            { label: "Equals", value: "equals"},
            { label: "Not Equals", value: "not_equals"},
            { label: "Less than", value: "less_than"},
            { label: "Less than or equal to", value: "less_than_equal"},
            { label: "Greater than", value: "greater_than"},
            { label: "Greater than or equal to", value: "greater_than_equal"},
        ],
        desc: "The options for the comparison operator",
        options: [
            { label: "Equals", value: "equals"},
            { label: "Not Equals", value: "not_equals"},
            { label: "Less than", value: "less_than"},
            { label: "Less than or equal to", value: "less_than_equal"},
            { label: "Greater than", value: "greater_than"},
            { label: "Greater than or equal to", value: "greater_than_equal"},
        ]
    },
    clearButtonLabel: {
        type: String,
        default: "Clear",
        desc: "The text label for the clear button"
    },
    applyButtonLabel: {
        type: String,
        default: "Apply",
        desc: "The text label for the apply button"
    },
    triggerButtonLabel: {
        type: String,
        default: null,
        desc: "The text label for the filter trigger button"
    }
});

const filterValue = props.filterType === "multiselect" ? ref([]) : ref(null);
const emit = defineEmits([
    'fb-column-filter-button:click',
    'fb-column-filter-input:change',
    'fb-column-filter-operator:change',
    'fb-column-filter-clear-button:click',
    'fb-column-filter-apply-button:click',
]);


// set default value based on operator
switch (props.operator) {
    case "default":
    case "equality":
        filterOperator.value = "starts_with";
        break;
    case "comparison":
        filterOperator.value = "equals";
        break;
}
switch (props.filterType) {
    case "select":
    case "multiselect":
        filterOperator.value = "equals";
        break;
}
defaultFilterOperator.value = filterOperator.value;

// methods
const getOperatorOptions = () => {
    if (props.operator === "equality") {
        return props.equalityOptions;
    } else if (props.operator === "comparison") {
        return props.comparisonOptions;
    }
}

const getUniqueOptions = (options) => {
    return options.filter((value, index, array) => {
        return value && array.indexOf(value) === index;
    })
}

const handleFilterButtonClick = () => {
    showFilter.value = !showFilter.value;
    nextTick(() => {
        if (filterInput.value) {
            filterInput.value.focus();
        }
        
      });
    emit("fb-column-filter-button:click", showFilter.value);
}
const handleTextFilterInput = () => {
    emit("fb-column-filter-input:change", filterValue.value);
}

const handleTextFilterOperator = () => {
    emit("fb-column-filter-operator:change", filterOperator.value);
}
const handleClearButtonClick = () => {
    filterValue.value = props.filterType === "multiselect" ? [] : null;
    filterOperator.value = defaultFilterOperator.value;
    hasFilters.value = false;
    showFilter.value = !showFilter.value;
    emit("fb-column-filter-clear-button:click", true);
}

const handleApplyButtonClick = () => {
    const filters = {
        filterValue: toRaw(filterValue.value),
        filterOperator: filterOperator.value
    }
    hasFilters.value = true;
    showFilter.value = !showFilter.value;
    emit("fb-column-filter-apply-button:click", filters);
}
</script>
<style lang="scss" scoped>
.fb-column-filter {
    position: relative;
    display: inline-block;
}

.fb-column-filter-menu {
    display: none;
    position: absolute;
    z-index: 1001;
}

.fb-column-filter-menu-visible {
    display: flex !important;
    flex-direction: column;
}

.fb-column-filter-buttons {
    width: max-content;
}

</style>