<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";

import ListGroupRoot from "@/components/Core/ListGroup/ListGroupRoot";
import ListGroupItem from "@/components/Core/ListGroup/ListGroupItem";

const listItems = [
    'Yes. It adheres to the WAI-ARIA design pattern.',
    'Yes. It\'s unstyled by default, giving you freedom over the look and feel.',
    'Yes! You can use the transition prop to configure the animation.',
]

const state = reactive({
    as: defaultValue(ListGroupRoot, 'as'),
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}


</script>

<template>
    <Story
        title="Core/ListGroup/ListGroupRoot"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" />
        </template>

        <Variant title="Unordered List" :init-state="initState">
            <template #default="{state}">
                <ListGroupRoot
                    :as="state.as"
                >
                    <template v-for="(listItem, i) in listItems" :key="i">
                        <ListGroupItem :value="listItem.value">
                            {{ listItem }}
                        </ListGroupItem>
                    </template>
                </ListGroupRoot>
            </template>
        </Variant>

        <Variant title="Ordered List" :init-state="() => initState({ as: 'ol'})">
            <template #default="{state}">
                <ListGroupRoot
                    :as="state.as"
                >
                    <template v-for="(listItem, i) in listItems" :key="i">
                        <ListGroupItem :value="listItem.value">
                            {{ listItem }}
                        </ListGroupItem>
                    </template>
                </ListGroupRoot>
            </template>
        </Variant>

        
    </Story>
</template>
 