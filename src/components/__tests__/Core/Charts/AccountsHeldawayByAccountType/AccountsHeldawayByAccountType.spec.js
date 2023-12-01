import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import AccountsHeldawayByAccountType from '@/components/Core/Charts/AccountsHeldawayByAccountType/AccountsHeldawayByAccountType.vue'

describe('AccountsHeldawayByAccountType', () => {
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
        const wrapper = mount(AccountsHeldawayByAccountType, config)
        expect(wrapper.find(".fb-accounts-heldaway-by-account-type-chart").exists()).toBe(true);
    })
});