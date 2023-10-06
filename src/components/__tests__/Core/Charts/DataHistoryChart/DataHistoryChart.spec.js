import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import DataHistoryChart from '@/components/Core/Charts/DataHistoryChart/DataHistoryChart.vue'

describe('DataHistoryChart', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            data: [10000.00, 20000.00, 15000.00, 25000.00],
            dates: ["2023-10-01", "2023-10-02", "2023-10-03", "2023-10-04"],
            label: "Total AUM"
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(DataHistoryChart, config)
        expect(wrapper.find(".fb-data-history-chart").exists()).toBe(true);
    })
    it('renders label properly', () => {
        const wrapper = mount(DataHistoryChart, config)
        expect(wrapper.find(".fb-data-history-chart-hero h2").text()).toBe(config.props.label);
    })

    it('renders current total value properly', () => {
        const currentValue = "$25,000.00"
        const wrapper = mount(DataHistoryChart, config)
        expect(wrapper.find(".fb-data-history-chart-hero h3").text()).toBe(currentValue);
    })

    it('renders change amount properly', () => {
        const currentValue = "$10,000.00"
        const wrapper = mount(DataHistoryChart, config)
        expect(wrapper.find(".fb-data-history-chart-change span:first-child").text()).toBe(currentValue);
    })

    it('renders change percent properly', () => {
        const currentValue = "0.40%"
        const wrapper = mount(DataHistoryChart, config)
        expect(wrapper.find(".fb-data-history-chart-change span:last-child").text()).toBe(currentValue);
    })

    it('renders as of date properly', () => {
        const currentValue = "10/04/2023"
        const wrapper = mount(DataHistoryChart, config)
        expect(wrapper.find(".fb-data-history-chart-date").text()).toContain(currentValue);
    })
});