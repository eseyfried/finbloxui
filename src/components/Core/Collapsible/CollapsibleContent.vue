<script setup>
import { mergeProps } from "vue";
import { Primitive, usePrimitiveElement, PrimitiveProps } from '@/components/Core/Primitive'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { injectCollapsibleRootContext } from './CollapsibleRoot.vue'
import { Presence } from '@/components/Core/Presence/'
import * as componentClasses from "@/modules/useCommonCSS";

defineOptions({
  inheritAttrs: false,
})

const props = defineProps(mergeProps(PrimitiveProps, {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with Vue animation libraries.
     */
    forceMount: {
        type: Boolean,
        default: false
    }
}))

const rootContext = injectCollapsibleRootContext()

const presentRef = ref();
const { primitiveElement, currentElement } = usePrimitiveElement()

const width = ref(0)
const height = ref(0)

// when opening we want it to immediately open to retrieve dimensions
// when closing we delay `present` to retrieve dimensions before closing
const isOpen = computed(() => rootContext.open.value)
const isMountAnimationPrevented = ref(isOpen.value)
const currentStyle = ref()

watch(
  () => [isOpen.value, presentRef.value?.present],
  async () => {
    await nextTick()
    const node = currentElement.value
    if (!node)
      return
    currentStyle.value = currentStyle.value || {
      transitionDuration: node.style.transitionDuration,
      animationName: node.style.animationName,
    }
    // block any animations/transitions so the element renders at its full dimensions
    node.style.transitionDuration = '0s'
    node.style.animationName = 'none'

    // get width and height from full dimensions
    const rect = node.getBoundingClientRect()
    height.value = rect.height
    width.value = rect.width

    // kick off any animations/transitions that were originally set up if it isn't the initial mount
    if (!isMountAnimationPrevented.value) {
      node.style.transitionDuration = currentStyle.value.transitionDuration
      node.style.animationName = currentStyle.value.animationName
    }
  },
  {
    immediate: true,
  },
)

onMounted(() => {
  requestAnimationFrame(() => {
    isMountAnimationPrevented.value = false
  })
})
</script>

<template>
  <Presence
    ref="presentRef"
    :present="forceMount || rootContext.open.value"
    :force-mount="true"
  >
    <Primitive
      v-bind="$attrs"
      :id="rootContext.contentId"
      ref="primitiveElement"
      :as-child="props.asChild"
      :as="as"
      :data-state="rootContext.open.value ? 'open' : 'closed'"
      :data-disabled="rootContext.disabled?.value ? 'true' : undefined"
      :hidden="!presentRef?.present"
      :style="{
        [`--fb-collapsible-content-height`]: `${height}px`,
        [`--fb-collapsible-content-width`]: `${width}px`,
      }"
      :class="['fb-collapsible-content', componentClasses.getClassByType('component')]"
    >
      <slot v-if="presentRef?.present" />
    </Primitive>
  </Presence>
</template>