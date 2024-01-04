<script>
import { ref, mergeProps } from 'vue'
import { PrimitiveProps } from '@/components/Core/Primitives/Primitive'
import { createContext, useCollection, useDirection } from '@/modules/shared'

export const RovingFocusGroupProps = mergeProps(PrimitiveProps, {
  /**
   * The orientation of the group.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   */
  orientation: {
    type: String,
    default: undefined
  },
  /**
   * The direction of navigation between items.
   */
  dir: {
    type: String,
    default: null
  },
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop: {
    type: Boolean,
    default: false
  },
  currentTabStopId: {
    type: String,
    default: null
  },
  defaultCurrentTabStopId: {
    type: String,
    default: null
  }
})

export const RovingFocusGroupEmits = [
  'entryFocus',
  'update:currentTabStopId'
]


export const [injectRovingFocusGroupContext, provideRovingFocusGroupContext]
  = createContext('RovingFocusGroup')
</script>

<script setup>
import { toRefs } from 'vue'
import { useVModel } from '@vueuse/core'
import {
  Primitive,
  usePrimitiveElement,
} from '@/components/Core/Primitives/Primitive'
import {
  ENTRY_FOCUS,
  EVENT_OPTIONS,
  focusFirst,
} from './utils'

const props = defineProps(RovingFocusGroupProps)
const emits = defineEmits(RovingFocusGroupEmits)
const { loop, orientation, dir: propDir } = toRefs(props)
const dir = useDirection(propDir)
const currentTabStopId = useVModel(props, 'currentTabStopId', emits, {
  defaultValue: props.defaultCurrentTabStopId,
  passive: (props.currentTabStopId === undefined)
})
const isTabbingBackOut = ref(false)
const isClickFocus = ref(false)
const focusableItemsCount = ref(0)

const { primitiveElement, currentElement } = usePrimitiveElement()
const { createCollection } = useCollection('rovingFocus')
const collections = createCollection(currentElement)

function handleFocus(event) {
  // We normally wouldn't need this check, because we already check
  // that the focus is on the current target and not bubbling to it.
  // We do this because Safari doesn't focus buttons when clicked, and
  // instead, the wrapper will get focused and not through a bubbling event.
  const isKeyboardFocus = !isClickFocus.value

  if (
    event.currentTarget
    && event.target === event.currentTarget
    && isKeyboardFocus
    && !isTabbingBackOut.value
  ) {
    const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS)
    event.currentTarget.dispatchEvent(entryFocusEvent)
    emits('entryFocus', entryFocusEvent)

    if (!entryFocusEvent.defaultPrevented) {
      const items = collections.value
      const activeItem = items.find(item => item.getAttribute('data-active') === 'true')
      const currentItem = items.find(
        item => item.id === currentTabStopId.value,
      )
      const candidateItems = [activeItem, currentItem, ...items].filter(
        Boolean,
      )
      focusFirst(candidateItems)
    }
  }

  isClickFocus.value = false
}

provideRovingFocusGroupContext({
  loop,
  dir,
  orientation,
  currentTabStopId,
  onItemFocus: (tabStopId) => {
    currentTabStopId.value = tabStopId
  },
  onItemShiftTab: () => {
    isTabbingBackOut.value = true
  },
  onFocusableItemAdd: () => {
    focusableItemsCount.value++
  },
  onFocusableItemRemove: () => {
    focusableItemsCount.value--
  },
})
</script>

<template>
  <Primitive
    ref="primitiveElement"
    :tabindex="isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0"
    :data-orientation="orientation"
    :as="as"
    :as-child="asChild"
    :dir="dir"
    style="outline: none"
    @mousedown="isClickFocus = true"
    @focus="handleFocus"
    @blur="isTabbingBackOut = false"
  >
    <slot />
  </Primitive>
</template>