<script setup>
import { DialogRoot } from '@/components/Core/Primitives/Dialog'
import { DialogRootProps, DialogRootEmits } from '@/components/Core/Primitives/Dialog/DialogRoot'
import { useForwardPropsEmits } from '@/modules/shared'

const props = defineProps(DialogRootProps)
const emits = defineEmits(DialogRootEmits)

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DialogRoot v-bind="forwarded" :modal="true">
    <slot />
  </DialogRoot>
</template>