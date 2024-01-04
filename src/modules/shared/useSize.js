import { unrefElement } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'

export function useSize(element) {
  const size = ref({width: 0, height: 0})
  const width = computed(() => size.value?.width ?? 0)
  const height = computed(() => size.value?.height ?? 0)

  onMounted(() => {
    const el = unrefElement(element)
    if (el) {
      // provide size as early as possible
      size.value = { width: el.offsetWidth, height: el.offsetHeight }

      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries))
          return

        // Since we only observe the one element, we don't need to loop over the
        // array
        if (!entries.length)
          return

        const entry = entries[0]
        let width
        let height

        if ('borderBoxSize' in entry) {
          const borderSizeEntry = entry.borderBoxSize
          // iron out differences between browsers
          const borderSize = Array.isArray(borderSizeEntry)
            ? borderSizeEntry[0]
            : borderSizeEntry
          width = borderSize.inlineSize
          height = borderSize.blockSize
        }
        else {
          // for browsers that don't support `borderBoxSize`
          // we calculate it ourselves to get the correct border box.
          width = el.offsetWidth
          height = el.offsetHeight
        }

        // temporary disable width/height from resize observer. borderSizeEntry seems to be incorrect
        size.value = { width, height }
      })

      resizeObserver.observe(el, { box: 'border-box' })

      return () => resizeObserver.unobserve(el)
    }
    else {
      // We only want to reset to `undefined` when the element becomes `null`,
      // not if it changes to another element.
      size.value = undefined
    }
  })

  return {
    width,
    height,
  }
}