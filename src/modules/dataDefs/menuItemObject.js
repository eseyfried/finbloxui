import { mapDocsToObject  } from "./dataDefUtils";

const docs = {
    "label": "the text label for the menu item",
    "url": "the url for the menu item",
    "callback": "a callback function executed on click. the item object will be passed to the callback",
};

const dataObject = {
    label: null,
    url: null,
    callback: null,
}

const dataObjectDocs = mapDocsToObject(dataObject, docs);

export {
    dataObject,
    dataObjectDocs
};