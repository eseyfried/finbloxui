const client = {
    id: 1,
    name: {
        first_name: "John",
        last_name: "Smith",
        household: "Smith Household"
    },
    stats: [
        { label: "Total AUM", value: 123456.78, order: 1, format: "currency" },
        { label: "Total Fees", value: 3456.78, order: 2, format: "currency" },
    ],
    contact_info: {
        email: { label: "E-Mail", value: "john.smith@company.com" },
        phone: [
            { label: "Mobile", value: "123-456-7890" },
            { label: "Home", value: "098-765-4321" },
        ],
        address: {
            street_1: "123 Elm Street",
            street_2: "Apt 3G",
            city: "some city",
            state: "some state",
            postal_code: "12345",
        }
    }
};

export {
    client
}