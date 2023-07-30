<template>
    <component
        v-if="column.children && column.children.td"
        :is="column.children.td"
        :data="rowData"
        :column="column"
        :field="field"
        :attrs="{ 'data-cell': field, 'role': 'cell' }"
    />   
    <template v-else-if="column.props.type && column.props.type === 'actions'">
        <td :data-cell="field" role="cell">
            <ContextMenu v-bind="parseContextMenuItems(column.props.contextMenuOptions)">
                <!-- pass component template slots from grandparent to grandchild using special component -->
                <template v-for="(name, _) in Object.keys(column.children || {})" #[name]="slotData" :key="_">
                    <component :is="column.children[name]" v-bind="slotData || {}" />
                </template>
            </ContextMenu>
        </td>
    </template>
    <template v-else-if="column.props.type && column.props.type === 'quote'">
        <!-- <td :data-cell="field" role="cell" @mouseover="handleHover(true)" @mouseleave="handleHover(false)"> -->
        <td :data-cell="field" role="cell">
            <span :id="`id-${rowData['id']}`" @mouseover="handleHover(true)" @mouseleave="handleHover(false)">
                {{ resolveFieldData() }}
            </span>
            <Popover :selector="`#id-${rowData['id']}`" :trigger="column.props.quoteDetailOptions.trigger || 'hover'">
                 <QuoteDetail
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
        <td :data-cell="field" role="cell">
            {{ resolveFieldData() }}
            
            <component
                v-if="column.children && Object.hasOwn(column.children, 'default') && column.children.default()[0].type.__name === 'QuoteDetail'"
                :is="column.children.default()[0]"
                v-bind="column.children.default()[0].props"

            />
            
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

const showQuoteHover = ref(false);
// methods
const resolveFieldData = () => {
    return ComponentUtils.resolveFieldData(props.rowData, field.value);
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