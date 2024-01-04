<script>
import { mergeProps } from 'vue'
import { PrimitiveProps } from '@/components/Core/Primitives/Primitive'
import { createContext } from '@/modules/shared'



export const MenuItemIndicatorProps = mergeProps(PrimitiveProps, {
  as: {
    type: String,
    default: 'span'
  },
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount: {
    type: Boolean,
    default: false
  } 
})

export const [injectMenuItemIndicatorContext, provideMenuItemIndicatorContext]
  = createContext(
    ['MenuCheckboxItem', 'MenuRadioItem'], 'MenuItemIndicatorContext',
  )
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { getCheckedState, isIndeterminate } from './utils'
import { Primitive } from '@/components/Core/Primitives/Primitive'
import { Presence } from '@/components/Core/Primitives/Presence'

defineProps(MenuItemIndicatorProps)

const indicatorContext = injectMenuItemIndicatorContext({
  checked: ref(false),
})
</script>

<template>
  <Presence
    :present="
      forceMount
        || isIndeterminate(indicatorContext.checked.value)
        || indicatorContext.checked.value === true
    "
  >
    <Primitive
      :as="as"
      :as-child="asChild"
      :data-state="getCheckedState(indicatorContext.checked.value)"
    >
      <slot />
    </Primitive>
  </Presence>
</template>