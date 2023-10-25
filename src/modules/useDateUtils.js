import moment from "moment";

const toXY = (x, y) => {
    const data = x.map( (item, i) => {
        const o = {
            x: new moment.utc(item),
            y: y[i] ? y[i] : 0
        }
        return o
    })
    return data;
}


const groupByDate = (data, dateMethod = "month") => {
    const grouped = data.reduce((accumulator, date) => {
        const parsed = date.x;
        const year = parsed.year();
        const groupBy = parsed[dateMethod]();
        const groupKey = `${year}, ${groupBy}`;
        accumulator[groupKey] = accumulator[groupKey] || {dates: []};
        accumulator[groupKey].dates.push(date);
        return accumulator;
    }, {});
    return grouped
}

const toMonthly = (dailyData, endOfMonth = true) => {
    const grouped = groupByDate(dailyData, "month");
    const entries = Object.entries(grouped);
    const monthly = entries.map((item) => {
        const yearMonthKey = item[0];
        const data = item[1].dates;
        const lastDayOfMonthData = endOfMonth ? data[data.length - 1] : data[0];
        return {
            x: lastDayOfMonthData.x.format("YYYY-MM-DD"),
            y: lastDayOfMonthData.y,
        };
    })
    return monthly;
}

const toQuarterly = (dailyData, endOfMonth = true) => {
    const grouped = groupByDate(dailyData, "quarter");
    const entries = Object.entries(grouped);
    const monthly = entries.map((item) => {
        const yearMonthKey = item[0];
        const data = item[1].dates;
        const lastDayOfMonthData = endOfMonth ? data[data.length - 1] : data[0];
        return {
            x: lastDayOfMonthData.x.format("YYYY-MM-DD"),
            y: lastDayOfMonthData.y,
        };
    })
    return monthly;
}
export {
    groupByDate,
    toMonthly,
    toQuarterly,
    toXY,
}