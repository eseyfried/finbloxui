<script>
import { injectAccordionRootContext } from './AccordionRoot.vue';
import { createContext, useId, useArrowNavigation } from '@/modules/shared';
export const [injectAccordionItemContext, provideAccordionItemContext] = createContext('AccordionItem');
const AccordionItemState  = {
  Open: 'open',
  Closed: 'closed',
}
</script>
<script setup>
import { computed } from 'vue';
import { usePrimitiveElement } from '@/components/Core/Primitive';
import { CollapsibleRoot } from '@/components/Core/Collapsible';

const props = defineProps({
    /**
     * Whether or not an accordion item is disabled from user interaction.
     * When true, prevents the user from interacting with the item.
     *
     * @defaultValue false
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * A string value for the accordion item. All items within an accordion should use a unique value.
     */
    value: {
        type: String,
        default: null
    }
});

const rootContext = injectAccordionRootContext();

const open = computed(() =>
  rootContext.isSingle.value
    ? props.value === rootContext.modelValue.value
    : Array.isArray(rootContext.modelValue.value)
      && rootContext.modelValue.value.includes(props.value),
)

const disabled = computed(() => {
  return (
    rootContext.disabled.value
    || props.disabled
    || (rootContext.isSingle.value && open.value && !rootContext.collapsible)
  )
})

const dataDisabled = computed(() => (disabled.value ? '' : undefined))

const dataState = computed(() =>
  open.value ? AccordionItemState.Open : AccordionItemState.Closed,
)

const { primitiveElement, currentElement } = usePrimitiveElement();


provideAccordionItemContext({
  open,
  dataState,
  disabled,
  dataDisabled,
  triggerId: useId(),
  primitiveElement,
  currentElement,
  value: computed(() => props.value),
})

defineExpose({ open })

function handleArrowKey(e) {
  useArrowNavigation(
    e,
    currentElement.value,
    rootContext.parentElement.value,
    {
      arrowKeyOptions: 'vertical',//rootContext.orientation,
      dir: rootContext.direction.value,
      focus: true,
    },
  )
}
</script>
<template>
    <CollapsibleRoot
        :data-disabled="dataDisabled"
        :data-state="dataState"
        :disabled="disabled"
        :open="open"
        :as-child="props.asChild"
        @keydown.up.down.left.right.home.end="handleArrowKey"
        class="fb-accordion-item"
    >
        <slot :open="open" />
    </CollapsibleRoot>
</template>