<script setup>
import { mergeProps } from "vue";
import {
    ListGroupItem
} from '@/components/Core/ListGroup/';
import { PrimitiveProps } from '@/components/Core/Primitive/Primitive'

defineProps(mergeProps(PrimitiveProps, {}))

</script>
<template>
 <ListGroupItem :as="as">
    <slot />
 </ListGroupItem>
</template>