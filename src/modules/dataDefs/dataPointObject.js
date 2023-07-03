import { mapDocsToObject  } from "./dataDefUtils";

const docs = {
    "label": "the text label for the data point",
    "value": "the data point value",
    "format": "the data point format. Options: currency, percent or a custom callback function",
    "trend.value": "the value for trending movement of the data point",
    "trend.direction": "the direction for trending movement of the data point. Options: up, down",
    "trend.format": "the data point format. Options: currency, percent or a custom callback function",
};

const dataObject = {
    label: null,
    value: null,
    format: null,
    trend: {
            value: null,
            direction: null,
            format: null,
    },
}

const dataObjectDocs = mapDocsToObject(dataObject, docs);

export {
    dataObject,
    dataObjectDocs
};