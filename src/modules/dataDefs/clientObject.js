import { mapDocsToObject  } from "./dataDefUtils";

const docs = {
    "id": "a unique client id",
    "name.first_name": "the client's first name",
    "name.last_name": "the client's last name",
    "name.household": "the name of the client's household of accounts",
    "stats[0].label": "the text label for an arbitrary data stat",
    "stats[0].value": "the value for an arbitrary data stat",
    "stats[0].order": "the numerical order to sort and render the stat",
    "stats[0].format": "the format to apply to the stat. Options: currency, percent",
    "contact_info.email.label": "the text label for the email data point",
    "contact_info.email.value": "the value for the email data point",
    "contact_info.phone[0].label": "the text label for a phone number",
    "contact_info.phone[0].value": "the value for a phone number",
    "contact_info.address.street_1": "the street address line 1",
    "contact_info.address.street_2": "the street address line 2",
    "contact_info.address.city": "the address city",
    "contact_info.address.state": "the address state",
    "contact_info.address.postal_code": "the address postal code",
};

const dataObject = {
    id: null,
    name: {
        first_name: null,
        last_name: null,
        household: null,
    },
    stats: [
        {
            label: null,
            value: null,
            order: null,
            format: null,
        }
    ],
    contact_info: {
        email: {
            label: null,
            value: null,
        },
        phone: [
            {
                label: null,
                value: null
            }
        ],
        address: {
            street_1: null,
            street_2: null,
            city: null,
            state: null,
            postal_code: null,
        }
    }
}

const dataObjectDocs = mapDocsToObject(dataObject, docs);

export {
    dataObject,
    dataObjectDocs
};