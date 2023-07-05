---
to: src/stories/<%=path%>/<%=h.inflection.camelize(name)%>/Events.stories.js
---
import { action } from "@storybook/addon-actions";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import <%=h.inflection.camelize(name)%> from '@/components/<%=path%>/<%=h.inflection.camelize(name)%>/<%=h.inflection.camelize(name)%>.vue';

let defaultClient = ref({}); // <--- CHANGE THIS
export default {
    title: 'Example/<%=path%>/<%=h.inflection.camelize(name)%>',
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
      template: '<<%=h.inflection.camelize(name)%> :client="args.client" @fb-<%= h.changeCase.paramCase(name) %>-details-link:click="handleClick($event)" />',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The <%=h.inflection.camelize(name)%> component offers 1 event that you may bind event listeners to:

- fb-<%= h.changeCase.paramCase(name) %>-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `
<<%=h.inflection.camelize(name)%>
    :client="client"
    @fb-<%= h.changeCase.paramCase(name) %>-details-link:click="handleDetailsClick($event)"
/>`
            }
        }
    }
};