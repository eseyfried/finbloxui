<!-- eslint-disable vue/valid-template-root -->
<template>
    <ClientCard :client="client" />
</template>
<script setup>
import ClientCard from "@/components/Advisor/Clients/ClientCard";
const client = {
    "id": null,
    "name": {
        "first_name": "Marcos",
        "last_name": "Hirthe",
        "household": "Marcos Hirthe Household"
    },
    "stats": [
        {
            "label": "Total AUM",
            "value": "37,698,840.62",
            "order": 1,
            "format": "currency"
        },
        {
            "label": "YTD Fees",
            "value": "7,553.37",
            "order": 2,
            "format": "currency"
        },
        {
            "label": "YTD Fees %",
            "value": "2.26",
            "order": 3,
            "format": "percent"
        },
        {
            "label": "YTD Performance",
            "value": "2.00",
            "order": 4,
            "format": "percent"
        },
        {
            "label": "Number of Account",
            "value": "4",
            "order": 5,
            "format": null
        },
    ],
    "contact_info": {
        "email": {
            "label": "E-Mail",
            "value": "Marcos47@gmail.com"
        },
        "phone": [
            {
                "label": "mobile",
                "value": "893-478-7656"
            },
            {
                "label": "home",
                "value": "528-755-4849"
            }
        ],
        "address": {
            "street_1": "Baron Cove",
            "street_2": "Suite 994",
            "city": "Kelsieview",
            "state": "Kentucky",
            "postal_code": "35339"
        }
    }
}
</script>
<style lang="scss" >
.fb-client-card {
    @apply relative flex flex-col rounded-lg bg-[#18181B] p-4 text-white md:w-2/3 shadow-gray-950 shadow-2xl;
    .fb-client-card-header::before {
        content: "";
        background-image: url("https://i.pravatar.cc/150?img=5");
        background-position: center;
        background-size: 75px 75px;
        background-repeat: no-repeat;
        position: absolute;
        width: 75px;
        height: 75px;
        @apply hidden left-10 md:block rounded-full bg-white border-2 border-green-500;
    }
    .fb-client-card-header {
        @apply mb-5;
        h2 {
            @apply text-2xl text-right mt-2;
        }
        h3 {
            @apply text-base text-right;
        }
    }
    .fb-client-card-stats,
    .fb-client-card-contact-info {
        @apply flex flex-col;
        li {
            @apply flex justify-between;
            label::after {
                content: ":";
            }
            address {
                @apply text-right;
            }
        }
    }
    .fb-client-card-contact-info {
        @apply mt-4 pt-4 border-t text-gray-400;
        li:last-child {
            @apply mt-4 pt-4 border-t;
        }
    }
    a {
        @apply underline text-green-500;
    }
}
</style>