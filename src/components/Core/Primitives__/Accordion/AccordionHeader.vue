<script setup>
import { mergeProps } from "vue";
import { injectAccordionItemContext } from './AccordionItem.vue'
import { injectAccordionRootContext } from './AccordionRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitives/Primitive'

const props = defineProps(mergeProps(PrimitiveProps, {
  as: {
    type: String,
    default: 'h3'
  }
}))
const rootContext = injectAccordionRootContext()
const itemContext = injectAccordionItemContext()
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :data-orientation="rootContext.orientation.value"
    :data-state="itemContext.dataState.value"
    :data-disabled="itemContext.dataDisabled.value"
  >
    <slot />
  </Primitive>
</template>