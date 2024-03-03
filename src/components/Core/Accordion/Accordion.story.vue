<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

import { reactive } from 'vue'
import { logEvent } from 'histoire/client'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";


import AccordionRoot from "@/components/Core/Accordion/AccordionRoot"
import AccordionItem from "@/components/Core/Accordion/AccordionItem"
import AccordionHeader from "@/components/Core/Accordion/AccordionHeader"
import AccordionContent from "@/components/Core/Accordion/AccordionContent"
import AccordionTrigger from "@/components/Core/Accordion/AccordionTrigger"

const accordionItems = [
    {
      value: 'item-1',
      title: 'Is it accessible?',
      content: 'Yes. It adheres to the WAI-ARIA design pattern.',
    },
    {
      value: 'item-2',
      title: 'Is it unstyled?',
      content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.',
    },
    {
      value: 'item-3',
      title: 'Can it be animated?',
      content: 'Yes! You can use the transition prop to configure the animation.',
    },
]

const state = reactive({
    as: defaultValue(AccordionRoot, 'as'),
    disabled: defaultValue(AccordionRoot, 'disabled'),
    defaultValue: defaultValue(AccordionRoot, 'defaultValue')
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
        title="Core/Accordion/AccordionRoot"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" />
            <HstCheckbox type="checkbox" v-model="state.disabled" title="disabled" />
            <HstText type="text" v-model="state.defaultValue" title="defaultValue" />
        </template>

        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <AccordionRoot
                    :as="state.as"
                    :disabled="state.disabled"
                    :defaultValue="state.defaultValue"
                >
                    <template v-for="(accordionItem, i) in accordionItems" :key="i">
                        <AccordionItem :value="accordionItem.value">
                            <AccordionHeader>
                                <AccordionTrigger>
                                    {{ accordionItem.title }}
                                </AccordionTrigger>
                            </AccordionHeader>
                            <AccordionContent>
                                <p>{{ accordionItem.content }}</p>
                            </AccordionContent>
                        </AccordionItem>
                    </template>
                </AccordionRoot>
            </template>
        </Variant>

        <Variant title="Disabled" :init-state="() => initState({disabled: true})">
            <template #default="{state}">
                <AccordionRoot
                    :as="state.as"
                    :disabled="state.disabled"
                    :defaultValue="state.defaultValue"
                >
                    <template v-for="(accordionItem, i) in accordionItems" :key="i">
                        <AccordionItem :value="accordionItem.value">
                            <AccordionHeader>
                                <AccordionTrigger>
                                    {{ accordionItem.title }}
                                </AccordionTrigger>
                            </AccordionHeader>
                            <AccordionContent>
                                <p>{{ accordionItem.content }}</p>
                            </AccordionContent>
                        </AccordionItem>
                    </template>
                </AccordionRoot>
            </template>
        </Variant>

        <Variant title="Expanded By Default" :init-state="() => initState({defaultValue: 'item-1'})">
            <template #default="{state}">
                <AccordionRoot
                    :as="state.as"
                    :disabled="state.disabled"
                    :defaultValue="state.defaultValue"
                >
                    <template v-for="(accordionItem, i) in accordionItems" :key="i">
                        <AccordionItem :value="accordionItem.value">
                            <AccordionHeader>
                                <AccordionTrigger>
                                    {{ accordionItem.title }}
                                </AccordionTrigger>
                            </AccordionHeader>
                            <AccordionContent>
                                <p>{{ accordionItem.content }}</p>
                            </AccordionContent>
                        </AccordionItem>
                    </template>
                </AccordionRoot>
            </template>
        </Variant>
        <Variant title="Event" :init-state="() => initState()">
            <template #default="{state}">
                <AccordionRoot
                    :as="state.as"
                    :disabled="state.disabled"
                    :defaultValue="state.defaultValue"
                    @update:modelValue="logEvent('Clicked value', $event)"
                >
                    <template v-for="(accordionItem, i) in accordionItems" :key="i">
                        <AccordionItem :value="accordionItem.value">
                            <AccordionHeader>
                                <AccordionTrigger>
                                    {{ accordionItem.title }}
                                </AccordionTrigger>
                            </AccordionHeader>
                            <AccordionContent>
                                <p>{{ accordionItem.content }}</p>
                            </AccordionContent>
                        </AccordionItem>
                    </template>
                </AccordionRoot>
            </template>
        </Variant>
        
    </Story>
</template>
 