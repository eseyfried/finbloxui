import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import ClientCard from '@/components/Advisor/Clients/ClientCard';
import { client } from '@/components/__tests__/modules/clientFixture';

describe('ClientCard', () => {
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
        const wrapper = mount(ClientCard, config)
        expect(wrapper.find(".fb-client-card").exists()).toBe(true);
    })

    it('stats section is rendered by default', () => {
        const wrapper = mount(ClientCard, config)
        expect(wrapper.findAll(".fb-client-card-stats li").length).toBe(2);
    })

    it('stats section is hidden when showStats prop is false', () => {
        config.props.showStats = false
        const wrapper = mount(ClientCard, config)
        expect(wrapper.find(".fb-client-card-stats").exists()).toBe(false);
    })

    it('stats section renders content properly', () => {
        const wrapper = mount(ClientCard, config)
        expect(wrapper.find(".fb-client-card-stats li label").text()).toBe(config.props.client.stats[0].label);
        expect(wrapper.find(".fb-client-card-stats li span").text()).toBe("$123,456.78");
    })
    
    it('contact info section is rendered by default', () => {
        const wrapper = mount(ClientCard, config)
        expect(wrapper.find(".fb-client-card-contact-info").exists()).toBe(true);
    })

    it('contact into section is hidden when showContactInfo prop is false', () => {
        config.props.showContactInfo = false
        const wrapper = mount(ClientCard, config)
        expect(wrapper.find(".fb-client-card-contact-info").exists()).toBe(false);
    })

    it('email section renders content properly', () => {
        const wrapper = mount(ClientCard, config)
        const contactEls = wrapper.findAll(".fb-client-card-contact-info li");
        expect(contactEls[0].find("label").text()).toBe(config.props.client.contact_info.email.label);
        expect(contactEls[0].find("a").text()).toBe(config.props.client.contact_info.email.value);
    })

    it('phone section renders content properly', () => {
        const wrapper = mount(ClientCard, config)
        const contactEls = wrapper.findAll(".fb-client-card-contact-info li");
        expect(contactEls[1].find("label").text()).toBe(config.props.client.contact_info.phone[0].label);
        expect(contactEls[1].find("a").text()).toBe(config.props.client.contact_info.phone[0].value);
    })

    it('address section renders content properly', () => {
        const wrapper = mount(ClientCard, config)
        expect(wrapper.find(".fb-client-card-contact-info li address").text()).contains(config.props.client.contact_info.address.street_1);
        expect(wrapper.find(".fb-client-card-contact-info li address").text()).contains(config.props.client.contact_info.address.street_2);
        expect(wrapper.find(".fb-client-card-contact-info li address").text()).contains(config.props.client.contact_info.address.city);
        expect(wrapper.find(".fb-client-card-contact-info li address").text()).contains(config.props.client.contact_info.address.state);
        expect(wrapper.find(".fb-client-card-contact-info li address").text()).contains(config.props.client.contact_info.address.postal_code);
    })

    it('details link is rendered by default', () => {
        const wrapper = mount(ClientCard, config)
        expect(wrapper.find("a[href='#']").exists()).toBe(true);
    })

    it('details link is hidden when showDetailsLink prop is false', () => {
        config.props.showDetailsLink = false
        const wrapper = mount(ClientCard, config)
        expect(wrapper.find("a[href='#']").exists()).toBe(false);
    })

    it("should emit event when email link is clicked", async () => {
        const wrapper = mount(ClientCard, config);
        // use this instead of .trigger("click") to avoid error from browser mailto prompt
        const event = new Event("click");
        await wrapper.find(`a[href='mailto:${config.props.client.contact_info.email.value}']`).element.dispatchEvent(event);
        const emitted = wrapper.emitted("fb-client-card-contact-link:click");
        expect(emitted.length).toBe(1);
    });

    it("should emit event when phone link is clicked", async () => {
        const wrapper = mount(ClientCard, config);
        // use this instead of .trigger("click") to avoid error from browser tel prompt
        const event = new Event("click");
        await wrapper.find(`a[href='tel:${config.props.client.contact_info.phone[0].value}']`).element.dispatchEvent(event);
        const emitted = wrapper.emitted("fb-client-card-contact-link:click");
        expect(emitted.length).toBe(1);
    });

    it("should emit event when details link is clicked", async () => {
        const wrapper = mount(ClientCard, config);
        await wrapper.find("a[href='#']").trigger("click");
        const emitted = wrapper.emitted("fb-client-card-details-link:click");
        expect(emitted.length).toBe(1);
    });
})
