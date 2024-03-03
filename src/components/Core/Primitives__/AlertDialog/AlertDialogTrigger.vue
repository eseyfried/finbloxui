<script setup>
import { DialogTrigger } from '@/components/Core/Primitives/Dialog'
import { DialogTriggerProps } from '@/components/Core/Primitives/Dialog/DialogTrigger'

const props = defineProps(DialogTriggerProps)
</script>

<template>
  <DialogTrigger v-bind="props">
    <slot />
  </DialogTrigger>
</template>