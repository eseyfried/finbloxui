<script setup>
import { mergeProps } from "vue";
import { injectAccordionItemContext } from './AccordionItem.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'

const props = defineProps(mergeProps(PrimitiveProps, {
  as: {
    type: String,
    default: 'h3'
  }
}))
const itemContext = injectAccordionItemContext()
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :data-state="itemContext.dataState.value"
    :data-disabled="itemContext.dataDisabled.value"
  >
    <slot />
  </Primitive>
</template>