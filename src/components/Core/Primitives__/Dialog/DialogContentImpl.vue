<script>
import { mergeProps } from "vue";
import {
  DismissableLayerEmits,
  DismissableLayerProps,
} from '@/components/Core/Primitives/DismissableLayer/DismissableLayer'

export const DialogContentImplEmits = [
    ...DismissableLayerEmits,
    /**
     * Event handler called when auto-focusing on open.
     * Can be prevented.
     */
    'openAutoFocus',
    /**
     * Event handler called when auto-focusing on close.
     * Can be prevented.
     */
    'closeAutoFocus'
]

export const DialogContentImplProps = mergeProps(DismissableLayerProps, {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling transntion with Vue native transition or other animation libraries.
   */
  forceMount: {
    type: Boolean,
    default: false
  },
  /**
   * When `true`, focus cannot escape the `Content` via keyboard,
   * pointer, or a programmatic focus.
   * @defaultValue false
   */
  trapFocus: {
    type: Boolean,
    default: false
  } 
})
</script>

<script setup>
import { injectDialogRootContext } from './DialogRoot.vue'
import { DismissableLayer } from '@/components/Core/Primitives/DismissableLayer'
import { FocusScope } from '@/components/Core/Primitives/FocusScope'
import { getOpenState } from '@/components/Core/Primitives/Menu/utils'
import { useWarning } from './utils'
import { usePrimitiveElement } from '@/components/Core/Primitives/Primitive'
import { onMounted } from 'vue'

const props = defineProps(DialogContentImplProps)
const emits = defineEmits(DialogContentImplEmits)

const rootContext = injectDialogRootContext()
const { primitiveElement, currentElement: contentElement } = usePrimitiveElement()

onMounted(() => {
  rootContext.contentElement = contentElement
})

if (import.meta.env.NODE_ENV !== 'production')
  useWarning()
</script>

<template>
  <FocusScope
    as-child
    loop
    :trapped="props.trapFocus"
    @mount-auto-focus="emits('openAutoFocus', $event)"
    @unmount-auto-focus="emits('closeAutoFocus', $event)"
  >
    <DismissableLayer
      :id="rootContext.contentId"
      ref="primitiveElement"
      :as="as"
      :as-child="asChild"
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      role="dialog"
      :aria-describedby="rootContext.descriptionId"
      :aria-labelledby="rootContext.titleId"
      :data-state="getOpenState(rootContext.open.value)"
      v-bind="$attrs"
      @dismiss="rootContext.onOpenChange(false)"
      @escape-key-down="emits('escapeKeyDown', $event)"
      @focus-outside="emits('focusOutside', $event)"
      @interact-outside="emits('interactOutside', $event)"
      @pointer-down-outside="emits('pointerDownOutside', $event)"
    >
      <slot />
    </DismissableLayer>
  </FocusScope>
</template>