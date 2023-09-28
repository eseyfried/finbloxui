<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="flex flex-col items-center text-center">
        <!-- <h3 class="text-5xl"><span class="text-teal-500">Free</span><br />Trial License</h3>
        <p>Take FinbloxUI for a spin! We'll email you a free trial license key along with access to our private NPM registry.</p>
        <p>No credit card up front. No obligation. Nothing!</p> -->
        <p v-if="message && !hasError" class="p-4 w-full rounded border-1 border-solid border-green-700 bg-green-50 text-green-700">{{ message }}</p>
        <div class="flex flex-col sm:flex-row border border-solid w-full md:w-2/3 p-1">
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
    @apply border-red-400 text-red-600 mt-1;
}
input {
    @apply grow border-0;
}
a {
    @apply bg-[#ffff00] text-black font-semibold hover:bg-[#eaea02] text-center no-underline py-4 px-4;
}
</style>