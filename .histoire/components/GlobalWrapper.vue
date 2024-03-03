<template>
    <div
        class="global-wrapper"
    >
        <ThemeSwitcher v-if="hasWrapper()"/>
        <slot />
    </div>
</template>
<script setup>
import ThemeSwitcher from "/.histoire/components/ThemeSwitcher"
const props = defineProps({
  story: {
    type: Object
  },
  variant: {
    type: Object
  },
})
/**
 * Add :meta="{ wrapper: false }" to story/variant to disable wrapper
 */
const hasWrapper = () => {
  return props.variant && props.story.meta?.wrapper !== false &&
    props.variant?.meta?.wrapper !== false
}
</script>
<style lang="scss" scoped>
.global-wrapper {
    // @apply md:tw-container;
}

/** css rules for story iframe */
html:not(:has(iframe)) .global-wrapper .theme-switcher {

}
/** css rules for histoire main document  */
html:has(iframe) .global-wrapper .theme-switcher {
    display: none;
}

</style>