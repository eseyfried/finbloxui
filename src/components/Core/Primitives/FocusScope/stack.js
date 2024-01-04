import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'


const useFocusStackState = createGlobalState(() => {
  const stack = ref([])
  return stack
})

export function createFocusScopesStack() {
  /** A stack of focus scopes, with the active one at the top */
  const stack = useFocusStackState()

  return {
    add(focusScope) {
      // pause the currently active focus scope (at the top of the stack)
      const activeFocusScope = stack.value[0]
      if (focusScope !== activeFocusScope)
        activeFocusScope?.pause()

      // remove in case it already exists (because we'll re-add it at the top of the stack)
      stack.value = arrayRemove(stack.value, focusScope)
      stack.value.unshift(focusScope)
    },

    remove(focusScope) {
      stack.value = arrayRemove(stack.value, focusScope)
      stack.value[0]?.resume()
    },
  }
}

export function arrayRemove(array, item) {
  const updatedArray = [...array]
  const index = updatedArray.indexOf(item)
  if (index !== -1)
    updatedArray.splice(index, 1)

  return updatedArray
}

export function removeLinks(items) {
  return items.filter(item => item.tagName !== 'A')
}