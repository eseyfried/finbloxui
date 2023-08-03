import moment from "moment";
const formatCurrency = (value) => {
    let formatted;
    if (!value) {
        return value;
    }
    if (value.toString().indexOf(",") === -1) {
        formatted = formatNumberWithCommas(parseFloat(value).toFixed(2));
    } else {
        formatted = formatNumberWithCommas(parseFloat(value.replace(",","")).toFixed(2));
    }
    return `$${formatted}`;
};

const formatPercent = (value) => {
    return `${parseFloat(value).toFixed(2)}%`;
};

const formatDate = (value) => {
    return moment(value).format("MM/DD/YYYY");
};

const formatMask = (value, showNumChars = 3, maskChar = "*") => {
    const replaceStr = value.substr(0, value.length - showNumChars);
    const maskStr = maskChar.repeat(replaceStr.length);
    return value.replace(replaceStr, maskStr);
};

const formatNumberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export {
    formatCurrency,
    formatPercent,
    formatNumberWithCommas,
    formatMask,
    formatDate
}