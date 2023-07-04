import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import ClientListItem from '@/components/Advisor/Clients/ClientListItem';
import { client } from '@/components/__tests__/modules/clientFixture';

describe('ClientListItem', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            client: client
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(ClientListItem, config)
        expect(wrapper.find(".fb-client-list-item").exists()).toBe(true);
    })

    it('stats section renders first item by default', () => {
        const wrapper = mount(ClientListItem, config)
        expect(wrapper.findAll(".fb-client-list-item-stats li").length).toBe(1);
    })

    it('stats section renders stat when showStatsByLabel is passed', () => {
        config.props.showStatsByLabel = ['Total Fees']
        const wrapper = mount(ClientListItem, config)
        expect(wrapper.find(".fb-client-list-item-stats li label").text()).toBe('Total Fees');
    })

    it('stats section renders content properly', () => {
        const wrapper = mount(ClientListItem, config)
        expect(wrapper.find(".fb-client-list-item-stats li label").text()).toBe(config.props.client.stats[0].label);
        expect(wrapper.find(".fb-client-list-item-stats li span").text()).toBe("$123,456.78");
    })
    
    it('details link is rendered by default', () => {
        const wrapper = mount(ClientListItem, config)
        expect(wrapper.find("a[href='#']").exists()).toBe(true);
    })

    it('details link is hidden when showDetailsLink prop is false', () => {
        config.props.showDetailsLink = false
        const wrapper = mount(ClientListItem, config)
        expect(wrapper.find("a[href='#']").exists()).toBe(false);
    })

    it("should emit event when details link is clicked", async () => {
        const wrapper = mount(ClientListItem, config);
        await wrapper.find("a[href='#']").trigger("click");
        const emitted = wrapper.emitted("fb-client-list-item-details-link:click");
        expect(emitted.length).toBe(1);
    });

})
