import { defineStore } from "pinia";
import { faker } from "@faker-js/faker";

// const defaultTasks = [
//     { id: '1', title: 'Something', state: 'TASK_INBOX' },
//     { id: '2', title: 'Something more', state: 'TASK_INBOX' },
//     { id: '3', title: 'Something else', state: 'TASK_INBOX' },
//     { id: '4', title: 'Something again', state: 'TASK_INBOX' },
//   ];
const defaultNumberOfRecords = 10;
const defaultNumberOfAccounts = 10;
const defaultNumberOfPositions = 10;
const defaultTasks = (numberOfRecords) => {
        return Array.from(Array(numberOfRecords).keys(), (i) => {
        return { 
            id: i+1 , 
            title: faker.lorem.words(3),
            qty: faker.finance.amount({ min: 5, max: 300, dec: 2 }),
            state: faker.helpers.arrayElement(['open', 'pending', 'new', 'closed'])
        }
    } );
}
const defaultAccounts = (numberOfRecords) => {
        return Array.from(Array(numberOfRecords).keys(), (i) => {
        return { 
            id: i+1 , 
            number: `1234567${i+1}`, 
            total_market_value: '143908.8754', 
            change_in_value_pct: "3.0", 
            change_in_value_amt: 1342.98, 
            name: "IRA Goldberg" }
    } );
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

const defaultPositions = (numberOfRecords) => {
    return Array.from(
        Array(numberOfRecords).keys(),
        (i) => {
            const quantity = faker.string.numeric({ min: 1, max: 238 });
            const price = faker.finance.amount({ min: 5, max: 300, dec: 2 });
            const changeFactor = price * (faker.number.float({ min: 1, max: 5, precision: 0.1 })/100);
            return {
                id: i+1,
                symbol: getSymbol(),
                security_description: faker.lorem.words(4),
                quantity: quantity,
                price: price,
                market_value: quantity * price,
                change_in_value_amt: price - (price * changeFactor),
                change_in_value_pct: changeFactor,
            }
        }
    );
};

const getSymbol = () => {
    return faker.helpers.arrayElement(
        [
            faker.string.alpha({ length: 3, casing: 'upper'}),
            faker.string.alpha({ length: 5, casing: 'upper'}),
            faker.string.alphanumeric({ length: 9, casing: 'upper'}),
            `${faker.string.alpha({ length: 3, casing: 'upper'})}.B`
        ]
    );
};

export const useDemoStore = defineStore({
    id: 'demo',
    state: () => ({
      tasks: defaultTasks(defaultNumberOfRecords),
      accounts: defaultAccounts(defaultNumberOfAccounts),
      clients: defaultClients(defaultNumberOfRecords),
      positions: defaultPositions(defaultNumberOfPositions),
      title: "Test Title",
      status: 'idle',
      error: null,
    }),
    actions: {
        generateRecords (count) {
            return defaultTasks(count);
        },
    }
});