<script setup>
import { mergeProps } from "vue";
import { PrimitiveProps } from '@/components/Core/Primitive/Primitive'
import CollapsibleContent from '@/components/Core/Collapsible/CollapsibleContent'
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
    class="fb-accordion-content"
    style="
      --fb-collapsible-content-width: var(--fb-collapsible-content-width);
      --fb-collapsible-content-height: var(--fb-collapsible-content-height);
    "
  >
    <slot />
  </CollapsibleContent>
</template>