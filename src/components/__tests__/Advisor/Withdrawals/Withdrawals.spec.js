import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import Withdrawals from '@/components/Advisor/Withdrawals/Withdrawals.vue'

describe('Withdrawals', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            label: "Withdrawals",
            descriptionLabel: "Description",
            amountLabel: "Amount",
            dateLabel: "Date",
            showTransactions: true,
            data: [
                { description: "text", date: "2023-02-01", amount: "100.00" },
                { description: "text", date: "2023-03-01", amount: "100.00" },
                { description: "text", date: "2023-01-01", amount: "100.00" },
            ],
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(Withdrawals, config)
        expect(wrapper.find(".fb-withdrawals").exists()).toBe(true);
    })
    it('renders label properly', () => {
        const wrapper = mount(Withdrawals, config)
        expect(wrapper.find(".fb-withdrawals h3").text()).toBe(config.props.label);
    })

    it('renders total withdrawals properly', () => {
        const wrapper = mount(Withdrawals, config)
        expect(wrapper.find(".fb-withdrawals h2").text()).toBe("$300.00");
    })

    it('renders descriptionLabel prop properly', () => {
        const wrapper = mount(Withdrawals, config)
        expect(wrapper.find(".fb-withdrawals-transactions-desc").text()).toBe(config.props.descriptionLabel);
    })

    it('renders dateLabel prop properly', () => {
        const wrapper = mount(Withdrawals, config)
        expect(wrapper.find(".fb-withdrawals-transactions-date").text()).toBe(config.props.dateLabel);
    })

    it('renders amountLabel prop properly', () => {
        const wrapper = mount(Withdrawals, config)
        expect(wrapper.find(".fb-withdrawals-transactions-amount").text()).toBe(config.props.amountLabel);
    })

    it('renders data rows properly', () => {
        const wrapper = mount(Withdrawals, config)
        expect(wrapper.findAll("tbody tr").length).toBe(3);
    })

    it('hides transactions when showTransactions prop is false', () => {
        config.props.showTransactions = false;
        const wrapper = mount(Withdrawals, config)
        expect(wrapper.find("table").exists()).toBe(false);
    })

    it('hides as of date when showDate prop is false', () => {
        config.props.showDate = false;
        const wrapper = mount(Withdrawals, config)
        expect(wrapper.find("h4").exists()).toBe(false);
    })

    it('show as of date properly', () => {
        const wrapper = mount(Withdrawals, config)
        expect(wrapper.find("h4").text()).toBe("As of: 03/01/2023");
    })

    
});