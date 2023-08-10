import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import ColumnTotal from '@/components/DataTable/ColumnTotal/ColumnTotal.vue'

describe('ColumnTotal', () => {
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
        const wrapper = mount(ColumnTotal, config)
        expect(wrapper.find(".fb-column-total").exists()).toBe(true);
    })
});