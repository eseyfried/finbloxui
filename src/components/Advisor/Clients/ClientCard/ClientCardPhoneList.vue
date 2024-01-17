<script>
import { mergeProps, } from 'vue';
import { PrimitiveProps } from '@/components/Core/Primitive';
import { createContext } from '@/modules/shared';
export const ClientCardPhoneListProps = mergeProps(PrimitiveProps, {

})

export const [injectClientCardPhoneListContext, provideClientCardPhoneListContext]
  = createContext('ClientCardPhoneList')
</script>
<script setup>
import { injectClientCardRootContext } from './ClientCardRoot.vue'
import {
    ListGroupRoot
} from '@/components/Core/ListGroup/';
const rootContext = injectClientCardRootContext()
const props = defineProps(ClientCardPhoneListProps)


const emit = defineEmits([]);


provideClientCardPhoneListContext({});


</script>
<template>
    <ListGroupRoot :as-child="asChild" :as="as">
        <slot :phone="rootContext.getClient().contact_info?.phone" />
    </ListGroupRoot>
</template>