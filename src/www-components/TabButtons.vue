<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="container" ref="btnContainer">
        <button v-for="(button, i) in buttons" :key="i" class="button" :class="{ 'active': i === activeIndex }" @click.prevent="handleClick($event, i)">
            {{ button }}
        </button>
    </div>
</template>
<script setup>
import { ref } from "vue";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    buttons: {
        type: Array,
        default: () => []
    }
});

const emit= defineEmits(["tab-button:active"]);

const activeIndex = ref(0);

const handleClick = (e, index) => {
    slideBg(index);
    activeIndex.value = index;
    emit("tab-button:active", props.buttons[index]);
}

const WIDTH = ref(100 / props.buttons.length);

// const btnContainer = document.querySelector(".container");
const btnContainer = ref(null);
const slideBg = (n) => {
  const bgOffset = WIDTH.value * n;
  btnContainer.value.style.setProperty("--bg-offset", `${bgOffset}%`);
}
</script>
<style lang="scss" scoped>
.container {
    --bg-offset: 0%;
    @apply tw-relative tw-flex tw-flex-row tw-w-fit tw-rounded-full tw-bg-[#18181b] tw-p-1 tw-overflow-hidden;
}
.container::after {
    content: '';
    width: v-bind('WIDTH + "%"');
    height: 100%;
    position: absolute;
    top: 0;
    left: var(--bg-offset);
    transition: left 0.5s;
    @apply tw-bg-blue-600 tw-rounded-full;
}

.container > button {
    cursor: pointer;
    width: 100px;
    @apply tw-px-4 tw-py-2 tw-rounded-full tw-text-center tw-text-sm tw-text-gray-500 tw-bg-transparent;
}
.container button:hover {
    @apply tw-text-white;
}
.container button.active {
    @apply  tw-text-white tw-z-20;
}
</style>