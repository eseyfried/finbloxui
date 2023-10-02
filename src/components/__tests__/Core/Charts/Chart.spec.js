import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import Chart from '@/components/Core/Charts/Chart.vue'

describe('Chart', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            data: {
                labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
                datasets: [{
                  data: [12, 19, 3, 5, 2, 3],
                }]
            },
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(Chart, config)
        expect(wrapper.find(".fb-chart").exists()).toBe(true);
    })
});