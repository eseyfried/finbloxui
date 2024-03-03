<template>
    <Story
        title="Advisor/Clients/TopClientsByAum"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" />
            <HstText type="text" v-model="state.aumLabel" title="aumLabel" />
            <PropDesc :component="TopClientsByAum" prop="aumLabel" />
            <HstText type="text" v-model="state.clientLabel" title="clientLabel" />
            <PropDesc :component="TopClientsByAum" prop="clientLabel" />
            <HstJson v-model="state.data" title="data" />
            <PropDesc :component="TopClientsByAum" prop="data" />
            <HstJson v-model="state.clients" title="clients" />
            <PropDesc :component="TopClientsByAum" prop="clients" />
        </template>
        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-2/3">
                    <TopClientsByAum
                        :data="state.data"
                        :clients="state.clients"
                        :aumLabel="state.aumLabel"
                        :clientLabel="state.clientLabel"
                        :as="state.as"
                    />
                </div>
            </template>
        </Variant>

         <Variant title="Custom Layout" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-2/3">
                    <TopClientsByAum
                        :data="state.data"
                        :clients="state.clients"
                        :aumLabel="state.aumLabel"
                        :clientLabel="state.clientLabel"
                        :as="state.as"
                        #default="props"
                    >
                        <tr>
                            <td>{{ props.client }}</td>
                            <td>
                                {{ props.aumAmount }}
                            </td>
                            <td class="tw-hidden md:tw-table-cell">
                                <ProgressBarRoot :width="props.aumPercent" class="!tw-bg-teal-500" />
                                <span style="margin-left: 5px; font-size: 0.8rem;">{{ parseFloat(props.aumPercent).toFixed(2) }}%</span>
                            </td>
                        </tr>
                    </TopClientsByAum>
                </div>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import { useClientsData } from "@/../.histoire/modules/useClientData";
import PropDesc from '@/../.histoire/components/PropDesc';
import TopClientsByAum from '@/components/Advisor/Clients/TopClientsByAum/TopClientsByAum';
import ProgressBarRoot from '@/components/Core/ProgressBar/ProgressBarRoot';


const clients = useClientsData()
const state = reactive({
    as: 'div',
    aumLabel: defaultValue(TopClientsByAum, 'aumLabel'),
    clientLabel: defaultValue(TopClientsByAum, 'clientLabel'),
    data: clients.map(client => parseFloat(client.stats[0].value)).sort((a, b) => a-b).reverse(),
    clients: clients.map(client => client.name.household)
})
const initState = (props) => {
    return {
        ...state,
        ...props
    }
}
</script>