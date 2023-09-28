<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="console">
        <div class="flex items-center sticky bg-gray-950 top-0 left-0 px-4 z-10 justify-between h-8 w-full">
            <div class="flex items-center gap-2 basis-1/3">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="flex basis-1/3 h-full justify-center items-center">
                <p class="text-white/30 text-xs font-light">{{ filename }}</p>
            </div>
            <div class="flex basis-1/3"></div>
        </div>
        <!-- <pre><code :class="`language-${language}`" v-escape>
<slot />
        </code></pre> -->
        <prism :language="language">{{slots.default()[0].children}}</prism>
    </div>
</template>
<script setup>
import { useSlots } from "vue";
import { escape } from "lodash";
import "prismjs";
import "prismjs/themes/prism-funky.css";
import Prism from 'vue-prism-component'

const slots = useSlots();
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    language: {
        type: String,
        default: "javascript"
    },
    filename: {
        type: String,
        default: null
    }
});


const vEscape = {
  mounted: (el) => {
    el.innerHTML = el.innerHTML.replaceAll(/> </g, ">\n<");
    const cleanedContent = el.innerHTML.replaceAll(/ data-v-.*=".*"/g, "");
    const escapedContent = escape(cleanedContent);
    el.innerHTML = `${escapedContent}`
  }
}
</script>
<style lang="scss">
.console {
    @apply bg-gray-950 relative w-full h-full box-border shadow-md text-white/80 leading-5 whitespace-pre text-sm font-mono rounded-xl [&>code]:transition-transform overflow-auto max-h-[440px] min-h-[390px];
}
code[class*="language-"] {
    background: transparent;
    box-shadow: none;
}
</style>