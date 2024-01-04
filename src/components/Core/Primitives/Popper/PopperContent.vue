<script>
import { ref, mergeProps } from 'vue'
import { PrimitiveProps } from '@/components/Core/Primitives/Primitive/Primitive'
import { createContext, useForwardRef, useSize } from '@/modules/shared'


export const PopperContentProps = mergeProps(PrimitiveProps, {
  /**
   * The preferred side of the trigger to render against when open.
   * Will be reversed when collisions occur and avoidCollisions
   * is enabled.
   *
   * @default "bottom"
   */
  side: {
    type: String,
    default: 'bottom'
  },

  /**
   * The distance in pixels from the trigger.
   *
   * @default 0
   */
  sideOffset: {
    type: Number,
    default: 0
  },

  /**
   * The preferred alignment against the trigger.
   * May change when collisions occur.
   *
   * @default "center"
   */
  align: {
    type: String,
    default: 'center'
  },

  /**
   * An offset in pixels from the "start" or "end" alignment options.
   *
   * @default 0
   */
  alignOffset: {
    type: Number,
    default: 0
  },

  /**
   * When true, overrides the side andalign preferences
   * to prevent collisions with boundary edges.
   *
   * @default true
   */
  avoidCollisions: {
    type: Boolean,
    default: true
  },

  /**
   * The element used as the collision boundary. By default
   * this is the viewport, though you can provide additional
   * element(s) to be included in this check.
   *
   * @default []
   */
  collisionBoundary: {
    type: Array,
    default: []
  },

  /**
   * The distance in pixels from the boundary edges where collision
   * detection should occur. Accepts a number (same for all sides),
   * or a partial padding object, for example: { top: 20, left: 20 }.
   *
   * @default 0
   */
  collisionPadding: {
    type: Number,
    default: 0
  },

  /**
   * The padding between the arrow and the edges of the content.
   * If your content has border-radius, this will prevent it from
   * overflowing the corners.
   *
   * @default 0
   */
  arrowPadding: {
    type: Number,
    default: 0
  },

  /**
   * The sticky behavior on the align axis. "partial" will keep the
   * content in the boundary as long as the trigger is at least partially
   * in the boundary whilst "always" will keep the content in the boundary
   * regardless.
   *
   * @default "partial"
   */
  sticky: {
    type: String,
    default: 'partial'
  },

  /**
   * Whether to hide the content when the trigger becomes fully occluded.
   *
   * @default false
   */
  hideWhenDetached: {
    type: Boolean,
    default: false
  },
  /**
   * 'optimized' | 'always'
   */
  updatePositionStrategy: {
    type: String,
    default: 'optimized'
  },
  onPlaced: {
    type: Array,
    default: []
  },
  prioritizePosition: {
    type: Boolean,
    default: false
  }
})



export const [injectPopperContentContext, providePopperContentContext]
  = createContext('PopperContent')
</script>

<script setup>
import { computed, watchEffect } from 'vue'
import { computedEager } from '@vueuse/core'
import {
  autoUpdate,
  flip,
  arrow as floatingUIarrow,
  hide,
  limitShift,
  offset,
  shift,
  size,
  useFloating,
} from '@floating-ui/vue'
import { injectPopperRootContext } from './PopperRoot.vue'
import {
  getSideAndAlignFromPlacement,
  isNotNull,
  transformOrigin,
} from './utils'
import {
  Primitive,
  usePrimitiveElement,
} from '@/components/Core/Primitives/Primitive'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps(PopperContentProps)
const rootContext = injectPopperRootContext()

const forwardRef = useForwardRef()
const { primitiveElement, currentElement: contentElement }
  = usePrimitiveElement()

const floatingRef = ref()

const arrow = ref()
const { width: arrowWidth, height: arrowHeight } = useSize(arrow)

const desiredPlacement = computed(
  () =>
    (props.side
      + (props.align !== 'center' ? `-${props.align}` : '')),
)

const collisionPadding = computed(() => {
  return typeof props.collisionPadding === 'number'
    ? props.collisionPadding
    : { top: 0, right: 0, bottom: 0, left: 0, ...props.collisionPadding }
})

const boundary = computed(() => {
  return Array.isArray(props.collisionBoundary)
    ? props.collisionBoundary
    : [props.collisionBoundary]
})

const detectOverflowOptions = computed(() => {
  return {
    padding: collisionPadding.value,
    boundary: boundary.value.filter(isNotNull),
    // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
    altBoundary: boundary.value.length > 0,
  }
})

const computedMiddleware = computedEager(() => {
  return [
    offset({
      mainAxis: props.sideOffset + arrowHeight.value,
      alignmentAxis: props.alignOffset,
    }),
    props.avoidCollisions
      && shift({
        mainAxis: true,
        crossAxis: !!props.prioritizePosition,
        limiter: props.sticky === 'partial' ? limitShift() : undefined,
        ...detectOverflowOptions.value,
      }),
    !props.prioritizePosition
      && props.avoidCollisions
      && flip({
        ...detectOverflowOptions.value,
      }),
    size({
      ...detectOverflowOptions.value,
      apply: ({ elements, rects, availableWidth, availableHeight }) => {
        const { width: anchorWidth, height: anchorHeight } = rects.reference
        const contentStyle = elements.floating.style
        Object.assign(elements.floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`,
        })
        contentStyle.setProperty(
          '--fb-popper-available-width',
          `${availableWidth}px`,
        )
        contentStyle.setProperty(
          '--fb-popper-available-height',
          `${availableHeight}px`,
        )
        contentStyle.setProperty(
          '--fb-popper-anchor-width',
          `${anchorWidth}px`,
        )
        contentStyle.setProperty(
          '--fb-popper-anchor-height',
          `${anchorHeight}px`,
        )
      },
    }),
    arrow.value
      && floatingUIarrow({ element: arrow.value, padding: props.arrowPadding }),
    transformOrigin({
      arrowWidth: arrowWidth.value,
      arrowHeight: arrowHeight.value,
    }),
    props.hideWhenDetached
      && hide({ strategy: 'referenceHidden', ...detectOverflowOptions.value }),
  ]
})

const { floatingStyles, placement, isPositioned, middlewareData } = useFloating(
  rootContext.anchor,
  floatingRef,
  {
    strategy: 'fixed',
    placement: desiredPlacement,
    whileElementsMounted: (...args) => {
      const cleanup = autoUpdate(...args, {
        animationFrame: props.updatePositionStrategy === 'always',
      })
      return cleanup
    },
    middleware: computedMiddleware,
  },
)

const placedSide = computed(
  () => getSideAndAlignFromPlacement(placement.value)[0],
)
const placedAlign = computed(
  () => getSideAndAlignFromPlacement(placement.value)[1],
)

watchEffect(() => {
  if (isPositioned.value)
    props.onPlaced?.()
})

const cannotCenterArrow = computed(
  () => middlewareData.value.arrow?.centerOffset !== 0,
)

const contentZIndex = ref('')
watchEffect(() => {
  if (contentElement.value)
    contentZIndex.value = window.getComputedStyle(contentElement.value).zIndex
})

const arrowX = computed(() => middlewareData.value.arrow?.x ?? 0)
const arrowY = computed(() => middlewareData.value.arrow?.y ?? 0)

providePopperContentContext({
  placedSide,
  onArrowChange: element => arrow.value = element,
  arrowX,
  arrowY,
  shouldHideArrow: cannotCenterArrow,
})

defineExpose({
  $el: contentElement,
})
</script>

<template>
  <div
    ref="floatingRef"
    data-fb-popper-content-wrapper=""
    :style="{
      ...floatingStyles,
      transform: isPositioned ? floatingStyles.transform : 'translate(0, -200%)', // keep off the page when measuring
      minWidth: 'max-content',
      zIndex: contentZIndex,
      ['--fb-popper-transform-origin']: [
        middlewareData.transformOrigin?.x,
        middlewareData.transformOrigin?.y,
      ].join(' '),
    }"
  >
    <Primitive
      :ref="vnode => {
        forwardRef(vnode)
        primitiveElement = vnode
      }"
      v-bind="$attrs"
      :as-child="props.asChild"
      :as="as"
      :data-side="placedSide"
      :data-align="placedAlign"
      :style="{
        // if the PopperContent hasn't been placed yet (not all measurements done)
        // we prevent animations so that users's animation don't kick in too early referring wrong sides
        animation: !isPositioned ? 'none' : undefined,
        // hide the content if using the hide middleware and should be hidden
        opacity: middlewareData.hide?.referenceHidden ? 0 : undefined,
      }"
    >
      <slot />
    </Primitive>
  </div>
</template>