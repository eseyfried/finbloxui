<script>
import { mergeProps } from 'vue';
import { createContext } from '@/modules/shared';
export const ClientCardDataListProps = mergeProps(ListGroupRootProps, {

})

export const [injectClientCardDataListContext, provideClientCardDataListContext]
  = createContext('ClientCardDataList')
</script>
<script setup>
import { injectClientCardRootContext } from '../ClientCardRoot.vue'
import {
    default as ListGroupRoot,
    ListGroupRootProps
} from '@/components/Core/ListGroup/ListGroupRoot';
const rootContext = injectClientCardRootContext()
defineProps(ClientCardDataListProps)

provideClientCardDataListContext({});


</script>
<template>
    <ListGroupRoot
        :as-child="asChild" :as="as" 
        v-if="rootContext.showStats"
    >
        <slot :data="rootContext.getClient().stats" />
    </ListGroupRoot>
</template>