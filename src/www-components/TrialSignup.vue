<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="tw-flex tw-flex-col tw-items-center tw-text-center">
        <!-- <h3 class="text-5xl"><span class="text-teal-500">Free</span><br />Trial License</h3>
        <p>Take FinbloxUI for a spin! We'll email you a free trial license key along with access to our private NPM registry.</p>
        <p>No credit card up front. No obligation. Nothing!</p> -->
        <p v-if="message && !hasError" class="tw-p-4 tw-w-full tw-rounded tw-border-1 tw-border-solid tw-border-green-700 tw-bg-green-50 tw-text-green-700">{{ message }}</p>
        <div class="tw-flex tw-flex-col sm:tw-flex-row tw-border tw-border-solid tw-w-full md:tw-w-2/3 tw-p-1">
            <input type="email" v-model="email" name="email"  placeholder="enter your email" />
            <a href="#" @click.prevent="handleButtonClick">Try FinbloxUI</a>
        </div>
        <p v-if="hasError" class="error">{{ message }}</p>
    </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "@/api/index";

const message = ref("");
const email = ref("");
const hasError = ref(false);
const handleButtonClick = async (e) => {
    try {
        if (email.value === "") {
            throw new Error("Please enter your e-mail address");
        }
        await axios.api.Trial.create(email.value);
        message.value = "Thanks for signing up for our free trial. Please check your email for your license key!";
        hasError.value = false;
    } catch (e) {
        message.value = e.response ? e.response.data.message : e.message;
        hasError.value = true;
    }
    
}
</script>
<style lang="scss" scoped>
.error {
    @apply tw-border-red-400 tw-text-red-600 tw-mt-1;
}
input {
    padding: 0.5rem 0.75rem;
    @apply tw-grow tw-border-0;
}
a {
    @apply tw-bg-[#ffff00] tw-text-black tw-font-semibold hover:tw-bg-[#eaea02] tw-text-center tw-no-underline tw-py-4 tw-px-4;
}
</style>