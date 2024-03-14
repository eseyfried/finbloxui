<template>
    <Story
        title="Core/Navigation/ContextMenu"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstJson v-model="state.menuItems" title="menuItems" />
            <PropDesc :component="ContextMenu" prop="menuItems" />
            <HstText v-model="state.buttonLabel" title="buttonLabel" />
            <PropDesc :component="ContextMenu" prop="buttonLabel" />
        </template>

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <ContextMenu
                        :menuItems="state.menuItems"
                        :buttonLabel="state.buttonLabel"
                        @fb-action-menu-item:click="handleActionClick"
                    />
                </div>
            </template>
        </Variant>

        <Variant title="With Menu Item Callback" :init-state="() => initState()">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <ContextMenu
                        :menuItems="menuItemsWithCB"
                        :buttonLabel="state.buttonLabel"
                        @fb-action-menu-item:click="handleActionClick"
                    />
                </div>
            </template>
        </Variant>
        
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import PropDesc from '@/../.histoire/components/PropDesc';
import { logEvent } from 'histoire/client'

import ContextMenu from '@/components/Core/Navigation/ContextMenu/ContextMenu';

const menuItems = [
    { "url": "#", "label": "Option A"},
    { "url": "/some/url", "label": "Option B"},
    { "url": "/some/other/url", "label": "Option C"},
]

const menuItemsWithCB = [
    { "url": "#", "label": "Option A", "callback": (item) => { alert(`callback called with ${JSON.stringify(item)}`) } },
    { "url": "/some/url", "label": "Option B"},
    { "url": "/some/other/url", "label": "Option C"},
]
const state = reactive({
    menuItems: defaultValue(ContextMenu, 'menuItems', menuItems),
    buttonLabel: defaultValue(ContextMenu, 'buttonLabel', 'Options'),
})

const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

const handleActionClick = (event) => {
    alert(`Context Item was clicked ${JSON.stringify(event)}`); 
    logEvent('@fb-action-menu-item:click',event)
}

</script>