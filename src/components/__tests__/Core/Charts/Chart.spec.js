import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import Chart from '@/components/Core/Charts/Chart.vue'

describe('Chart', () => {
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
        const wrapper = mount(Chart, config)
        expect(wrapper.find(".fb-chart").exists()).toBe(true);
    })
});