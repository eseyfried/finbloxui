<script>
import { mergeProps } from "vue"
const MenuRootContentModalProps = mergeProps(MenuRootContentProps, {})
const MenuRootContentModalEmits = MenuContentImplEmits
</script>
<script setup>

import MenuContentImpl, {
    MenuContentImplEmits,
    MenuRootContentProps,
} from './MenuContentImpl.vue'
import { injectMenuContext } from './MenuRoot.vue'
import { useForwardPropsEmits, useHideOthers } from '@/modules/shared'
import { usePrimitiveElement } from '@/components/Core/Primitives/Primitive'

const props = defineProps(MenuRootContentModalProps)
const emits = defineEmits(MenuRootContentModalEmits)
const forwarded = useForwardPropsEmits(props, emits)

const menuContext = injectMenuContext()


const { primitiveElement, currentElement } = usePrimitiveElement()
useHideOthers(currentElement)
</script>

<template>
  <MenuContentImpl
    ref="primitiveElement"
    v-bind="forwarded"
    :trap-focus="menuContext.open.value"
    :disable-outside-pointer-events="menuContext.open.value"
    :disable-outside-scroll="true"
    @dismiss="menuContext.onOpenChange(false)"
    @focus-outside.prevent="emits('focusOutside', $event)"
  >
    <slot />
  </MenuContentImpl>
</template>