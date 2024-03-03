<script>
import { mergeProps } from "vue"
import { PopperArrowProps } from '@/components/Core/Primitives/Popper'

export const MenuArrowProps =  mergeProps(PopperArrowProps, {})
</script>

<script setup>
import { PopperArrow } from '@/components/Core/Primitives/Popper'

const props = defineProps(MenuArrowProps)
</script>

<template>
  <PopperArrow v-bind="props">
    <slot />
  </PopperArrow>
</template>