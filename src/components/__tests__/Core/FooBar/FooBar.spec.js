import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import FooBar from '@/components/Core/FooBar/FooBar.vue'

describe('FooBar', () => {
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
        const wrapper = mount(FooBar, config)
        expect(wrapper.find(".fb-foo-bar").exists()).toBe(true);
    })
});