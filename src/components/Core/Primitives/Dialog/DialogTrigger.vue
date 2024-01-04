<script>
export const DialogTriggerProps = {
    as: {
        type: String,
        default: "button"
    },
}
</script>
<script setup>
import { onMounted, mergeProps } from 'vue'
import { injectDialogRootContext } from './DialogRoot.vue'
import { Primitive, usePrimitiveElement, PrimitiveProps } from '@/components/Core/Primitives/Primitive'


const props = defineProps(mergeProps(PrimitiveProps, DialogTriggerProps))
const rootContext = injectDialogRootContext()
const { primitiveElement, currentElement } = usePrimitiveElement()

onMounted(() => {
  rootContext.triggerElement = currentElement
})
</script>

<template>
  <Primitive
    ref="primitiveElement"
    v-bind="props"
    :type="as === 'button' ? 'button' : undefined"
    aria-haspopup="dialog"
    :aria-expanded="rootContext.open.value || false"
    :aria-controls="rootContext.contentId"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    @click="rootContext.onOpenToggle"
  >
    <slot />
  </Primitive>
</template>