<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-column-filter">
        <slot
            name="button"
            :attrs="{ class: 'fb-column-filter-button' }"
            :eventHandlers="{ click: handleFilterButtonClick }"
            :props="props"
        >
            <button
                class="fb-column-filter-button"
                @click="handleFilterButtonClick()"
            >
                ...
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
import { ref, toRaw } from "vue";
import { onClickOutside } from "@vueuse/core";

// vars
const filterValue = props.filterType === "multiselect" ? ref([]) : ref(null);
const filterOperator = ref(null);
const defaultFilterOperator = ref(null);
const showFilter = ref(false);
const target = ref(null);

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
    },
    selectOptions: {
        type: Array,
        default: () => []
    },
    operator: {
        type: String,
        default: null,
        validator(value) {
            // The value must match one of these strings
            return ["equality", "comparison"].includes(value)
        },
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
    },
    clearButtonLabel: {
        type: String,
        default: "Clear",
    },
    applyButtonLabel: {
        type: String,
        default: "Apply",
    },
});
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
        return array.indexOf(value) === index;
    })
}

const handleFilterButtonClick = () => {
    showFilter.value = !showFilter.value;
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
    emit("fb-column-filter-clear-button:click", true);
}

const handleApplyButtonClick = () => {
    const filters = {
        filterValue: toRaw(filterValue.value),
        filterOperator: filterOperator.value
    }
    emit("fb-column-filter-apply-button:click", filters);
}
</script>
<style lang="scss" scoped>
.fb-column-filter {
    position: relative;
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

</style>