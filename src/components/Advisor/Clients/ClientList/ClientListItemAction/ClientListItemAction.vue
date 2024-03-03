<template>
    <Primitive
        ref="primitiveElement"
        :as-child="asChild"
        :as="as"
        :class="['fb-client-list-item-action', componentClasses.getClassByType('component')]"
        @click.prevent="rootContext.emitClientItemClick(index)"
    >
        <slot>
            {{ actionLabel }}
        </slot>
    </Primitive>
</template>
<script>
export const ClientListItemActionProps = mergeProps(PrimitiveProps, {
    as: {
        type: String,
        default: "a"
    },
    client: {
        type: Object
    },
    index: {
        type: Number
    },
    actionLabel: {
        type: String,
        default: "Show More"
    }
})
</script>
<script setup>
import { mergeProps } from "vue";
import { injectClientListRootContext } from '../ClientListRoot.vue'
import { Primitive, PrimitiveProps } from '@/components/Core/Primitive/Primitive'
import * as componentClasses from "@/modules/useCommonCSS";

const props = defineProps(ClientListItemActionProps)

const rootContext = injectClientListRootContext()

</script>