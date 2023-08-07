import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import UGLGrid from '@/components/Core/UGLGrid/UGLGrid.vue'

describe('UGLGrid', () => {
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
        const wrapper = mount(UGLGrid, config)
        expect(wrapper.find(".fb-ugl-grid").exists()).toBe(true);
    })
});