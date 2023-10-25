import { describe, it, expect, beforeEach } from 'vitest';
import * as formatters from "@/modules/useFormatter";
import { mount } from '@vue/test-utils';
import TotalAUMChart from '@/components/Core/Charts/TotalAUMChart/TotalAUMChart.vue'

describe('TotalAUMChart', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            dates: ["2023-01-01", "2023-02-01", "2023-03-01"],
            data: [1000000.00, 1005000.00, 1003000.00],
            label: "YTD Total AUM",
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(TotalAUMChart, config)
        expect(wrapper.find(".fb-total-aum-chart").exists()).toBe(true);
    })
    it('renders total aum hero label properly', () => {
        const wrapper = mount(TotalAUMChart, config)
        expect(wrapper.find(".fb-total-aum-chart-hero h2").text()).toBe(config.props.label);
    })
    it('renders total aum hero value properly', () => {
        const { props: { data } } = config;
        const wrapper = mount(TotalAUMChart, config)
        expect(wrapper.find(".fb-total-aum-chart-hero h3").text()).toBe(formatters.formatCurrency(data[data.length - 1]));
    })
    it('renders total aum hero asOf properly', () => {
        const { props: { dates } } = config;
        const wrapper = mount(TotalAUMChart, config)
        expect(wrapper.find(".fb-total-aum-chart-hero span").text()).toBe(`As of: ${formatters.formatDate(dates[dates.length - 1])}`);
    })

    it('click monthly button applies selected css class', async () => {
        const wrapper = mount(TotalAUMChart, config)
        const mnthButton = wrapper.findAll("button")[0];
        const qtrButton = wrapper.findAll("button")[1];
        await qtrButton.trigger("click");
        await mnthButton.trigger("click");
        expect(mnthButton.attributes()["class"]).toContain("fb-total-aum-chart-button-selected");
    })
    it('click quarterly button applies selected css class', async () => {
        const wrapper = mount(TotalAUMChart, config)
        const button = wrapper.findAll("button")[1];
        await button.trigger("click");
        expect(button.attributes()["class"]).toContain("fb-total-aum-chart-button-selected");
    })
});