import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import TopClientsByFees from '@/components/Advisor/Clients/TopClientsByFees/TopClientsByFees.vue';
import * as formatters from "@/modules/useFormatter";

describe('TopClientsByFees', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            clients: ["Smith Houshold", "Jim Jones"],
            data: [500000.00, 1000000.00],
            clientLabel: "Clients",
            feesLabel: "Total Fees",
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(TopClientsByFees, config)
        expect(wrapper.find(".fb-top-clients-by-fees").exists()).toBe(true);
    })
    it('renders client label prop properly', () => {
        const wrapper = mount(TopClientsByFees, config)
        expect(wrapper.find(".fb-top-clients-by-fees th:first-child").text()).toBe(config.props.clientLabel);
    })
    it('renders fees label prop properly', () => {
        const wrapper = mount(TopClientsByFees, config)
        expect(wrapper.find(".fb-top-clients-by-fees th:last-child").text()).toBe(config.props.feesLabel);
    })
    it('expects rendered clients to match clients prop', () => {
        const wrapper = mount(TopClientsByFees, config)
        const renderedClients = wrapper.findAll(".fb-top-clients-by-fees tr td:first-child").map( el => el.text());
        expect(renderedClients).toEqual(config.props.clients);
    })
    it('expects rendered data to match data prop', () => {
        const wrapper = mount(TopClientsByFees, config)
        const renderedClients = wrapper.findAll(".fb-top-clients-by-fees tr td:last-child").map( el => el.text());
        expect(renderedClients).toEqual(config.props.data.map(item => formatters.formatCurrency(item)));
    })
    it('expects bar charts for each fees data point', () => {
        const wrapper = mount(TopClientsByFees, config)
        const widths = wrapper.findAll(".fb-top-clients-by-fees .fb-top-clients-by-fees-bar").map( el => el.attributes()["style"].replace(/[ width:%;]/g, ""));
        const expectedWidths = [ '83.33333333333334', '166.66666666666669' ];
        expect(widths).toEqual(expectedWidths);
        
    })
});