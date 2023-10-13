import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import * as formatters from "@/modules/useFormatter";
import moment from 'moment';
import NetworthChart from '@/components/Core/Charts/NetworthChart/NetworthChart.vue'

describe('NetworthChart', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            dates: ["2023-01-01", "2023-02-01", "2023-03-01"],
            data: [1000000.00, 1005000.00, 1003000.00],
            label: "Networth",
            monthLabel: "This Month",
            sinceLabel: "Since",
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(NetworthChart, config)
        expect(wrapper.find(".fb-networth-chart").exists()).toBe(true);
    })
    it('renders networth hero label properly', () => {
        const wrapper = mount(NetworthChart, config)
        expect(wrapper.find(".fb-networth-chart-hero h2").text()).toBe(config.props.label);
    })
    it('renders networth hero value properly', () => {
        const { props: { data } } = config;
        const wrapper = mount(NetworthChart, config)
        expect(wrapper.find(".fb-networth-chart-hero h3").text()).toBe(formatters.formatCurrency(data[data.length - 1]));
    })
    it('renders networth hero asOf properly', () => {
        const { props: { dates } } = config;
        const wrapper = mount(NetworthChart, config)
        expect(wrapper.find(".fb-networth-chart-hero span").text()).toBe(`As of: ${formatters.formatDate(dates[dates.length - 1])}`);
    })
    it('renders networth month section label properly', () => {
        const wrapper = mount(NetworthChart, config)
        expect(wrapper.find(".fb-networth-chart-month h4").text()).toBe(config.props.monthLabel);
    })
    it('renders networth month section change amount properly', () => {
        const wrapper = mount(NetworthChart, config)
        expect(wrapper.find(".fb-networth-chart-month-change span:first-child").text()).toBe(formatters.formatCurrency(-2000.00));
    })
    it('renders networth month section change percent properly', () => {
        const wrapper = mount(NetworthChart, config)
        expect(wrapper.find(".fb-networth-chart-month-change span:last-child").text()).toBe("0.00%");
    })
    it('renders networth year section label properly', () => {
        const { props: { dates, sinceLabel } } = config;
        const expected = `${sinceLabel} ${ moment.utc(dates[0]).format("MMM YYYY")}`
        const wrapper = mount(NetworthChart, config)
        expect(wrapper.find(".fb-networth-chart-year h4").text()).toBe(expected);
    })
    it('renders networth year section change amount properly', () => {
        const wrapper = mount(NetworthChart, config)
        expect(wrapper.find(".fb-networth-chart-year-change span:first-child").text()).toBe(formatters.formatCurrency(3000.00));
    })
    it('renders networth year section change percent properly', () => {
        const wrapper = mount(NetworthChart, config)
        expect(wrapper.find(".fb-networth-chart-year-change span:last-child").text()).toBe("0.00%");
    })
});