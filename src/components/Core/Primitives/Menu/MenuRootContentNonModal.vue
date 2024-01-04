<script>
import { mergeProps } from "vue"
const MenuRootContentNonModalProps = mergeProps(MenuRootContentProps, {})
const MenuRootContentModalEmits = MenuContentImplEmits
</script>
<script setup>
import MenuContentImpl, {
    MenuContentImplEmits,
    MenuRootContentProps,
} from './MenuContentImpl.vue'
import { injectMenuContext } from './MenuRoot.vue'
import { useForwardPropsEmits } from '@/modules/shared'

const props = defineProps(MenuRootContentNonModalProps)
const emits = defineEmits(MenuRootContentModalEmits)
const forwarded = useForwardPropsEmits(props, emits)

const menuContext = injectMenuContext()

</script>

<template>
  <MenuContentImpl
    v-bind="forwarded"
    :trap-focus="false"
    :disable-outside-pointer-events="false"
    :disable-outside-scroll="false"
    @dismiss="menuContext.onOpenChange(false)"
  >
    <slot />
  </MenuContentImpl>
</template>