<script>
import { mergeProps } from "vue"
import { TeleportProps } from '@/components/Core/Primitives/Teleport'

export const MenuPortalProps  = mergeProps(TeleportProps, {})
</script>

<script setup>
import { TeleportPrimitive } from '@/components/Core/Primitives/Teleport'

const props = defineProps(MenuPortalProps)
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>