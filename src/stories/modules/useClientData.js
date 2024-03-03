import { ref } from "vue";
import { faker } from "@faker-js/faker";
import moment from "moment";
import { storeToRefs } from "pinia";
import { useDemoStore } from "@/stories/stores/store";

export const useClientData = () => {
    const client = defaultClients(1)[0]
    return client
}

export const useClientsData = (numberOfRecords = 10) => {
    return defaultClients(numberOfRecords)
}

export const useTransactionData = (numberOfRecords = 10) => {
    return defaultTransactions(numberOfRecords)
}

export const useUGLLotsData = (numberOfRecords = 10) => {
    return defaultUGLLots(numberOfRecords)
}

export const usePositionsData = (numberOfRecords = 10) => {
    return defaultPositions(numberOfRecords)
}
export const useDummyData = (numberOfRecords = 10) => {
    return dummyData(numberOfRecords)
}

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

const defaultUGLLots = (numberOfRecords) => {
    return Array.from(
        Array(numberOfRecords).keys(),
        (i) => {
            const quantity = faker.string.numeric({ min: 1, max: 238 });
            const price = faker.finance.amount({ min: 5, max: 300, dec: 2 });
            const cost_basis = faker.finance.amount({ min: price - 10, max: price + 4, dec: 2 });
            const unrealized_gl = cost_basis - price;
            const changeFactor = price * (faker.number.float({ min: 1, max: 5, multipleOf: 0.1 })/100);
            const open_date = faker.date.past({ days: 3 });
            const symbol = i % 2 ? getSymbol() : "AAPL";
            return {
                id: i+1,
                symbol: symbol,
                security_description: faker.company.name(),
                quantity: quantity,
                price: price,
                market_value: quantity * price,
                cost_basis: cost_basis, // purchase price
                unrealized_gl: price > cost_basis ? (unrealized_gl * -1) : unrealized_gl, // cost_basis - current market_value
                duration: faker.helpers.arrayElement(['Short Term', 'Long Term']), //short term | long term
                wash_sale: faker.helpers.arrayElement([true, false]),
                change_in_value_amt: price - (price * changeFactor),
                change_in_value_pct: changeFactor,
                open_date: moment(open_date).format('YYYY-MM-DD'),
            }
        }
    );
};

const defaultTransactions = (numberOfRecords) => {
    return Array.from(
        Array(numberOfRecords).keys(),
        (i) => {
            const quantity = faker.string.numeric({ min: 1, max: 238 });
            const amount = faker.finance.amount({ min: 5, max: 300, dec: 2 });
            const neg_amount = faker.finance.amount({ min: -3005, max: -5, dec: 2 });
            const transaction_date = faker.date.past({ days: 3 });
            const transaction_type = faker.helpers.arrayElement(['Buy', 'Sell', 'Income', 'Expense', 'Transfer']);
            const txn = {
                id: i+1,
                account: null,
                symbol: null,
                description: null,
                quantity: null,
                amount: amount,
                transaction_type: transaction_type,
                transaction_date: moment(transaction_date).format('YYYY-MM-DD'),
                transaction_fee: null,
            }
            if (['Buy', 'Sell'].includes(transaction_type)) {
                txn.symbol = getSymbol();
                txn.quantity = quantity;
                txn.amount = transaction_type === "Buy" ? amount : neg_amount;
                txn.description = `${transaction_type} ${txn.quantity} shares @ ${txn.amount}`;
            }
            if (['Income'].includes(transaction_type)) {
                const sub_type = faker.helpers.arrayElement(['Dividend']);
                txn.description = `${sub_type} of ${txn.amount} from ${getSymbol()}`;
            }
            if (['Expense'].includes(transaction_type)) {
                const sub_type = faker.helpers.arrayElement(['Advisory Fee']);
                txn.transaction_fee = neg_amount;
                txn.description = `${sub_type}`;
            }
            if (['Transfer'].includes(transaction_type)) {
                const sub_type = faker.helpers.arrayElement(['Transfer']);
                txn.amount = amount;
                txn.description = `${sub_type}`;
            }
            return txn;
        }
    );
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
                        value: faker.phone.number()
                    },
                    {
                        label: "home",
                        value: faker.phone.number()
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
            const changeFactor = price * (faker.number.float({ min: 1, max: 5, multipleOf: 0.1 })/100);
            return {
                id: i+1,
                symbol: getSymbol(),
                security_description: faker.company.name(),
                quantity: quantity,
                price: price,
                market_value: quantity * price,
                change_in_value_amt: price - (price * changeFactor),
                change_in_value_pct: changeFactor,
            }
        }
    );
};

const dummyData = (numberOfRecords) => {
    return Array.from(
        Array(numberOfRecords).keys(),
        (i) => {
            return {
                id: i+1,
                street_1: faker.location.street(),
                street_2: faker.location.secondaryAddress(),
                city: faker.location.city(),
                state: faker.location.state(),
                postal_code: faker.location.zipCode("#####"),
            }
        }
    );
}