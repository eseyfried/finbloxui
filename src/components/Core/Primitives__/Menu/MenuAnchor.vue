<script setup>
import { mergeProps } from "vue"
import { PopperAnchor, PopperAnchorProps } from '@/components/Core/Primitives/Popper'



const props = defineProps(mergeProps(PopperAnchorProps, {}))
</script>

<template>
  <PopperAnchor v-bind="props">
    <slot />
  </PopperAnchor>
</template>