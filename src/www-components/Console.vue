<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="console">
        <div class="tw-flex tw-items-center tw-sticky tw-bg-gray-950 tw-top-0 tw-left-0 tw-px-4 tw-z-10 tw-justify-between tw-h-8 tw-w-full">
            <div class="tw-flex tw-items-center tw-gap-2 tw-basis-1/3">
                <div class="tw-w-3 tw-h-3 tw-rounded-full tw-bg-red-500"></div>
                <div class="tw-w-3 tw-h-3 tw-rounded-full tw-bg-yellow-500"></div>
                <div class="tw-w-3 tw-h-3 tw-rounded-full tw-bg-green-500"></div>
            </div>
            <div class="tw-flex basis-1/3 tw-h-full tw-justify-center tw-items-center">
                <p class="tw-text-white/30 tw-text-xs tw-font-light">{{ filename }}</p>
            </div>
            <div class="tw-flex tw-basis-1/3"></div>
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
    @apply tw-bg-gray-950 tw-relative tw-w-full tw-h-full tw-box-border tw-shadow-md tw-text-white/80 tw-leading-5 tw-whitespace-pre tw-text-sm tw-font-mono tw-rounded-xl [&>code]:tw-transition-transform tw-overflow-auto tw-max-h-[440px] tw-min-h-[390px];
}
code[class*="language-"] {
    background: transparent;
    box-shadow: none;
}
</style>