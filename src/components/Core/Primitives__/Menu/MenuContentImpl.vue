<script>
import { ref } from 'vue'
import {
  GraceIntent,
  Side,
} from './utils'
import { FocusScopeProps } from '@/components/Core/Primitives/FocusScope'
import { RovingFocusGroupEmits } from '@/components/Core/Primitives/RovingFocus'
import {
  DismissableLayerEmits,
  DismissableLayerProps,
} from '@/components/Core/Primitives/DismissableLayer'
import { PopperContentProps } from '@/components/Core/Primitives/Popper'

import {
  createContext,
  useArrowNavigation,
  useBodyScrollLock,
  useCollection,
  useFocusGuards,
  useTypeahead,
} from '@/modles/shared'


export const [injectMenuContentContext, provideMenuContentContext]
  = createContext('MenuContent')

export const MenuContentImplPrivateProps = {
  disableOutsidePointerEvents: {
    type: Boolean,
    default: DismissableLayerProps['disableOutsidePointerEvents']
  },

  /**
   * Whether scrolling outside the `MenuContent` should be prevented
   * (default: `false`)
   */
  disableOutsideScroll: {
    type: Boolean,
    default: false
  },

  /**
   * Whether focus should be trapped within the `MenuContent`
   * (default: false)
   */
  trapFocus: {
    type: Boolean,
    default: FocusScopeProps['trapped']
  }
}

export const MenuContentImplEmits = mergeProps(DismissableLayerEmits, [
  'openAutoFocus'
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  'closeAutoFocus'
])

export const MenuContentImplProps = mergeProps(MenuContentImplPrivateProps, {
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop: {
    type: Boolean,
    default: false
  }
})

export const MenuRootContentProps = mergeProps(PopperContentProps, {
    /**
     * Whether keyboard navigation should loop around
     * @defaultValue false
     */
    loop: {
        type: Boolean,
        default: false
    }
})
 
</script>

<script setup>
import {
  onUnmounted,
  ref,
  toRefs,
  watch,
} from 'vue'
import { injectMenuContext, injectMenuRootContext } from './MenuRoot.vue'
import {
  FIRST_LAST_KEYS,
  LAST_KEYS,
  focusFirst,
  getOpenState,
  isMouseEvent,
  isPointerInGraceArea,
} from './utils'
import { FocusScope } from '@/components/Core/Primitives/FocusScope'
import { DismissableLayer } from '@/components/Core/Primitives/DismissableLayer'
import {
  PopperContent,
  PopperContentPropsDefaultValue,
} from '@/components/Core/Primitives/Popper'
import { usePrimitiveElement } from '@/components/Core/Primitives/Primitive'
import { RovingFocusGroup } from '@/components/Core/Primitives/RovingFocus'

const props = defineProps(mergeProps(MenuContentImplProps, {
  ...PopperContentPropsDefaultValue
}))
const emits = defineEmits(MenuContentImplEmits)
const menuContext = injectMenuContext()
const rootContext = injectMenuRootContext()

const { trapFocus, disableOutsidePointerEvents, loop } = toRefs(props)

useFocusGuards()
useBodyScrollLock(disableOutsidePointerEvents.value)

const searchRef = ref('')
const timerRef = ref(0)
const pointerGraceTimerRef = ref(0)
const pointerGraceIntentRef = ref(null)
const pointerDirRef = ref('right')
const lastPointerXRef = ref(0)
const currentItemId = ref(null)

const { createCollection } = useCollection()
const { primitiveElement, currentElement: contentElement }
  = usePrimitiveElement()
const collectionItems = createCollection(contentElement)

watch(contentElement, (el) => {
  menuContext.onContentChange(el)
})

const { handleTypeaheadSearch } = useTypeahead(collectionItems)

onUnmounted(() => {
  window.clearTimeout(timerRef.value)
})

function isPointerMovingToSubmenu(event) {
  const isMovingTowards
    = pointerDirRef.value === pointerGraceIntentRef.value?.side

  return (
    isMovingTowards
    && isPointerInGraceArea(event, pointerGraceIntentRef.value?.area)
  )
}

async function handleMountAutoFocus(event) {
  emits('openAutoFocus', event)
  if (event.defaultPrevented)
    return
  // when opening, explicitly focus the content area only and leave
  // `onEntryFocus` in  control of focusing first item
  event.preventDefault()
  contentElement.value?.focus()
}

function handleKeyDown(event) {
  if (event.defaultPrevented)
    return
  // submenu key events bubble through portals. We only care about keys in this menu.
  const target = event.target
  const isKeyDownInside
    = target.closest('[data-radix-menu-content]') === event.currentTarget
  const isModifierKey = event.ctrlKey || event.altKey || event.metaKey
  const isCharacterKey = event.key.length === 1

  const el = useArrowNavigation(
    event,
    document.activeElement,
    contentElement.value,
    {
      loop: loop.value,
      arrowKeyOptions: 'vertical',
      dir: rootContext?.dir.value,
      focus: true,
    },
  )
  if (el)
    return el?.focus()

  // prevent "Space" taken account into handleTypeahead
  if (event.code === 'Space')
    return

  if (isKeyDownInside) {
    // menus should not be navigated using tab key so we prevent it
    if (event.key === 'Tab')
      event.preventDefault()
    if (!isModifierKey && isCharacterKey)
      handleTypeaheadSearch(event.key)
  }

  // focus first/last item based on key pressed
  if (event.target !== contentElement.value)
    return
  if (!FIRST_LAST_KEYS.includes(event.key))
    return
  event.preventDefault()
  const candidateNodes = collectionItems.value
  if (LAST_KEYS.includes(event.key))
    candidateNodes.reverse()
  focusFirst(candidateNodes)
}

function handleBlur(event) {
  // clear search buffer when leaving the menu
  // @ts-expect-error the provided currentTarget and target should be HTMLElement
  if (!event?.currentTarget?.contains?.(event.target)) {
    window.clearTimeout(timerRef.value)
    searchRef.value = ''
  }
}

function handlePointerMove(event) {
  if (!isMouseEvent(event))
    return
  const target = event.target
  const pointerXHasChanged = lastPointerXRef.value !== event.clientX

  // We don't use `event.movementX` for this check because Safari will
  // always return `0` on a pointer event.
  if (
    (event?.currentTarget)?.contains(target)
    && pointerXHasChanged
  ) {
    const newDir = event.clientX > lastPointerXRef.value ? 'right' : 'left'
    pointerDirRef.value = newDir
    lastPointerXRef.value = event.clientX
  }
}

provideMenuContentContext({
  onItemEnter: (event) => {
    // event.preventDefault() we can't prevent pointerMove event
    if (isPointerMovingToSubmenu(event))
      return true
    else
      return false
  },
  onItemLeave: (event) => {
    if (isPointerMovingToSubmenu(event))
      return
    contentElement.value?.focus()
    currentItemId.value = null
  },
  onTriggerLeave: (event) => {
    // event.preventDefault() we can't prevent pointerLeave event
    if (isPointerMovingToSubmenu(event))
      return true
    else
      return false
  },
  searchRef,
  pointerGraceTimerRef,
  onPointerGraceIntentChange: (intent) => {
    pointerGraceIntentRef.value = intent
  },
})
</script>

<template>
  <FocusScope
    as-child
    :trapped="trapFocus"
    @mount-auto-focus="handleMountAutoFocus"
    @unmount-auto-focus="emits('closeAutoFocus', $event)"
  >
    <DismissableLayer
      as-child
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      @escape-key-down="emits('escapeKeyDown', $event)"
      @pointer-down-outside="emits('pointerDownOutside', $event)"
      @focus-outside="emits('focusOutside', $event)"
      @interact-outside="emits('interactOutside', $event)"
      @dismiss="emits('dismiss')"
    >
      <RovingFocusGroup
        v-model:current-tab-stop-id="currentItemId"
        as-child
        orientation="vertical"
        :dir="rootContext.dir.value"
        :loop="loop"
        @entry-focus="(event) => {
          emits('entryFocus', event)
          // only focus first item when using keyboard
          if (!rootContext.isUsingKeyboardRef.value) event.preventDefault();
        }"
      >
        <PopperContent
          ref="primitiveElement"
          role="menu"
          :as="as"
          :as-child="asChild"
          aria-orientation="vertical"
          data-radix-menu-content
          :data-state="getOpenState(menuContext.open.value)"
          :dir="rootContext.dir.value"
          :side="side"
          :side-offset="sideOffset"
          :align="align"
          :align-offset="alignOffset"
          :avoid-collisions="avoidCollisions"
          :collision-boundary="collisionBoundary"
          :collision-padding="collisionPadding"
          :arrow-padding="arrowPadding"
          :sticky="sticky"
          :hide-when-detached="hideWhenDetached"
          @keydown="handleKeyDown"
          @blur="handleBlur"
          @pointermove="handlePointerMove"
        >
          <slot />
        </PopperContent>
      </RovingFocusGroup>
    </DismissableLayer>
  </FocusScope>
</template>