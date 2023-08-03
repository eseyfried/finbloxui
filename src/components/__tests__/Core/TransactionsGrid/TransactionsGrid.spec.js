import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import TransactionsGrid from '@/components/Core/TransactionsGrid/TransactionsGrid.vue'

describe('TransactionsGrid', () => {
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
        const wrapper = mount(TransactionsGrid, config)
        expect(wrapper.find(".fb-positions-grid").exists()).toBe(true);
    })
});