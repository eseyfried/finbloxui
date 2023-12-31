import moment from "moment";
const formatCurrency = (value, unsigned = false) => {
    let formatted;
    if (!value) {
        return value;
    }
    if (value.toString().indexOf(",") === -1) {
        formatted = formatNumberWithCommas(parseFloat(value).toFixed(2));
    } else {
        formatted = formatNumberWithCommas(parseFloat(value.replace(",","")).toFixed(2));
    }
    if (unsigned) {
        formatted = formatted.replace(/-/g, "")
    }
    return `$${formatted}`;
};

const formatPercent = (value, unsigned = false) => {
    let formatted = value;
    if (unsigned) {
        formatted = formatted.toString().replace(/-/g, "")
    }
    return `${parseFloat(formatted).toFixed(2)}%`;
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

const ucFirst = (string) => {
    if (!string) {
      return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const ucWords = (string) => {
    const words = string.split(" ");
    return words.map((word) => ucFirst(word)).join(" ");
  };

export {
    formatCurrency,
    formatPercent,
    formatNumberWithCommas,
    formatMask,
    formatDate,
    ucFirst,
    ucWords
}