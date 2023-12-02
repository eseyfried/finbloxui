<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Header brandName="OneLeaf Financial" />
    <div class="page">
        <div class="grid grid-cols-[200px_auto] gap-4">
            <div>
                <Menu />
            </div>
            <div>
                <h1 class="mb-5">Clients</h1>
                <div class="grid grid-cols-1 gap-4 mb-5">
                    <ClientList
                        :clients="clients"
                        :clientListItemOptions="{ detailsLinkLabel: '' }"
                        @fb-client-list-details-link:click="handleClientDetailsClick($event)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import moment from "moment";
import Header from '@/stories/Examples/Header.vue';
import Menu from '@/stories/Examples/Menu.vue';
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import ClientList from "@/components/Advisor/Clients/ClientList";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    theme: {
        type: String,
        default: null,
    }
});

const { clients } = storeToRefs(useDemoStore());


//methods
const handleClientDetailsClick = (client) => {
    console.log(client)
    // activeClient.value = client;

}
</script>
<style lang="scss" scoped>
.page {
    margin: 2rem;
}
.page > h1 {
    margin-top: 4rem;
    border-bottom: 1px solid #eeeeee;
}
.data-point-card {
    background-color: var(--example-data-point-background);
    @apply rounded text-white drop-shadow-md;
}
</style>