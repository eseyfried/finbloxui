import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import TopClientsByAum from '@/components/Advisor/Clients/TopClientsByAum/TopClientsByAum.vue';
import * as formatters from "@/modules/useFormatter";

describe('TopClientsByAum', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            clients: ["Smith Houshold", "Jim Jones"],
            data: [500000.00, 1000000.00],
            clientLabel: "Clients",
            aumLabel: "Total Assets Under Management",
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(TopClientsByAum, config)
        expect(wrapper.find(".fb-top-clients-by-aum").exists()).toBe(true);
    })
    it('renders client label prop properly', () => {
        const wrapper = mount(TopClientsByAum, config)
        expect(wrapper.find(".fb-top-clients-by-aum th:first-child").text()).toBe(config.props.clientLabel);
    })
    it('renders aum label prop properly', () => {
        const wrapper = mount(TopClientsByAum, config)
        expect(wrapper.find(".fb-top-clients-by-aum th:last-child").text()).toBe(config.props.aumLabel);
    })
    it('expects rendered clients to match clients prop', () => {
        const wrapper = mount(TopClientsByAum, config)
        const renderedClients = wrapper.findAll(".fb-top-clients-by-aum tr td:first-child").map( el => el.text());
        expect(renderedClients).toEqual(config.props.clients);
    })
    it('expects rendered data to match data prop', () => {
        const wrapper = mount(TopClientsByAum, config)
        const renderedClients = wrapper.findAll(".fb-top-clients-by-aum tr td:nth-child(2)").map( el => el.text());
        expect(renderedClients).toEqual(config.props.data.map(item => formatters.formatCurrency(item)));
    })
    it('expects bar charts for each aum data point', () => {
        const wrapper = mount(TopClientsByAum, config)
        const widths = wrapper.findAll(".fb-top-clients-by-aum tr .fb-top-clients-by-aum-bar").map( el => el.attributes()["width"]);
        const expectedWidths = [ '83.33333333333334', '166.66666666666669' ];
        expect(widths).toEqual(expectedWidths);
        
    })
});