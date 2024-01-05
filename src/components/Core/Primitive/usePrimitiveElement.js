import { unrefElement } from '@vueuse/core'
import { computed, ref, toRaw, getCurrentInstance, onMounted } from 'vue'


export function usePrimitiveElement() {
    const currentInstance = ref()
    // const primitiveElement = ref()
    onMounted(() => {
        const instance = getCurrentInstance()
        currentInstance.value = instance
    })

  const primitiveElement = computed(() => {
    if(toRaw(currentInstance)?.isMounted) {
        return toRaw(currentInstance)
    } else {
        return null
    }
  })

  
  const currentElement = computed(() => {
        return ['#text', '#comment'].includes(primitiveElement.value?.el.nodeName) ? primitiveElement.value?.el.nextElementSibling : unrefElement(primitiveElement)
        // const primitiveElement = toRaw(currentInstance)
        // return ['#text', '#comment'].includes(primitiveElement.value?.vnode.el.nodeName) ? primitiveElement.value?.vnode.el.nextElementSibling : unrefElement(primitiveElement.value?.vnode.el)
  })

  

  return {
    primitiveElement,
    currentElement,
  }
}