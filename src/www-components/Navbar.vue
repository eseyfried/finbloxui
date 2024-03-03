<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<template>
    <nav class="tw-text-white tw-flex tw-items-center tw-justify-center tw-inset-x-0 tw-h-20 tw-sticky tw-top-0 tw-left-0 tw-z-40 tw-backdrop-blur-lg tw-backdrop-saturate-150 tw-bg-black/70 tw-w-full">
        <header class="tw-flex tw-px-6 tw-gap-4 tw-w-full tw-flex-row tw-relative tw-flex-nowrap tw-items-center tw-justify-between">
            <h1 class="tw-text-white tw-text-3xl tw-p-0 tw-m-0">FinbloxUI</h1>
            <a href="#" class="tw-text-2xl md:tw-hidden btn-menu" :class="{ 'close': showMenu }" @click.prevent="toggleMenu"></a>
            <ul class="md:tw-relative md:tw-flex md:tw-flex-row" :class="{ 'tw-flex tw-absolute tw-top-[50px] tw-right-[10px] tw-flex-col tw-items-end tw-bg-black/50 tw-backdrop-blur-lg tw-backdrop-saturate-150 tw-w-full': showMenu, 'tw-hidden': !showMenu }">
                <li><a href="/docs">Component Library</a></li>
                <li><a href="/docs">Docs</a></li>
                <li><a href="/docs">Guides</a></li>
            </ul>
        </header>
    </nav>
</template>
<script setup>
import { ref } from "vue";

const showMenu = ref(false);

const toggleMenu = () => {
    showMenu.value = !showMenu.value;
}
</script>
<style lang="scss" scoped>
a {
    @apply hover:tw-underline tw-text-green-400;
}
li {
    @apply tw-mr-4;
}
a.btn-menu {
    @apply tw-no-underline hover:tw-no-underline;
}
.btn-menu:before {
    font: var(--fa-font-solid);
    content: "\f0c9";
    opacity: 1;
}
.btn-menu.close:before {
    font: var(--fa-font-solid);
    content: "\58";
    opacity: 1;
    transition: opacity 0.6s linear;
}

.themeMode {
    opacity: 0;
    transition: opacity 0.6s linear;
    @apply tw-absolute;
}
.showThemeMode {
    opacity: 1;
}
</style>