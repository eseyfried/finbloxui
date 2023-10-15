import { mapDocsToObject  } from "./dataDefUtils";

const docs = {
    "description": "the transaction description",
    "date": "the date of the transaction",
    "amount": "the amount of the transaction",
};

const dataObject = {
    description: null,
    date: null,
    amount: null,
}

const dataObjectDocs = mapDocsToObject(dataObject, docs);

export {
    dataObject,
    dataObjectDocs
};