import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import AssetAllocationChart from '@/components/Core/Charts/AssetAllocationChart/AssetAllocationChart.vue'

describe('AssetAllocationChart', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            labels: ["Equity", "Options", "Funds"],
            data: [50,20,30],
            totalLabel: "Total Value",
            totalAmount: "1000.00",
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(AssetAllocationChart, config)
        expect(wrapper.find(".fb-asset-allocation-chart canvas").exists()).toBe(true);
    })

    it.skip('chart legend renders properly', () => {
        const wrapper = mount(AssetAllocationChart, config);
        expect(wrapper.find(".fb-asset-allocation-chart .fb-chart-legend ul").exists()).toBe(true);
    })

    it('displays warning when allocations don\'t add up to 100%', () => {
        config.props.format = "percent";
        config.props.data = [50, 50, 50];
        const wrapper = mount(AssetAllocationChart, config)
        expect(wrapper.find(".fb-asset-allocation-chart p").exists()).toBe(true);
    })

    it('renders total section label properly', () => {
        const wrapper = mount(AssetAllocationChart, config)
        expect(wrapper.find(".fb-asset-allocation-chart .fb-asset-allocation-chart-hero h2").text()).toBe(config.props.totalLabel);
    })

    it('renders total section amount properly', () => {
        const wrapper = mount(AssetAllocationChart, config)
        expect(wrapper.find(".fb-asset-allocation-chart .fb-asset-allocation-chart-hero h3").text()).toBe("$1,000.00");
    })

    it('total section is hidden when showTotal prop is false', () => {
        config.props.showTotal = false;
        const wrapper = mount(AssetAllocationChart, config)
        expect(wrapper.find(".fb-asset-allocation-chart .fb-asset-allocation-chart-hero").exists()).toBe(false);
    })
});