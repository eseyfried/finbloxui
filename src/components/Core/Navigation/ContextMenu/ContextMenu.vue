<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-action-menu" ref="target">
        <slot
            name="button"
            :props="props"
            :eventHandlers="{ click: handleMenuButtonClick }"
            :attrs="{class:'fb-action-menu-button'}"
        >
            <button
                class="fb-action-menu-button"
                @click="handleMenuButtonClick($event)"
            >
                {{ buttonLabel }}
            </button>
        </slot>
        
        <ul :class="{ 'fb-action-menu-visible': showMenu }">
            <li v-for="(item, i) in menuItems" :key="i" class="fb-action-menu-item">
                <slot
                    name="menuItem"
                    :props="props"
                    :item="item"
                    :eventHandlers="{ click: ($event) => { handleMenuItemClick($event, item); } }"
                >
                    <a
                        :href="item.url || '#'"
                        @click="handleMenuItemClick($event, item)"
                    >
                        {{ item.label }}
                    </a>
                </slot>
            </li>
        </ul>
    </div>
</template>
<script setup>
// imports
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
// vars
const props = defineProps({
    menuItems: {
        type: Array,
        default: () => [],
    },
    buttonLabel: {
        type: String,
        default: null,
    }
});
const showMenu = ref(props.show);
const emit = defineEmits(['fb-action-menu-item:click']);
const target = ref(null);

onClickOutside(target, () => { 
    showMenu.value = false; 
});
// methods
const handleMenuItemClick = (e, item) => {
    if (item.callback && typeof item.callback === "function") {
        item.callback(item);
        e.preventDefault();
    }
    if (!item.url || item.url === "#") {
        e.preventDefault();
    }
    showMenu.value = !showMenu.value;
    emit("fb-action-menu-item:click", item);
}
const handleMenuButtonClick = () => {
    showMenu.value = !showMenu.value;
}

</script>
<style lang="scss" scoped>
.fb-action-menu {
    position: relative;
}
.fb-action-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: none;
    position: absolute;
    z-index: 100;
}
.fb-action-menu-visible {
    display: block !important;
}
</style>