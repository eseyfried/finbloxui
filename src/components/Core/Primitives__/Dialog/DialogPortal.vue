<script setup>
import { mergeProps } from "vue";
import { TeleportProps, TeleportPrimitive } from '@/components/Core/Primitives/Teleport'

const props = defineProps(mergeProps(TeleportProps, {

}))
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>