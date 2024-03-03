<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div ref="tooltip" id="tooltip" role="tooltip" class="fb-popover" :class="componentClasses.getClassByType('component')">
        <slot />
        <div id="arrow" data-popper-arrow></div>
    </div>
</template>
<script setup>
// imports
import * as componentClasses from "@/modules/useCommonCSS";
import { createPopper } from "@popperjs/core";
import { onMounted, ref, watch, mergeProps, toRef, toRefs } from "vue"; 
import { useEventListener, onClickOutside } from "@vueuse/core";



// vars
const props = defineProps({
    selector: {
        type: String,
        default: null,
        desc: "A css selector to locate the HTML element that triggers the popover"
    },
    trigger: {
        type: String,
        default: "click",
        validator: (value) => {
            return ["click", "hover"].includes(value);
        },
        desc: "The trigger type event."
    },
    updatePopover: {
        type: Boolean,
        default: false
    },
    options: {
        type: Object,
        default: () => { return ref({}) },
        desc: "https://popper.js.org/ options"
    }
});

const popperInstance = ref(null);
const tooltip = ref(null);
const defaultOptions = {
    placement: 'auto',
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 8],
            },
        },
    ],
}


onMounted(async () => {
    const toggleElement = document.querySelector(props.selector);
    if (props.trigger === "hover") {
        useEventListener(toggleElement, "mouseenter", show);
        useEventListener(toggleElement, "mouseleave", hide);
    } else if (props.trigger === "click") {
        useEventListener(toggleElement, "click", show);
        onClickOutside(toggleElement, hide)
    }

    popperInstance.value = createPopper(
        toggleElement,
        tooltip.value,
        mergeProps(
            defaultOptions,
            props.options
        )
    );

})



function show() {  
    // Make the tooltip visible
    tooltip.value.setAttribute('data-show', '');

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
    tooltip.value.removeAttribute('data-show');

    // Disable the event listeners
    popperInstance.value.setOptions((options) => ({
        ...options,
        modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: false },
        ],
    }));
}


watch([props.options, () => props.updatePopover], ([newOptions, newUpdatePopover]) => {
    if (newOptions && popperInstance.value) {
        popperInstance.value.setOptions((options) => (mergeProps(options,newOptions)));
    }
    if (newUpdatePopover === true) {
        popperInstance.value.update();
    }
}, { immediate: true });
</script>
<style lang="scss" scoped>

.fb-popover,
#tooltip {
    background: #FFFFFF;
    padding: 0;
    font-size: 13px;
    border-radius: 4px;
    display: none;
    max-width: 300px;
}

#tooltip[data-show] {
    display: block;
    pointer-events: auto;
    z-index: 1;
}

#arrow,
#arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    z-index: -1;
}

#arrow {
    visibility: hidden;
}

#arrow::before {
    visibility: visible;
content: '';
    transform: rotate(45deg);
}

#tooltip[data-popper-placement^='top'] > #arrow {
    bottom: -4px;
}

#tooltip[data-popper-placement^='bottom'] > #arrow {
    top: -4px;
}

#tooltip[data-popper-placement^='left'] > #arrow {
    right: 4px;
}

#tooltip[data-popper-placement^='right'] > #arrow {
    left: -4px;
}
</style>