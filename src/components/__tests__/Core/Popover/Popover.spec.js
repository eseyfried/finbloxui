import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import Popover from '@/components/Core/Popover/Popover.vue'

describe('Popover', () => {
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
        const wrapper = mount(Popover, config)
        expect(wrapper.find(".fb-popover").exists()).toBe(false);
    })
});