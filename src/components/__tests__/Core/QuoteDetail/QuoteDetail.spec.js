import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import QuoteDetail from '@/components/Core/QuoteDetail/QuoteDetail.vue'

describe('QuoteDetail', () => {
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
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail").exists()).toBe(true);
    })
});