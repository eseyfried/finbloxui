<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-action-menu">
        <slot :props="props">
            <ul>
                <li v-for="(item, i) in menuItems" :key="i" class="fb-action-menu-item">
                    <a
                        :href="item.url || '#'"
                        @click="handleMenuItemClick($event, item)"
                    >
                        {{ item.label }}
                    </a>
                </li>
            </ul>
        </slot>
    </div>
</template>
<script setup>
// imports
import * as formatters from "@/modules/useFormatter";

// vars
const props = defineProps({
    menuItems: {
        type: Array,
        default: () => [],
    },
});
const emit = defineEmits(['fb-action-menu-item:click']);

// methods
const handleMenuItemClick = (e, item) => {
    if (!item.url || item.url === "#") {
        e.preventDefault();
    }
    emit("fb-action-menu-item:click", item);
}
</script>
<style lang="scss" scoped>
</style>