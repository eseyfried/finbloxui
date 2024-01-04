import { unrefElement } from '@vueuse/core'
import {
  inject,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  provide,
  ref,
  watch,
} from 'vue'

const ITEM_DATA_ATTR = 'data-fb-vue-collection-item'


/**
 * Composables for provide/inject collections
 * @param key (optional) Name to replace the default `Symbol()` as provide's key
 * @param name (optional) Name to replace the default `ITEM_DATA_ATTR` for the item's attirbutes
*/
export function useCollection(key, name = ITEM_DATA_ATTR) {
  const COLLECTION_SYMBOL = key ?? (Symbol())

  const createCollection = (sourceRef) => {
    const items = ref([]) // ref<HTMLElement[]> is causing type inference issue

    function setCollection() {
      const sourceEl = unrefElement(sourceRef)
      if (!sourceEl)
        return (items.value = [])

      return (items.value = Array.from(
        sourceEl.querySelectorAll(`[${name}]:not([data-disabled=true])`),
      ))
    }

    onBeforeUpdate(() => {
      items.value = []
    })

    onMounted(setCollection)
    onUpdated(setCollection)

    watch(() => sourceRef?.value, setCollection, { immediate: true })

    provide(COLLECTION_SYMBOL, items)

    return items
  }

  const injectCollection = () => {
    return inject(COLLECTION_SYMBOL, ref([]))
  }

  return { createCollection, injectCollection }
}