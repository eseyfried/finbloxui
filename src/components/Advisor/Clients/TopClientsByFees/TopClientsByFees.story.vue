<template>
    <Story
        title="Advisor/Clients/TopClientsByFees"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" />
            <HstText type="text" v-model="state.feesLabel" title="feesLabel" />
            <PropDesc :component="TopClientsByFees" prop="feesLabel" />
            <HstText type="text" v-model="state.clientLabel" title="clientLabel" />
            <PropDesc :component="TopClientsByFees" prop="clientLabel" />
            <HstJson v-model="state.data" title="data" />
            <PropDesc :component="TopClientsByFees" prop="data" />
            <HstJson v-model="state.clients" title="clients" />
            <PropDesc :component="TopClientsByFees" prop="clients" />
        </template>
        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-2/3">
                    <TopClientsByFees
                        :data="state.data"
                        :clients="state.clients"
                        :feesLabel="state.feesLabel"
                        :clientLabel="state.clientLabel"
                        :as="state.as"
                    />
                </div>
            </template>
        </Variant>

         <Variant title="Custom Layout" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-2/3">
                    <TopClientsByFees
                        :data="state.data"
                        :clients="state.clients"
                        :feesLabel="state.feesLabel"
                        :clientLabel="state.clientLabel"
                        :as="state.as"
                        #default="props"
                    >
                        <tr>
                            <td>{{ props.client }}</td>
                            <td>
                                {{ props.feesAmount }}
                            </td>
                            <td class="tw-hidden md:tw-table-cell">
                                <ProgressBarRoot :width="props.feesPercent" class="!tw-bg-teal-500" />
                                <span style="margin-left: 5px; font-size: 0.8rem;">{{ parseFloat(props.feesPercent).toFixed(2) }}%</span>
                            </td>
                        </tr>
                    </TopClientsByFees>
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
import TopClientsByFees from '@/components/Advisor/Clients/TopClientsByFees/TopClientsByFees';
import ProgressBarRoot from '@/components/Core/ProgressBar/ProgressBarRoot';


const clients = useClientsData()
const state = reactive({
    as: 'div',
    feesLabel: defaultValue(TopClientsByFees, 'feesLabel'),
    clientLabel: defaultValue(TopClientsByFees, 'clientLabel'),
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