<script>
import { mergeProps, } from 'vue';
import { createContext } from '@/modules/shared';
export const ClientCardPhoneListProps = mergeProps(ListGroupRootProps, {

})

export const [injectClientCardPhoneListContext, provideClientCardPhoneListContext]
  = createContext('ClientCardPhoneList')
</script>
<script setup>
import { injectClientCardRootContext } from '../ClientCardRoot.vue'
import {
    default as ListGroupRoot,
    ListGroupRootProps
} from '@/components/Core/ListGroup/ListGroupRoot';
const rootContext = injectClientCardRootContext()
defineProps(ClientCardPhoneListProps)


defineEmits([]);


provideClientCardPhoneListContext({});


</script>
<template>
    <ListGroupRoot :as-child="asChild" :as="as">
        <slot :phone="rootContext.getClient().contact_info?.phone" />
    </ListGroupRoot>
</template>