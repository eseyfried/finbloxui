import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";

export const useClientData = () => {
    const { clients } = storeToRefs(useDemoStore());
    const client = ref(clients.value[0])
    return client
}
