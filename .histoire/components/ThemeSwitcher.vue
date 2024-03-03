<template>
    <div class="theme-switcher">
        <label>Theme:</label>
        <select class="switcher" @change="toggleTheme($event)">
            <option v-for="(option, i) in options" :key="i" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
    
</template>
<script>
let switchCallback = () => null
export const registerSwitchCallback = (callback) => { switchCallback = callback }
export const componentKey = ref(0);
export const forceUpdate = (theme) => {
    componentKey.value += 1 
}
</script>
<script setup>
import { createContext } from '@/modules/shared';
import "tailwindcss/tailwind.css"
import "/.histoire/themes/main.css"
import "/.histoire/themes/preFlight.scss"
import "/.histoire/themes/headless.css"
import "/.histoire/themes/theme-1.css"
import { watchEffect, computed, ref } from 'vue'



const theme = ref('headless')

const options = [
    { label: "Headless", value: "headless" },
    { label: "Theme 1", value: "theme-1" }
]
const toggleTheme = (event) => {
    let toggleTheme = event.target.value
    theme.value = theme.value !== toggleTheme ? toggleTheme : 'headless'
    document.documentElement.setAttribute("data-mode", theme.value);
    document.documentElement.classList.add("preflight");
    window.theme = theme.value
    switchCallback(theme.value)

}



</script>
<style lang="scss" scoped>
.theme-switcher {
    @apply tw-mb-4;
}
.switcher {
    font-size: 100%;
    @apply tw-p-2 tw-border tw-border-gray-300 tw-rounded-md;
}
</style>