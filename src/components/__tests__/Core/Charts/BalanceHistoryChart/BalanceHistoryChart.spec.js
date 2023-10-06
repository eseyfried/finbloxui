import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import BalanceHistoryChart from '@/components/Core/Charts/BalanceHistoryChart/BalanceHistoryChart.vue'

describe('BalanceHistoryChart', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(BalanceHistoryChart, config)
        expect(wrapper.find(".fb-balance-history-chart").exists()).toBe(true);
    })
});