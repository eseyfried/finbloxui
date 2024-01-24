import { ref } from "vue";
import { faker } from "@faker-js/faker";
import moment from "moment";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";

export const useClientData = () => {
    // const { clients } = storeToRefs(useDemoStore());
    // const client = ref(clients.value[0])
    const client = defaultClients(1)[0]
    return client
}


const defaultClients = (numberOfRecords) => {
    return Array.from(Array(numberOfRecords).keys(), (i) => {
        const first_name = faker.person.firstName();
        const last_name = faker.person.lastName();
        return {
            id: i+1 ,
            name: {
                first_name: first_name,
                last_name: last_name,
                household: `${first_name} ${last_name} Household`,
            },
            stats: [
                {
                    label: "Total AUM",
                    value: faker.finance.amount({ min: 250000, max: 100000000, dec: 2 }),
                    order: 1,
                    format: "currency",
                },
                {
                    label: "YTD Performance",
                    value: faker.finance.amount({ min: 1, max: 3, dec: 2 }),
                    order: 4,
                    format: "percent",
                },
                {
                    label: "YTD Fees",
                    value: faker.finance.amount({ min: 3000, max: 10000, dec: 2 }),
                    order: 2,
                    format: "currency",
                },
                {
                    label: "YTD Fees %",
                    value: faker.finance.amount({ min: 1, max: 3, dec: 2 }),
                    order: 3,
                    format: "percent",
                },
                {
                    label: "Number of Account",
                    value: faker.number.int({ min: 1, max: 10 }),
                    order: 5,
                },
            ],
            contact_info: {
                email: {
                    label: "E-Mail",
                    value: faker.internet.email({ firstName: first_name, lastName: last_name }),
                },
                address: {
                    street_1: faker.location.street(),
                    street_2: faker.location.secondaryAddress(),
                    city: faker.location.city(),
                    state: faker.location.state(),
                    postal_code: faker.location.zipCode("#####"),
                },
                phone: [
                    {
                        label: "mobile",
                        value: faker.phone.number("###-###-####")
                    },
                    {
                        label: "home",
                        value: faker.phone.number("###-###-####")
                    }
                ]
            },
        }
    });
};