<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="tw-text-white">
        <div class="tw-flex tw-flex-col tw-gap-2 tw-justify-center tw-w-full" :class="align">
            <h1 class="tw-tracking-tight tw-inline tw-font-semibold tw-text-4xl lg:tw-text-6xl tw-bg-clip-text tw-text-transparent" :class="headlineCss.headline1 || 'tw-text-white'">
                {{ headline1 }}
            </h1>
            <div>
                <h1 class="tw-tracking-tight tw-inline tw-font-semibold tw-text-4xl lg:tw-text-6xl tw-bg-clip-text tw-text-transparent" :class="headlineCss.headline2 || 'tw-text-white'">
                {{ headline2 }}&nbsp;
                </h1>
                <h1 class="tw-tracking-tight tw-inline tw-font-semibold tw-text-4xl lg:tw-text-6xl tw-bg-clip-text tw-text-transparent" :class="headlineCss.headline3 || 'tw-text-white'">
                    {{ headline3 }}
                </h1>
            </div>
        </div>
        <p 
            class="tw-w-full md:tw-w-1/2 tw-my-2 tw-text-lg lg:tw-text-xl tw-font-normal tw-text-default-500 tw-block tw-max-w-full"
            :class="{ 'md:tw-w-full': align != 'tw-items-start', 'tw-text-center': align === 'tw-items-center' }"
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
        default: "tw-items-start"
    }
})
</script>
<style lang="scss" scoped>

</style>