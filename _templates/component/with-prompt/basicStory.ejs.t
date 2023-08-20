---
to: src/stories/<%=path%>/<%=h.inflection.camelize(name)%>/Basic.stories.js
---
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import <%=h.inflection.camelize(name)%> from '@/components/<%=path%>/<%=h.inflection.camelize(name)%>/<%=h.inflection.camelize(name)%>.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Library/<%=path%>/<%=h.inflection.camelize(name)%>',
    args: {
        client: defaultClient // <--- CHANGE THIS
    },
    render: (args) => ({
      components: { <%=h.inflection.camelize(name)%> },
      setup() {
        const { clients } = storeToRefs(useDemoStore()); // <--- CHANGE THIS
        args.client = ref(clients.value[0]); // <--- CHANGE THIS
        defaultClient.value = args.client; // <--- CHANGE THIS
        return { args };
      },
      template: '<<%=h.inflection.camelize(name)%> :client="args.client" />', // <--- CHANGE THIS
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the <%=h.inflection.camelize(name)%> component.",
            },
            source: {
                code: `<<%=h.inflection.camelize(name)%> :client="client" />` // <--- CHANGE THIS
            }
        }
    }
};