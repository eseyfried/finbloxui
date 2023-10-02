import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import AssetAllocationChart from '@/components/Core/Charts/AssetAllocationChart/AssetAllocationChart.vue'

describe('AssetAllocationChart', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            assetCategories: ["Equity", "Options", "Funds"],
            allocations: [50,20,30]
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
        config.props.allocations = [50, 50, 50];
        const wrapper = mount(AssetAllocationChart, config)
        expect(wrapper.find(".fb-asset-allocation-chart p").exists()).toBe(true);
    })
});