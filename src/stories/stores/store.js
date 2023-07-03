import { defineStore } from "pinia";

// const defaultTasks = [
//     { id: '1', title: 'Something', state: 'TASK_INBOX' },
//     { id: '2', title: 'Something more', state: 'TASK_INBOX' },
//     { id: '3', title: 'Something else', state: 'TASK_INBOX' },
//     { id: '4', title: 'Something again', state: 'TASK_INBOX' },
//   ];
const defaultNumberOfRecords = 10;
const defaultNumberOfAccounts = 10;
const defaultTasks = (numberOfRecords) => {
        return Array.from(Array(numberOfRecords).keys(), (i) => {
        return { id: i+1 , title: 'Something', state: 'TASK_INBOX' }
    } );
}
const defaultAccounts = (numberOfRecords) => {
        return Array.from(Array(numberOfRecords).keys(), (i) => {
        return { id: i+1 , number: `1234567${i+1}`, total_market_value: '143908.8754', change_in_value_pct: "3.0", change_in_value_amt: 1342.98, name: "IRA Goldberg" }
    } );
}

const defaultClients = (numberOfRecords) => {
    return Array.from(Array(numberOfRecords).keys(), (i) => {
        return {
            id: i+1 ,
            name: {
                first_name: "Linda",
                last_name: `Faux${i+1}`,
                household: `Lind Faux${i+1} Household`,
            },
            stats: [
                {
                    label: "Total AUM",
                    value: 123765.98,
                    order: 1,
                    format: "currency",
                },
                {
                    label: "YTD Performance",
                    value: 1.64,
                    order: 4,
                    format: "percent",
                },
                {
                    label: "YTD Fees",
                    value: 5698.34,
                    order: 2,
                    format: "currency",
                },
                {
                    label: "YTD Fees %",
                    value: 5.71,
                    order: 3,
                    format: "percent",
                },
                {
                    label: "Number of Account",
                    value: 4,
                    order: 5,
                },
            ],
            contact_info: {
                email: {
                    label: "E-Mail",
                    value: `linda.faux${i+1}@company.com`,
                },
                address: {
                    street_1: "123 Elm St.",
                    street_2: "Apt. G",
                    city: "Some City",
                    state: "SS",
                    postal_code: 12345,
                },
                phone: [
                    {
                        label: "mobile",
                        value: "123-456-7890"
                    },
                    {
                        label: "home",
                        value: "098-765-4321"
                    }
                ]
            },
        }
    });
};
export const useDemoStore = defineStore({
    id: 'demo',
    state: () => ({
      tasks: defaultTasks(defaultNumberOfRecords),
      accounts: defaultAccounts(defaultNumberOfAccounts),
      clients: defaultClients(defaultNumberOfRecords),
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