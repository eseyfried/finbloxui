<script setup>
import { TeleportPrimitive, TeleportProps } from '@/components/Core/Primitives/Teleport'

const props = defineProps(TeleportProps)
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>