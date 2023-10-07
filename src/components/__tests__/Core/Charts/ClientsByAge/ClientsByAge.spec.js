import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import ClientsByAge from '@/components/Core/Charts/ClientsByAge/ClientsByAge.vue'

describe('ClientsByAge', () => {
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
        const wrapper = mount(ClientsByAge, config)
        expect(wrapper.find(".fb-clients-by-age").exists()).toBe(true);
    })
});