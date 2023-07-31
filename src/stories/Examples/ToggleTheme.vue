<template>
    <button @click="toggleTheme = !toggleTheme">
        {{ toggleTheme ? "View Headless" : "View Styled" }}
    </button>
</template>
<script setup>
import { ref, watchEffect } from "vue"; 
const toggleTheme = ref(false);
watchEffect(() => {
    const themeFiles = [
        "./node_modules/tailwindcss/tailwind.css",
        "./src/assets/fontawesome/css/fontawesome.css",
        "./src/assets/fontawesome/css/brands.css",
        "./src/assets/fontawesome/css/solid.css",
        "./src/stories/Examples/index.css",
    ];
    if (toggleTheme.value) {
        themeFiles.forEach((item) => {
            let file = document.createElement('link');
            file.rel = 'stylesheet';
            file.href = item;
            document.head.appendChild(file);
        });
        
    } else {
        const themeCSS = document.querySelectorAll(themeFiles.map(file => {
            return `link[href$="${file}"]`;
        }).join(","));
        if (themeCSS) {
            themeCSS.forEach(item => item.remove());
        }
        
    }
})

</script>
<style lang="scss" scoped>

</style>