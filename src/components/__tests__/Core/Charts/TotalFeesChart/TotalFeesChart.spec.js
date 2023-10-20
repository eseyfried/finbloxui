import { describe, it, expect, beforeEach } from 'vitest';
import * as formatters from "@/modules/useFormatter";
import { mount } from '@vue/test-utils';
import TotalFeesChart from '@/components/Core/Charts/TotalFeesChart/TotalFeesChart.vue'
import { arraySum } from "@/modules/useArrayUtils";

describe('TotalFeesChart', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            dates: ["2023-01-01", "2023-02-01", "2023-03-01"],
            data: [1000000.00, 1005000.00, 1003000.00],
            label: "YTD Total Fees",
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(TotalFeesChart, config)
        expect(wrapper.find(".fb-total-fees-chart").exists()).toBe(true);
    })
    it('renders total fees hero label properly', () => {
        const wrapper = mount(TotalFeesChart, config)
        expect(wrapper.find(".fb-total-fees-chart-hero h2").text()).toBe(config.props.label);
    })
    it('renders total fees hero value properly', () => {
        const { props: { data } } = config;
        const wrapper = mount(TotalFeesChart, config)
        expect(wrapper.find(".fb-total-fees-chart-hero h3").text()).toBe(formatters.formatCurrency(arraySum(data)));
    })
    it('renders total fees hero asOf properly', () => {
        const { props: { dates } } = config;
        const wrapper = mount(TotalFeesChart, config)
        expect(wrapper.find(".fb-total-fees-chart-hero span").text()).toBe(`As of: ${formatters.formatDate(dates[dates.length - 1])}`);
    })

    it('click monthly button applies selected css class', async () => {
        const wrapper = mount(TotalFeesChart, config)
        const mnthButton = wrapper.findAll("button")[0];
        const qtrButton = wrapper.findAll("button")[1];
        await qtrButton.trigger("click");
        await mnthButton.trigger("click");
        expect(mnthButton.attributes()["class"]).toContain("fb-total-fees-chart-button-selected");
    })
    it('click quarterly button applies selected css class', async () => {
        const wrapper = mount(TotalFeesChart, config)
        const button = wrapper.findAll("button")[1];
        await button.trigger("click");
        expect(button.attributes()["class"]).toContain("fb-total-fees-chart-button-selected");
    })
});