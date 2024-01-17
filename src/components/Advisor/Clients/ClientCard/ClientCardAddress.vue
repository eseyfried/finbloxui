<script setup>
import { mergeProps } from "vue";
import { injectClientCardRootContext } from './ClientCardRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/'

defineProps(mergeProps(PrimitiveProps, {
  as: {
    type: String,
    default: "address"
  }
}))
const rootContext = injectClientCardRootContext()
</script>
<template>
 <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
    <slot :address="rootContext.getClient().contact_info?.address">
        <p>
            {{ rootContext.getClient().contact_info?.address.street_1 }}
        </p>
        <p
            v-if="rootContext.getClient().contact_info?.address.street_2"
        >
            {{ rootContext.getClient().contact_info?.address.street_2 }}
        </p>
        <p>
            <span>
                {{ rootContext.getClient().contact_info?.address.city }},
            </span>
            <span>
                {{ rootContext.getClient().contact_info?.address.state }}
            </span>
            <span>
                {{ rootContext.getClient().contact_info?.address.postal_code }}
            </span>
        </p>
    </slot>
 </Primitive>
</template>