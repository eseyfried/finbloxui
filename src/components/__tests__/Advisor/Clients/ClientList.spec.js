import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import ClientList from '@/components/Advisor/Clients/ClientList/ClientListRoot.vue';
import { client } from '@/components/__tests__/modules/clientFixture';

describe('ClientList', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            clients: [client, client, client]
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(ClientList, config)
        expect(wrapper.find(".fb-client-list").exists()).toBe(true);
    })

    it('renders a list of clients', () => {
        const wrapper = mount(ClientList, config)
        expect(wrapper.findAll(".fb-client-list-item").length).toBe(config.props.clients.length);
    })

    it("should emit event when details link is clicked", async () => {
        const wrapper = mount(ClientList, config);
        await wrapper.find(".fb-client-list-item-action").trigger("click");
        const emitted = wrapper.emitted("fb-client-list-item:click");
        expect(emitted.length).toBe(1);
    });

    it('contact info section is rendered when clientCardOptions prop is passed', () => {
        config.props.type = "card";
        config.props.clientCardOptions = {};
        config.props.clientCardOptions.showContactInfo = true
        const wrapper = mount(ClientList, config);
        expect(wrapper.find(".fb-client-card-contact-info").exists()).toBe(true);
    })

    it('contact info section is hidden by default', () => {
        const wrapper = mount(ClientList, config)
        expect(wrapper.find(".fb-client-card-contact-info").exists()).toBe(false);
    })

    
})
