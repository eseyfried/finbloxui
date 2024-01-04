<script>
import { mergeProps } from "vue"
import {
  MenuItemEmits,
  MenuItemProps,
} from './MenuItem.vue'

export const MenuCheckboxItemEmits = mergeProps(MenuItemEmits, ['update:checked'])


export const MenuCheckboxItemProps = mergeProps(MenuItemProps, {
  checked: {
    type: Boolean,
    default: false
  }
})
</script>

<script setup>
import { useVModel } from '@vueuse/core'
import { getCheckedState, isIndeterminate } from './utils'
import MenuItem from './MenuItem.vue'
import { provideMenuItemIndicatorContext } from './MenuItemIndicator.vue'

const props = defineProps(MenuCheckboxItemProps)
const emits = defineEmits(MenuCheckboxItemEmits)
const checked = useVModel(props, 'checked', emits)

provideMenuItemIndicatorContext({ checked })
</script>

<template>
  <MenuItem
    role="menuitemcheckbox"
    v-bind="props"
    :aria-checked="isIndeterminate(checked) ? 'mixed' : checked"
    :data-state="getCheckedState(checked)"
    @select="
      async (event) => {
        emits('select', event);
        if (isIndeterminate(checked)) {
          checked = true;
        }
        else {
          checked = !checked;
        }
      }
    "
  >
    <slot />
  </MenuItem>
</template>