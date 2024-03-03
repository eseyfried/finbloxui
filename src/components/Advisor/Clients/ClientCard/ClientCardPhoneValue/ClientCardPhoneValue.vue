<script setup>
import { mergeProps } from "vue";
import { injectClientCardRootContext } from '../ClientCardRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'

defineProps(mergeProps(PrimitiveProps, {
  as: {
    type: String,
    default: 'a'
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
    <Primitive
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        :href="`tel:${rootContext.getClient().contact_info?.phone[index].value}`"
        @click.prevent="rootContext.handlePhoneClick(rootContext.getClient().contact_info?.phone[index].value)"
    >
        <slot :phone="rootContext.getClient().contact_info?.phone[index].value">
            {{ rootContext.getClient().contact_info?.phone[index].value }}
        </slot>
    </Primitive>
</template>