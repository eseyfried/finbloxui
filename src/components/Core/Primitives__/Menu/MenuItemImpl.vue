<script>
import { mergeProps } from "vue"
import { PrimitiveProps } from '@/components/Core/Primitives/Primitive'

export const MenuItemImplProps = mergeProps(PrimitiveProps, {
  disabled: {
    type: Boolean
  },
  textValue: {
    type: String
  }
})
</script>

<script setup>
import { nextTick, ref } from 'vue'
import { isMouseEvent } from './utils'
import { injectMenuContentContext } from './MenuContentImpl.vue'
import {
  Primitive,
  usePrimitiveElement,
} from '@/components/Core/Primitives/Primitive'

const props = defineProps(MenuItemImplProps)

const { primitiveElement, currentElement } = usePrimitiveElement()
const contentContext = injectMenuContentContext()

const isFocused = ref(false)

async function handlePointerMove(event) {
  if (event.defaultPrevented)
    return
  if (!isMouseEvent(event))
    return

  if (props.disabled) {
    contentContext.onItemLeave(event)
  }
  else {
    const defaultPrevented = contentContext.onItemEnter(event)
    if (!defaultPrevented) {
      const item = event.currentTarget;
      (item)?.focus()
    }
  }
}

async function handlePointerLeave(event) {
  await nextTick()
  if (event.defaultPrevented)
    return
  if (!isMouseEvent(event))
    return

  contentContext.onItemLeave(event)
}

defineExpose({
  el: currentElement,
})
</script>

<template>
  <Primitive
    ref="primitiveElement"
    role="menuitem"
    tabindex="-1"
    :as="as"
    :as-child="asChild"
    data-radix-vue-collection-item
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    :data-highlighted="isFocused ? '' : undefined"
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
    @focus="
      async (event) => {
        await nextTick();
        if (event.defaultPrevented || disabled) return;
        isFocused = true;
      }
    "
    @blur="
      async (event) => {
        await nextTick();
        if (event.defaultPrevented) return;
        isFocused = false;
      }
    "
  >
    <slot />
  </Primitive>
</template>