<template>
    <component
        v-if="column.children && column.children.td"
        :is="column.children.td"
        :data="rowData"
        :column="column"
        :field="field"
        :attrs="{ 'data-cell': header, 'role': 'cell', class: cellClasses }"
    />   
    <template v-else-if="column.props.type && column.props.type === 'actions'">
        <td :data-cell="header" role="cell">
            <ContextMenu v-bind="parseContextMenuItems(column.props.contextMenuOptions)">
                <!-- pass component template slots from grandparent to grandchild using special component -->
                <template v-for="(name, _) in Object.keys(column.children || {})" #[name]="slotData" :key="_">
                    <component :is="column.children[name]" v-bind="slotData || {}" />
                </template>
            </ContextMenu>
        </td>
    </template>
    <template v-else-if="column.props.type && column.props.type === 'quote'">
        <td :data-cell="header" role="cell">
            <span :id="`id-${rowData['id']}`" @mouseover="handleHover(true)" @mouseleave="handleHover(false)">
                {{ resolveFieldData() }}
            </span>
            <Popover :selector="`#id-${rowData['id']}`" :trigger="column.props.quoteDetailOptions.trigger || 'hover'">
                <component
                    v-if="column.children && Object.hasOwn(column.children, 'default') && ComponentUtils.getChildVNodeByType(column.children.default(), 'QuoteDetail')"
                    :is="ComponentUtils.getChildVNodeByType(column.children.default(), 'QuoteDetail')"
                    v-bind="ComponentUtils.getChildVNodeByType(column.children.default(), 'QuoteDetail').props"
                    :symbol="resolveFieldData()"
                    :show="showQuoteHover"
                    :callbackOn="column.props.quoteDetailOptions.callbackOn || 'show'"
                    :class="{ 'fb-quote-detail-hover': showQuoteHover }"
                />
                 <QuoteDetail
                    v-else
                    v-bind="column.props.quoteDetailOptions"
                    :symbol="resolveFieldData()"
                    :show="showQuoteHover"
                    :callbackOn="column.props.quoteDetailOptions.callbackOn || 'show'"
                    :class="{ 'fb-quote-detail-hover': showQuoteHover }"
                />
            </Popover>
        </td>
    </template>
    <template v-else>
        <td :data-cell="header" role="cell">
            <span :class="cellClasses">{{ resolveFieldData() }}</span>
        </td>
    </template>
</template>
<script setup>
import { computed, ref } from "vue";
import ComponentUtils from "@/modules/ComponentUtils";
import ContextMenu from "@/components/Core/Navigation/ContextMenu/ContextMenu";
import QuoteDetail from "@/components/Core/QuoteDetail/QuoteDetail";
import Popover from "@/components/Core/Popover/Popover";
import { template } from "lodash";
import * as formatters from "@/modules/useFormatter";
const props = defineProps({
    rowData: {
        type: Object,
        default: null
    },
    column: {
        type: Object,
        default: null
    },
});


const field = computed(() => {
    return columnProp('field');
});
const header = computed(() => {
    return columnProp('header');
});
const hasChangeIndicatorFormat = ref(false);
const rawFieldData = computed(() => ComponentUtils.resolveFieldData(props.rowData, field.value));
const cellClasses = computed(() => {
    return {
        "fb-positive": hasChangeIndicatorFormat.value && rawFieldData.value > 0,
        "fb-negative": hasChangeIndicatorFormat.value && rawFieldData.value < 0,
    }
})

const showQuoteHover = ref(false);
// methods
const resolveFieldData = () => {

    let fieldData = rawFieldData.value;
    if (fieldData === null || fieldData === "") {
        return props.column.type.props.emptyString.default;
    }
    const formatter = columnProp('formatters')
    let _formatters = formatter;
    if (!Array.isArray(_formatters)) {
        _formatters = [formatter]
    }
    _formatters.forEach(_formatter => {
        fieldData = formatColumn(_formatter,fieldData)
    });
    return fieldData;
}

const formatColumn = (formatter, fieldData) => {
    if (formatter) {
        if (formatter === "currency") {
            fieldData = formatters.formatCurrency(fieldData);
        } else if (formatter === "percent") {
            fieldData = formatters.formatPercent(fieldData);
        } else if (formatter === "date") {
            fieldData = formatters.formatDate(fieldData);
        } else if (typeof formatter === "function") {
            fieldData = formatter(fieldData);
        } else if(formatter === "change-indicator") {
            hasChangeIndicatorFormat.value = true;
        }
    }
    return fieldData;
}
const columnProp = (prop) => {
    return ComponentUtils.getVNodeProp(props.column, prop);
};
const handleHover = (isHover) => {
    showQuoteHover.value = isHover;
}



/**
 * parse menu items replacing template variables with rowData values
 * template vars are in lodash format: <%=var%>
 */
const parseContextMenuItems = (contextMenuOptions) => {
    const finalContextMenuOptions = {
        ...contextMenuOptions
    }
    finalContextMenuOptions.menuItems = contextMenuOptions.menuItems.map((item) => {
        const newItem = {};
        for (const [key, value] of Object.entries(item)) {
           if (typeof value === "string") {
                let compiled = template(`${value}`);
                newItem[key] = compiled(props.rowData);
           } else if (typeof value === "function") {
                newItem[key] = () => {
                    return value(item, props.rowData)
                }
           }
        }
        return newItem;
    });
    return finalContextMenuOptions;
};

</script>
<style lang="scss" scoped>
.fb-quote-detail-hover {

}
</style>