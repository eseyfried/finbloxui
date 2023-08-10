<template>
    <component
        v-if="column.children && column.children.td"
        :is="column.children.td"
        :data="rowData"
        :column="column"
        :field="field"
        :attrs="{ 'data-cell': Base.header(column), 'role': 'cell', class: cellClasses }"
    />   
    <template v-else-if="column.props.type && column.props.type === 'actions'">
        <td :data-cell="Base.header(column)" role="cell">
            <ContextMenu v-bind="parseContextMenuItems(column.props.contextMenuOptions)">
                <!-- pass component template slots from grandparent to grandchild using special component -->
                <template v-for="(name, _) in Object.keys(column.children || {})" #[name]="slotData" :key="_">
                    <component :is="column.children[name]" v-bind="slotData || {}" />
                </template>
            </ContextMenu>
        </td>
    </template>
    <template v-else-if="column.props.type && column.props.type === 'quote'">
        <td :data-cell="Base.header(column)" role="cell">
            <span>
                <a href="#"
                    :id="`id-${rowData['id']}`"
                    @click.prevent="() => null"
                    @mouseover="handleHover(true)"
                    @mouseleave="handleHover(false);updatePopover=false;"
                >
                    {{ Base.resolveFieldData(column, rawFieldData) }}
                </a>
            </span>
            <Popover :selector="`#id-${rowData['id']}`" :trigger="column.props.quoteDetailOptions.trigger || 'hover'" :updatePopover="updatePopover">
                <component
                    v-if="column.children && Object.hasOwn(column.children, 'default') && ComponentUtils.getChildVNodeByType(column.children.default(), 'QuoteDetail')"
                    :is="ComponentUtils.getChildVNodeByType(column.children.default(), 'QuoteDetail')"
                    v-bind="ComponentUtils.getChildVNodeByType(column.children.default(), 'QuoteDetail').props"
                    :symbol="Base.resolveFieldData(column, rawFieldData)"
                    :show="showQuoteHover"
                    :callbackOn="column.props.quoteDetailOptions.callbackOn || 'show'"
                    :class="{ 'fb-quote-detail-hover': showQuoteHover }"
                    :eventHandlers="{ '@fb-quote-detail-loaded': () => { updatePopover.value = true }}"
                />
                <QuoteDetail
                    v-else
                    v-bind="column.props.quoteDetailOptions"
                    :symbol="Base.resolveFieldData(column, rawFieldData)"
                    :show="showQuoteHover"
                    :callbackOn="column.props.quoteDetailOptions.callbackOn || 'show'"
                    :class="{ 'fb-quote-detail-hover': showQuoteHover }"
                    @fb-quote-detail-loaded="updatePopover = true"
                />
            </Popover>
        </td>
    </template>
    <template v-else>
        <td :data-cell="Base.header(column)" role="cell">
            <span :class="cellClasses">{{ Base.resolveFieldData(column, rawFieldData) }}</span>
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
import Base from "@/components/DataTable/Base";
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


const updatePopover = ref(false);
const showQuoteHover = ref(false);
const rawFieldData = computed(() => ComponentUtils.resolveFieldData(props.rowData, Base.field(props.column)));
const cellClasses = computed(() => {
    return {
        "fb-positive": Base.hasChangeIndicatorFormat(props.column) && rawFieldData.value > 0,
        "fb-negative": Base.hasChangeIndicatorFormat(props.column) && rawFieldData.value < 0,
    }
})

// methods
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

</style>