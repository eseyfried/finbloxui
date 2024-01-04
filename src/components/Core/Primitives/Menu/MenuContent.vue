<script>
import { mergeProps } from "vue"
import {
  MenuContentImplEmits,
  MenuRootContentProps,
} from './MenuContentImpl.vue'

export const MenuContentEmits = MenuContentImplEmits

export const MenuContentProps = mergeProps(MenuRootContentProps, {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount: {
    type: Boolean,
    default: true
  }
})
</script>

<script setup>
import MenuRootContentModal from './MenuRootContentModal.vue'
import MenuRootContentNonModal from './MenuRootContentNonModal.vue'
import { injectMenuContext, injectMenuRootContext } from './MenuRoot.vue'
import { Presence } from '@/components/Core/Primitives/Presence'
import { useForwardPropsEmits } from '@/modles/shared'

const props = defineProps(MenuContentProps)
const emits = defineEmits(MenuContentEmits)
const forwarded = useForwardPropsEmits(props, emits)

const menuContext = injectMenuContext()
const rootContext = injectMenuRootContext()
</script>

<template>
  <Presence :present="forceMount || menuContext.open.value">
    <MenuRootContentModal
      v-if="rootContext.modal.value"
      v-bind="{ ...$attrs, ...forwarded }"
    >
      <slot />
    </MenuRootContentModal>
    <MenuRootContentNonModal
      v-else
      v-bind="{ ...$attrs, ...forwarded }"
    >
      <slot />
    </MenuRootContentNonModal>
  </Presence>
</template>