<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";
import DataTable from "@/components/DataTable/DataTable.vue";
import Column from "@/components/DataTable/Column.vue";
import AccountCarousel from "@/components/Core/Navigation/AccountCarousel.vue";
import ClientCard from "@/components/Advisor/Clients/ClientCard.vue";
import ClientList from "@/components/Advisor/Clients/ClientList.vue";
import PositionsGrid from "@/components/Core/PositionsGrid/PositionsGrid.vue";
import ContextMenu from "@/components/Core/Navigation/ContextMenu/ContextMenu.vue";
import { formatCurrency } from "@/modules/useFormatter";

const { tasks, accounts, clients, positions } = storeToRefs(useDemoStore());
const formatTitle = (title) => title.toLowerCase();
const onColumnHeaderClick = (column) => {
    console.log(column);
}

</script>

<template>
    <div>
        <ContextMenu
            :menuItems="[
                { url: null, label: 'item 1' },
                { url: null, label: 'item 2' },
            ]"
        >
            <template #button="slotProps">
                <button v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">toggle</button>
            </template>
        </ContextMenu>
        <p>some text to test z-index</p>
    </div>
    <PositionsGrid :positions="positions">
        <Column field="id" header="Id" />
        <Column field="symbol" header="Symbol" />
    </PositionsGrid>
    <div>
        <ClientList :clients="clients" />
    </div>
      <DataTable :rows="tasks" @column-click="onColumnHeaderClick($event)" :useVirtualScroll="true" class="foo bar">
        <Column field="id" header="Id" sortable>
            <template #sortIcon="slotProps">
                <span v-if="slotProps.sorted">{{ slotProps.sortDir }}</span>
            </template>
        </Column>
        <Column field="title" header="Title" sortable>
            <template #th="slotProps">
                <th v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">
                     <span v-if="slotProps.sorted">{{ slotProps.sortDir }}</span>
                     {{ slotProps.header }}
                </th>
            </template>
            <template #td="slotProps">
                <td v-bind="slotProps.attrs">{{ formatTitle(slotProps.data.title) }}</td>
            </template>
        </Column>
        <Column field="state" header="State" sortable />
        <Column header="Actions" type="actions" :contextMenuOptions="{
            menuItems: [
                { url: null, label: 'item 1' },
                { url: null, label: 'item 2 <%=id%>' },
            ]
        }">
            <template #button="slotProps">
                <button v-on="slotProps.eventHandlers" v-bind="slotProps.attrs">+++</button>
            </template>
        </Column>
      </DataTable>

      <AccountCarousel :accounts="accounts" :numVisibile=5 :numScroll=1 :showLabels="true">
            <template #account="slotProps">
                <div>
                    <h2>
                        {{ formatCurrency(slotProps.account.total_market_value) }}
                        <span v-if="slotProps.props.showLabels">{{ slotProps.totalMarketValueLabel }}</span>
                    </h2>
                </div>
            </template>
      </AccountCarousel>
      <AccountCarousel :accounts="accounts" :numVisibile=5 :numScroll=3 />
      <!-- <ClientCard :client="clients[0]" /> -->
     

  
</template>

<style lang="scss">
@import "@/scss/finbloxui.scss";
.fb-account-carousel-accounts {
    justify-content: center;
}
.fb-account-carousel-accounts li div {
    background-color: #EEEEEE;
    margin-right: 0.5rem;
    padding: 1rem;
}

.fb-account-carousel-accounts-container button:hover {
    color: #343a40;
    border-color: transparent;
    background: #999999;
}
.fb-account-carousel-accounts-container button {
    width: 2rem;
    height: 2rem;
    color: #6c757d;
    border: 0 none;
    background: #e9ecef;
    border-radius: 50%;
    transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
    margin: 0.5rem;

    align-items: center;
    align-self: center;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    justify-content: center;
    overflow: hidden;
    position: relative;
}
.fb-account-carousel-indicators {
    flex-wrap: wrap;
    justify-content: center;
}
.fb-account-carousel-indicator {
    background-color: #EEEEEE;
    height: 8px;
    width: 5%;
    margin-right: 0.5rem;
}
.fb-account-carousel-indicator-highlight {
    background-color: #999999;
}
</style>
