<script>
import { mergeProps } from "vue"
import { PrimitiveProps } from '@/components/Core/Primitives/Primitive'

export const PopperAnchorProps = mergeProps(PrimitiveProps, {
  element: {
    type: String,
    default: null
  }
})
</script>

<script setup>
import { watch } from 'vue'
import { injectPopperRootContext } from './PopperRoot.vue'
import {
  Primitive,
  usePrimitiveElement,
} from '@/components/Core/Primitives/Primitive'

const props = defineProps(PopperAnchorProps)

const { primitiveElement, currentElement } = usePrimitiveElement()

const rootContext = injectPopperRootContext()

watch(currentElement, () => {
  rootContext.onAnchorChange(props.element ?? currentElement.value)
})
</script>

<template>
  <Primitive ref="primitiveElement" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>