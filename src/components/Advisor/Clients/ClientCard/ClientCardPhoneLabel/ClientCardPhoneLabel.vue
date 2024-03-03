<script setup>
import { mergeProps } from "vue";
import { injectClientCardRootContext } from '../ClientCardRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'

defineProps(mergeProps(PrimitiveProps, {
  as: {
    type: String,
    default: 'label'
  },
  index: {
    type: [String, Number],
    required: true,
    desc: "the index position to locate the record in the client phone array"
  }
}))
const rootContext = injectClientCardRootContext()
</script>
<template>
 <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
    <slot :label="rootContext.getClient().contact_info?.phone[index].label">
        <template v-if="index?.toString() && index !== null">
            {{ rootContext.getClient().contact_info.phone[index].label }}
        </template>
    </slot>
 </Primitive>
</template>