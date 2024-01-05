<script setup>
import { mergeProps } from "vue";
import { PrimitiveProps } from '@/components/Core/Primitive'
import { CollapsibleContent } from '@/components/Core/Collapsible'
import { injectAccordionItemContext } from './AccordionItem.vue'

const props = defineProps(mergeProps(PrimitiveProps,{}));

const itemContext = injectAccordionItemContext()
</script>

<template>
  <CollapsibleContent
    :id="itemContext.triggerId"
    role="region"
    :open="itemContext.open.value"
    :hidden="!itemContext.open.value"
    :as-child="props.asChild"
    :aria-labelledby="itemContext.triggerId"
    :data-state="itemContext.dataState.value"
    :data-disabled="itemContext.dataDisabled.value"
    style="
      --fb-accordion-content-width: var(--fb-collapsible-content-width);
      --fb-accordion-content-height: var(--fb-collapsible-content-height);
    "
  >
    <slot />
  </CollapsibleContent>
</template>