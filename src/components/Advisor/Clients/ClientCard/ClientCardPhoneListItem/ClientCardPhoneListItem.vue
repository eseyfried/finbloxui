<script setup>
import { mergeProps } from "vue";
import {
    default as ListGroupItem,
    ListGroupItemProps
} from '@/components/Core/ListGroup/ListGroupItem';

defineProps(mergeProps(ListGroupItemProps, {}))

</script>
<template>
 <ListGroupItem :as="as">
    <slot />
 </ListGroupItem>
</template>