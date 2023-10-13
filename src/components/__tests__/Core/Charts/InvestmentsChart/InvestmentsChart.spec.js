import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import * as formatters from "@/modules/useFormatter";
import moment from 'moment';
import InvestmentsChart from '@/components/Core/Charts/InvestmentsChart/InvestmentsChart.vue'

describe('InvestmentsChart', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            dates: ["2023-01-01", "2023-02-01", "2023-03-01"],
            data: [1000000.00, 1005000.00, 1003000.00],
            label: "Investments",
            changeAmountLabel: "Change",
            changePercentLabel: "Change",
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(InvestmentsChart, config)
        expect(wrapper.find(".fb-investments-chart").exists()).toBe(true);
    })
    it('renders investments hero label properly', () => {
        const wrapper = mount(InvestmentsChart, config)
        expect(wrapper.find(".fb-investments-chart-hero h2").text()).toBe(config.props.label);
    })
    it('renders investments hero value properly', () => {
        const { props: { data } } = config;
        const wrapper = mount(InvestmentsChart, config)
        expect(wrapper.find(".fb-investments-chart-hero h3").text()).toBe(formatters.formatCurrency(data[data.length - 1]));
    })
    it('renders investments hero asOf properly', () => {
        const { props: { dates } } = config;
        const wrapper = mount(InvestmentsChart, config)
        expect(wrapper.find(".fb-investments-chart-hero span").text()).toBe(`As of: ${formatters.formatDate(dates[dates.length - 1])}`);
    })
    it('renders investments change amount section label properly', () => {
        const wrapper = mount(InvestmentsChart, config)
        expect(wrapper.find(".fb-investments-chart-change-amount h4").text()).toBe(config.props.changeAmountLabel);
    })
    it('renders investments change amount properly', () => {
        const wrapper = mount(InvestmentsChart, config)
        expect(wrapper.find(".fb-investments-chart-change-amount span").text()).toBe(formatters.formatCurrency(-2000.00));
    })
    it('renders investments change percent section label properly', () => {
        const wrapper = mount(InvestmentsChart, config)
        expect(wrapper.find(".fb-investments-chart-change-percent h4").text()).toBe(config.props.changePercentLabel);
    })
    it('renders investments change percent properly', () => {
        const wrapper = mount(InvestmentsChart, config)
        expect(wrapper.find(".fb-investments-chart-change-percent span").text()).toBe("0.00%");
    })


});