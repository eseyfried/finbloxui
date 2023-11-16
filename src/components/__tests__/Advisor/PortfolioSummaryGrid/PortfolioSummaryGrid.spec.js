import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import PortfolioSummaryGrid from '@/components/Advisor/PortfolioSummaryGrid/PortfolioSummaryGrid.vue'

describe('PortfolioSummaryGrid', () => {
    let config;
    beforeEach(() => {
      config = {
        attachTo: document.body,
        props: {
            portfolio: [
                { account: "Smith Retirement", as_of: "2023-10-27", cash_value: "10000.00", securities_value:  "48000.00", current_value: "58000.00", change_amount: "1400.00", change_pct: "1.00" },
                { account: "Smith Trust", as_of: "2023-10-27", cash_value: "1000.00", securities_value:  "105000.00", current_value: "1060000.00", change_amount: "1400.00", change_pct: "1.50" }
            ],
            columnLabels: {
                "account": "Account",
                "as_of": "As Of Date",
                "cash": "Cash",
                "securities": "Holdings",
                "current_value": "Current Value",
                "change_amount": "Change ($)",
                "change_pct": "Change (%)"
            },
            showTotal: true
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
          stubs: { teleport: true }
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(PortfolioSummaryGrid, config)
        expect(wrapper.find(".fb-portfolio-summary-grid").exists()).toBe(true);
    });

    it('renders portfolio data', () => {
        const wrapper = mount(PortfolioSummaryGrid, config)
        expect(wrapper.findAll(".fb-portfolio-summary-grid tbody tr").length).toBe(3);
    })

    it('columLabels props renders properly', () => {
        const wrapper = mount(PortfolioSummaryGrid, config);
        const columns = wrapper.findAll(".fb-portfolio-summary-grid th").map(column => column.text());
        expect(columns).toMatchObject(Object.values(config.props.columnLabels));
    })

    it('totals are disabled when showtotals prop is false', () => {
        config.props.showTotals = false;
        const wrapper = mount(PortfolioSummaryGrid, config)
        expect(wrapper.findAll(".fb-portfolio-summary-grid tbody tr").length).toBe(2);
    })
});
