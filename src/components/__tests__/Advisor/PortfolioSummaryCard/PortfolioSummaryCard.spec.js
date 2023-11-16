import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import PortfolioSummaryCard from '@/components/Advisor/PortfolioSummaryCard/PortfolioSummaryCard.vue';
import * as formatters from "@/modules/useFormatter";

describe('PortfolioSummaryCard', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            currentValueLabel: "Current Value",
            cashLabel: "Cash",
            securitiesLabel: "Holdings",
            changeLabel: "Today's Change",
            currentValue: "2913680.40",
            cashValue: "45000.40",
            securitiesValue: "2868680.40",
            changeAmount: "28686.804",
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(PortfolioSummaryCard, config)
        expect(wrapper.find(".fb-portfolio-summary-card").exists()).toBe(true);
    })

    it('current value label renders properly', () => {
        const wrapper = mount(PortfolioSummaryCard, config)
        expect(wrapper.find(".fb-portfolio-summary-card-current-value-label").text()).toBe(config.props.currentValueLabel);
    })

    it('current value renders properly', () => {
        const wrapper = mount(PortfolioSummaryCard, config)
        expect(wrapper.find(".fb-portfolio-summary-card-current-value").text()).toBe(formatters.formatCurrency(config.props.currentValue));
    })

    it('cash label renders properly', () => {
        const wrapper = mount(PortfolioSummaryCard, config)
        expect(wrapper.find(".fb-portfolio-summary-card-cash-label").text()).toBe(config.props.cashLabel);
    })

    it('cash value renders properly', () => {
        const wrapper = mount(PortfolioSummaryCard, config)
        expect(wrapper.find(".fb-portfolio-summary-card-cash").text()).toBe(formatters.formatCurrency(config.props.cashValue));
    })

    it('securities label renders properly', () => {
        const wrapper = mount(PortfolioSummaryCard, config)
        expect(wrapper.find(".fb-portfolio-summary-card-securities-label").text()).toBe(config.props.securitiesLabel);
    })

    it('securities value renders properly', () => {
        const wrapper = mount(PortfolioSummaryCard, config)
        expect(wrapper.find(".fb-portfolio-summary-card-securities").text()).toBe(formatters.formatCurrency(config.props.securitiesValue));
    })

    it('change label renders properly', () => {
        const wrapper = mount(PortfolioSummaryCard, config)
        expect(wrapper.find(".fb-portfolio-summary-card-change-label").text()).toBe(config.props.changeLabel);
    })

    it('change value renders properly', () => {
        const wrapper = mount(PortfolioSummaryCard, config)
        const expected = `${formatters.formatCurrency(config.props.changeAmount)} (1.00%)`;
        expect(wrapper.find(".fb-portfolio-summary-card-change").text()).toBe(expected);
    })

    it('fb-positive class exists when changeAmount is positive', () => {
        const wrapper = mount(PortfolioSummaryCard, config)
        expect(wrapper.find(".fb-portfolio-summary-card-change.fb-positive").exists()).toBe(true);
    })
   

    
});