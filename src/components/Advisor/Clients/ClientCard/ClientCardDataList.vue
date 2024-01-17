<script>
import { mergeProps } from 'vue';
import { PrimitiveProps } from '@/components/Core/Primitive';
import { createContext } from '@/modules/shared';
export const ClientCardDataListProps = mergeProps(PrimitiveProps, {

})

export const [injectClientCardDataListContext, provideClientCardDataListContext]
  = createContext('ClientCardDataList')
</script>
<script setup>
import { injectClientCardRootContext } from './ClientCardRoot.vue'
import {
    ListGroupRoot
} from '@/components/Core/ListGroup/';
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