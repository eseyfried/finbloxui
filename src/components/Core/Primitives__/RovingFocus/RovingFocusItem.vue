<script>
import { mergeProps } from "vue"
import { PrimitiveProps } from '@/components/Core/Primitives/Primitive'

export const RovingFocusItemProps = mergeProps(PrimitiveProps, {
  tabStopId: {
    type: String,
    default: undefined
  },
  focusable: {
    type: Boolean,
    default: true
  },
  active: {
    type: Boolean,
    default: true
  },
  as: {
    type: String,
    default: 'span'
  }
})
</script>

<script setup>
import { computed, nextTick, onMounted, onUnmounted } from 'vue'
import { injectRovingFocusGroupContext } from './RovingFocusGroup.vue'
import { Primitive } from '@/components/Core/Primitives/Primitive'
import { focusFirst, getFocusIntent, wrapArray } from './utils'
import { useCollection, useId } from '@/modules/shared'

const props = defineProps(RovingFocusItemProps)

const context = injectRovingFocusGroupContext()
const autoId = useId()
const id = computed(() => props.tabStopId || autoId)
const isCurrentTabStop = computed(
  () => context.currentTabStopId.value === id.value,
)

const { injectCollection } = useCollection('rovingFocus')
const collections = injectCollection()

onMounted(() => {
  if (props.focusable)
    context.onFocusableItemAdd()
})
onUnmounted(() => {
  if (props.focusable)
    context.onFocusableItemRemove()
})

function handleKeydown(event) {
  if (event.key === 'Tab' && event.shiftKey) {
    context.onItemShiftTab()
    return
  }

  if (event.target !== event.currentTarget)
    return

  const focusIntent = getFocusIntent(
    event,
    context.orientation.value,
    context.dir.value,
  )

  if (focusIntent !== undefined) {
    event.preventDefault()
    let candidateNodes = [...collections.value]

    if (focusIntent === 'last') {
      candidateNodes.reverse()
    }
    else if (focusIntent === 'prev' || focusIntent === 'next') {
      if (focusIntent === 'prev')
        candidateNodes.reverse()
      const currentIndex = candidateNodes.indexOf(
        event.currentTarget,
      )

      candidateNodes = context.loop.value
        ? wrapArray(candidateNodes, currentIndex + 1)
        : candidateNodes.slice(currentIndex + 1)
    }

    nextTick(() => focusFirst(candidateNodes))
  }
}
</script>

<template>
  <Primitive
    data-radix-vue-collection-item
    :tabindex="isCurrentTabStop ? 0 : -1"
    :data-orientation="context.orientation.value"
    :data-active="active"
    :data-disabled="!focusable || undefined"
    :as="as"
    :as-child="asChild"
    @mousedown="
      (event) => {
        // We prevent focusing non-focusable items on `mousedown`.
        // Even though the item has tabIndex={-1}, that only means take it out of the tab order.
        if (!focusable) event.preventDefault();
        // Safari doesn't focus a button when clicked so we run our logic on mousedown also
        else context.onItemFocus(id);
      }
    "
    @focus="context.onItemFocus(id)"
    @keydown="handleKeydown"
  >
    <slot />
  </Primitive>
</template>