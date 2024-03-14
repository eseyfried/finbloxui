<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

import { reactive, ref } from 'vue'
import { logEvent } from 'histoire/client'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";


import CollapsibleRoot from "@/components/Core/Collapsible/CollapsibleRoot";
import CollapsibleContent from "@/components/Core/Collapsible/CollapsibleContent";
import CollapsibleTrigger from "@/components/Core/Collapsible/CollapsibleTrigger";



const state = reactive({
    as: defaultValue(CollapsibleRoot, 'as'),
    defaultOpen: defaultValue(CollapsibleRoot, 'defaultOpen'),
    disabled: defaultValue(CollapsibleRoot, 'disabled'),
})
const open = ref(state.defaultOpen);
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}

const handleCollapse = ($event) => {
    logEvent("update:open", { open: $event })
    open.value = $event
}

</script>

<template>
    <Story
        title="Core/Collapsible/CollapsibleRoot"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" />
            <HstCheckbox type="checkbox" v-model="state.disabled" title="disabled" />
            <HstCheckbox type="text" v-model="state.defaultOpen" title="defaultOpen" />
        </template>

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <CollapsibleRoot
                    v-model:open="open"
                    :as="state.as"
                    :disabled="state.disabled"
                    :defaultOpen="state.defaultOpen"
                    class="w-[300px]"
                >
                    <CollapsibleTrigger class="fb-button-primary">
                        <span v-if="open">-</span>
                        <span v-else>+</span>
                    </CollapsibleTrigger>
                    <div>
                        <span>Content that's always visbile </span>
                    </div>

                    <CollapsibleContent>
                        <div>
                            <span>Content that can be expanded and collapsed</span>
                        </div>
                    </CollapsibleContent>
                </CollapsibleRoot>
            </template>
        </Variant>

        <Variant title="Disabled" :init-state="() => initState({ disabled: true })">
            <template #default="{state}">
                <CollapsibleRoot
                    v-model:open="open"
                    :as="state.as"
                    :disabled="state.disabled"
                    :defaultOpen="state.defaultOpen"
                    class="w-[300px]"
                >
                    <CollapsibleTrigger class="fb-button-primary">
                        <span v-if="open">-</span>
                        <span v-else>+</span>
                    </CollapsibleTrigger>
                    <div>
                        <span>Content that's always visbile </span>
                    </div>

                    <CollapsibleContent>
                        <div>
                            <span>Content that can be expanded and collapsed</span>
                        </div>
                    </CollapsibleContent>
                </CollapsibleRoot>
            </template>
        </Variant>

        <Variant title="Expanded" :init-state="() => initState({ defaultOpen: true })">
            <template #default="{state}">
                <CollapsibleRoot
                    v-model:open="open"
                    :as="state.as"
                    :disabled="state.disabled"
                    :defaultOpen="state.defaultOpen"
                    class="w-[300px]"
                >
                    <CollapsibleTrigger class="fb-button-primary">
                        <span v-if="open">-</span>
                        <span v-else>+</span>
                    </CollapsibleTrigger>
                    <div>
                        <span>Content that's always visbile </span>
                    </div>

                    <CollapsibleContent>
                        <div>
                            <span>Content that can be expanded and collapsed</span>
                        </div>
                    </CollapsibleContent>
                </CollapsibleRoot>
            </template>
        </Variant>

        <Variant title="Event" :init-state="initState">
            <template #default="{state}">
                <CollapsibleRoot
                    @update:open="handleCollapse"
                    :as="state.as"
                    :disabled="state.disabled"
                    :defaultOpen="state.defaultOpen"
                    class="w-[300px]"
                >
                    <CollapsibleTrigger class="fb-button-primary">
                        <span v-if="open">-</span>
                        <span v-else>+</span>
                    </CollapsibleTrigger>
                    <div>
                        <span>Content that's always visbile </span>
                    </div>

                    <CollapsibleContent>
                        <div>
                            <span>Content that can be expanded and collapsed</span>
                        </div>
                    </CollapsibleContent>
                </CollapsibleRoot>
            </template>
        </Variant>
    </Story>
</template>
 