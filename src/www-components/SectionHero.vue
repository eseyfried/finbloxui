<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="text-white">
        <div class="flex flex-col gap-2 justify-center w-full" :class="align">
            <h1 class="tracking-tight inline font-semibold text-4xl lg:text-6xl bg-clip-text text-transparent" :class="headlineCss.headline1 || 'text-white'">
                {{ headline1 }}
            </h1>
            <div>
                <h1 class="tracking-tight inline font-semibold text-4xl lg:text-6xl bg-clip-text text-transparent" :class="headlineCss.headline2 || 'text-white'">
                {{ headline2 }}&nbsp;
                </h1>
                <h1 class="tracking-tight inline font-semibold text-4xl lg:text-6xl bg-clip-text text-transparent" :class="headlineCss.headline3 || 'text-white'">
                    {{ headline3 }}
                </h1>
            </div>
        </div>
        <p 
            class="w-full md:w-1/2 my-2 text-lg lg:text-xl font-normal text-default-500 block max-w-full"
            :class="{ 'md:w-full': align != 'items-start', 'text-center': align === 'items-center' }"
        >
            {{ subHeadline }}
        </p>
    </div>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    headline1: {
        type: String,
        default: null
    },
    headline2: {
        type: String,
        default: null
    },
    headline3: {
        type: String,
        default: null
    },
    subHeadline: {
        type: String,
        default: null
    },
    headlineCss: {
        type: Object,
        default: null
    },
    align: {
        type: String,
        default: "items-start"
    }
})
</script>
<style lang="scss" scoped>

</style>