import { injectConfigProviderContext } from '@/components/Core/Primitives/ConfigProvider/ConfigProvider.vue'
import { ref, computed } from 'vue'

export function useDirection(dir = ref('ltr')) {
  const context = injectConfigProviderContext({
    dir: dir.value,
  })
  return computed(() => dir.value || context.dir?.value || 'ltr')
}