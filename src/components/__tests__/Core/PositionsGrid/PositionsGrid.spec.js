import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import PositionsGrid from '@/components/Core/PositionsGrid/PositionsGrid.vue'

describe('PositionsGrid', () => {
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
        const wrapper = mount(PositionsGrid, config)
        expect(wrapper.find(".fb-positions-grid").exists()).toBe(true);
    })
});