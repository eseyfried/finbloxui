<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div :id="id" class="fb-action-menu" :class="componentClasses.getClassByType('component')" ref="target">
        <slot
            name="button"
            :props="props"
            :eventHandlers="{ click: handleMenuButtonClick }"
            :attrs="{class:'fb-action-menu-button'}"
        >
            <button
                class="fb-action-menu-button"
                :class="[ showMenu ? 'fb-action-menu-visible' : null, componentClasses.getClassByType('buttonSecondary')]"
            >
                {{ buttonLabel }}
            </button>
        </slot>
        
        <ul ref="contextMenu" :class="{ 'fb-action-menu-visible': showMenu }" id="contextMenu" role="contextMenu">
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
import { ref, onMounted } from "vue";
import * as componentClasses from "@/modules/useCommonCSS";
import { createPopper } from "@popperjs/core";
import { useEventListener, onClickOutside } from "@vueuse/core";
import { uniqueId } from "lodash";
// vars
const props = defineProps({
    menuItems: {
        type: Array,
        default: () => [],
    },
    buttonLabel: {
        type: String,
        default: null,
    },

});
const showMenu = ref(false);
const emit = defineEmits(['fb-action-menu-item:click']);

const popperInstance = ref(null);
const contextMenu = ref(null);
const id = ref(`fb-action-menu-${uniqueId()}`);

// methods
const handleMenuItemClick = (e, item) => {
    if (item.callback && typeof item.callback === "function") {
        item.callback(item);
        e.preventDefault();
    }
    if (item.url && item.url != "#") {
        emit("fb-action-menu-item:click", item);
        e.preventDefault();
    }
    if (!item.url || item.url === "#") {
        e.preventDefault();
    }
   
}
const handleMenuButtonClick = () => {
    
    // showMenu.value = !showMenu.value;
}

onMounted(async () => {
    const toggleElement = document.querySelector(`#${id.value} .fb-action-menu-button`);
    useEventListener(toggleElement, "click", toggleMenu);
    onClickOutside(toggleElement, hide)
    popperInstance.value = createPopper(toggleElement, contextMenu.value, {
    placement: 'bottom',
    
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 0],
            },
        },
    ],
    });
})

const toggleMenu = () => {
    if (!showMenu.value) {
        show()
    } else if (showMenu.value) {
        hide()
    }
}

function show() {  
    showMenu.value = true;
    // Make the tooltip visible
    contextMenu.value.setAttribute('data-show', '');

    // Enable the event listeners
    popperInstance.value.setOptions((options) => ({
        ...options,
        modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: true },
        ],
    }));
    // Update its position
    popperInstance.value.update();
    

}

function hide() {
  // Hide the tooltip
    contextMenu.value.removeAttribute('data-show');
    showMenu.value = false;
    // Disable the event listeners
    popperInstance.value.setOptions((options) => ({
        ...options,
        modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: false },
        ],
    }));
}


</script>
<style lang="scss" scoped>
.fb-action-menu {
    position: relative;
}
.fb-action-menu-button {

}
.fb-action-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.fb-action-menu-visible {

}


#contextMenu {
    background: #FFFFFF;
    padding: 0;
    // font-size: 13px;
    // border-radius: 4px;
    display: none;
    max-width: 300px;
}

#contextMenu[data-show] {
    display: block;
    pointer-events: auto;
    z-index: 1;
}
</style>