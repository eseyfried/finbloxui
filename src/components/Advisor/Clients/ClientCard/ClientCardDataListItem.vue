<script setup>
import { mergeProps } from "vue";
import {
    ListGroupItem, ListGroupItemProps
} from '@/components/Core/ListGroup/';


defineProps(mergeProps(ListGroupItemProps, {}))

</script>
<template>
 <ListGroupItem :as="as">
    <slot />
 </ListGroupItem>
</template>