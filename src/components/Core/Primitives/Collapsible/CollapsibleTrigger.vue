<script setup>
import { Primitive, PrimitiveProps } from '@/components/Core/Primitives/Primitive'
import { injectCollapsibleRootContext } from './CollapsibleRoot.vue';
import { mergeProps } from "vue";

const props = defineProps(mergeProps(PrimitiveProps, {
    as: {
        type: String,
        default: "button"
    }
}))

const rootContext = injectCollapsibleRootContext()
</script>

<template>
  <Primitive
    :type="as === 'button' ? 'button' : undefined"
    :as="as"
    :as-child="props.asChild"
    :aria-controls="rootContext.contentId"
    :aria-expanded="rootContext.open.value"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    :data-disabled="rootContext.disabled?.value ? '' : undefined"
    :disabled="rootContext.disabled?.value"
    @click="rootContext.onOpenToggle"
  >
    <slot />
  </Primitive>
</template>