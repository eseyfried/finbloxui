import { computed } from "vue";



export default {
    columns: (slots) => {
        // return computed(() => {
            let children;
            // handles getting slotted Column components from wrapped Component
            if (slots.default()[0].children && slots.default()[0].children.length > 0) {
                children = slots.default()[0].children.filter(child => child.type.__name === "Column");
            } else {
                children = slots.default().filter(child => child.type.__name === "Column");
            }
            return children;
        // })
    }
}