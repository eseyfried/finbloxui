<template>
    <Primitive
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        :class="['fb-client-list-item-name', componentClasses.getClassByType('component')]"
    >
        <slot :client="getClient">
            {{ getClient?.name.first_name }} {{ getClient?.name.last_name }}
        </slot>
    </Primitive>
</template>
<script setup>
import { mergeProps } from "vue";
import { injectClientListRootContext } from '../ClientListRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'
import * as componentClasses from "@/modules/useCommonCSS";

const props = defineProps(mergeProps(PrimitiveProps, {
    as: {
        type: String,
        default: "h2"
    },
    client: {
        type: Object
    },
    index: {
        type: Number,
        desc: "The indexed position of the client object in the clients array"
    }
}))
const rootContext = injectClientListRootContext()
const getClient = rootContext.getClient(props.client, props.index)
</script>