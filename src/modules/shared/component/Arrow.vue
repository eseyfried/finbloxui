<script>
import { mergeProps } from "vue"
import { PrimitiveProps } from '@/component/Core/Primitives/Primitive'

export const ArrowProps = mergeProps(PrimitiveProps, {
    as: {
        default: 'svg'
    },
  /**
   * The width of the arrow in pixels.
   *
   * @default 10
   */
  width: {
    type: Number,
    default: 10
  },
  /**
   * The height of the arrow in pixels.
   *
   * @default 5
   */
  height: {
    type: Number,
    default: 5
  }
})
</script>

<script setup>
import {
  Primitive,
  usePrimitiveElement,
} from '@/component/Core/Primitives/Primitive'

const props = defineProps(ArrowProps)

const { primitiveElement } = usePrimitiveElement()
</script>

<template>
  <Primitive
    ref="primitiveElement"
    v-bind="props"
    :width="width"
    :height="height"
    :viewBox="asChild ? undefined : '0 0 30 10'"
    :preserveAspectRatio="asChild ? undefined : 'none'"
  >
    <slot><polygon points="0,0 30,0 15,10" /></slot>
  </Primitive>
</template>