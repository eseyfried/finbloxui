<script setup>
import { injectAccordionItemContext } from './AccordionItem.vue'
import { injectAccordionRootContext } from './AccordionRoot.vue'

import CollapsibleTrigger from '@/components/Core/Collapsible/CollapsibleTrigger'

const props = defineProps({})

const rootContext = injectAccordionRootContext()
const itemContext = injectAccordionItemContext()

function changeItem() {
  if (itemContext.disabled.value)
    return
  rootContext.changeModelValue(itemContext.value.value)
}
</script>

<template>
  <CollapsibleTrigger
    :id="itemContext.triggerId"
    :ref="itemContext.primitiveElement"
    data-fb-vue-collection-item
    :as="props.as"
    :as-child="props.asChild"
    :aria-controls="itemContext.triggerId"
    :aria-disabled="itemContext.disabled.value || undefined"
    :aria-expanded="itemContext.open.value || false"
    :data-disabled="itemContext.dataDisabled.value"
    :data-state="itemContext.dataState.value"
    :disabled="itemContext.disabled.value"
    @click="changeItem"
    class="fb-accordion-trigger"
  >
    <slot />
  </CollapsibleTrigger>
</template>