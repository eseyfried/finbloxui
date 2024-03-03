<script>
import { createContext, useDirection } from '@/modules/shared'

export const MenuProps = {
    open: {
        type: Boolean,
        default: false
    },
    onOpenChange: {
        type: Function,
        default: () => null
    },
    dir: {
        type: String,
        default: null
    },
    modal: {
        type: Boolean,
        default: true
    }
}

export const [injectMenuContext, provideMenuContext]
  = createContext(['MenuRoot', 'MenuSub'], 'MenuContext')

export const [injectMenuRootContext, provideMenuRootContext]
  = createContext('MenuRoot')
</script>

<script setup lang="ts">
import {
  ref,
  toRefs,
  watchEffect,
} from 'vue'
import { isClient } from '@vueuse/shared'
import { useVModel } from '@vueuse/core'
import { PopperRoot } from '@/components/Core/Primitives/Popper'

const props = defineProps(MenuProps)
const emits = defineEmits(['update:open'])
const { modal, dir: propDir } = toRefs(props)
const dir = useDirection(propDir)

const open = useVModel(props, 'open', emits)

const content = ref()
const isUsingKeyboardRef = ref(false)

watchEffect((cleanupFn) => {
  if (!isClient)
    return
  // Capture phase ensures we set the boolean before any side effects execute
  // in response to the key or pointer event as they might depend on this value.
  const handleKeyDown = () => {
    isUsingKeyboardRef.value = true
    document.addEventListener('pointerdown', handlePointer, {
      capture: true,
      once: true,
    })
    document.addEventListener('pointermove', handlePointer, {
      capture: true,
      once: true,
    })
  }
  const handlePointer = () => (isUsingKeyboardRef.value = false)
  document.addEventListener('keydown', handleKeyDown, { capture: true })

  cleanupFn(() => {
    document.removeEventListener('keydown', handleKeyDown, { capture: true })
    document.removeEventListener('pointerdown', handlePointer, {
      capture: true,
    })
    document.removeEventListener('pointermove', handlePointer, {
      capture: true,
    })
  })
})

provideMenuContext({
  open,
  onOpenChange: (value) => {
    open.value = value
  },
  content,
  onContentChange: (element) => {
    content.value = element
  },
})

provideMenuRootContext({
  onClose: () => {
    open.value = false
  },
  isUsingKeyboardRef,
  dir,
  modal,
})
</script>

<template>
  <PopperRoot>
    <slot />
  </PopperRoot>
</template>