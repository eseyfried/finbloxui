<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<template>
    <nav class="text-white flex items-center justify-center inset-x-0 h-20 sticky top-0 left-0 z-40 backdrop-blur-lg backdrop-saturate-150 bg-black/70 w-full">
        <header class="flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between">
            <h1 class="text-white text-3xl p-0 m-0">FinbloxUI</h1>
            <a href="#" class="text-2xl md:hidden btn-menu" :class="{ 'close': showMenu }" @click.prevent="toggleMenu"></a>
            <ul class="md:relative md:flex md:flex-row" :class="{ 'flex absolute top-[50px] right-[10px] flex-col items-end bg-black/50 backdrop-blur-lg backdrop-saturate-150 w-full': showMenu, 'hidden': !showMenu }">
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
    @apply hover:underline text-green-400;
}
li {
    @apply mr-4;
}
a.btn-menu {
    @apply no-underline hover:no-underline;
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
    @apply absolute;
}
.showThemeMode {
    opacity: 1;
}
</style>