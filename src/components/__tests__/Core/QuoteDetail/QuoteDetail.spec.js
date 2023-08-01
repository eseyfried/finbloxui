import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import QuoteDetail from '@/components/Core/QuoteDetail/QuoteDetail.vue'

describe('QuoteDetail', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            show: true,
            showDetails: true,
            symbol: "AAPL",
            security_description: "Apple, Inc.",
            current_price: 192.75,
            price_change_amt: -0.81,
            price_change_pct: 0.42,
            previous_close_price: 191.94,
            day_low_price: 192.25,
            day_high_price: 194.91,
            exchange: "NASDAQ",
            volume: "5.38M",
            bid: 192.75,
            ask: 191.75,
            pe_ratio: 32.75,
            dividend_yield: 0.50,
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

    it('shows loading until symbol and description props are set', async () => {
        config.props.symbol = null;
        config.props.security_description = null;
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-loading").exists()).toBe(true);
        await wrapper.setProps({ symbol: "AAPL", security_description: "Apple" })
        expect(wrapper.find(".fb-loading").exists()).toBe(false);
    })

    it('shows loading until callback returns data', async () => {
        config.props.callbackOn = "show";
        config.props.callback = async (symbol) => {
            return {
                symbol: "AAPL"
            }
        }
        const wrapper = mount(QuoteDetail, config)
        expect( wrapper.find(".fb-loading").exists()).toBe(true);
        await wrapper.vm.$nextTick(); // wait for DOM to update
        expect(wrapper.find(".fb-loading").exists()).toBe(false);
    })

    it('full quote details are visible when showDetails prop is true', async () => {
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details").exists()).toBe(true);
    })

    it('full quote details are NOT visible when showDetails prop is false', async () => {
        config.props.showDetails = false;
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details").exists()).toBe(false);
    })

    it('previous_close_price is visible when value is set', async () => {
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='previous_close_price']").exists()).toBe(true);
    })

    it('previous_close_price is NOT visible when value is set', async () => {
        config.props.previous_close_price = null;
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='previous_close_price']").exists()).toBe(false);
    })

    it('day_range is visible when value is set', async () => {
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='day_range']").exists()).toBe(true);
    })

    it('day_range is NOT visible when value is set', async () => {
        config.props.day_high_price = null;
        config.props.day_low_price = null;
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='day_range']").exists()).toBe(false);
    })

    it('volume is visible when value is set', async () => {
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='volume']").exists()).toBe(true);
    })

    it('volume is NOT visible when value is set', async () => {
        config.props.volume = null;
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='volume']").exists()).toBe(false);
    })

    it('pe_ratio is visible when value is set', async () => {
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='pe_ratio']").exists()).toBe(true);
    })

    it('volume is NOT visible when value is set', async () => {
        config.props.pe_ratio = null;
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='pe_ratio']").exists()).toBe(false);
    })

    it('dividend_yield is visible when value is set', async () => {
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='dividend_yield']").exists()).toBe(true);
    })

    it('dividend_yield is NOT visible when value is set', async () => {
        config.props.dividend_yield = null;
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='dividend_yield']").exists()).toBe(false);
    })

    it('bid_ask is visible when value is set', async () => {
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='bid_ask']").exists()).toBe(true);
    })

    it('bid_ask is NOT visible when value is set', async () => {
        config.props.bid = null;
        config.props.ask = null;
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='bid_ask']").exists()).toBe(false);
    })

    it('exchange is visible when value is set', async () => {
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='exchange']").exists()).toBe(true);
    })

    it('exchange is NOT visible when value is set', async () => {
        config.props.exchange = null;
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='exchange']").exists()).toBe(false);
    })

    it('previous_close_price is formatted as currency', async () => {
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='previous_close_price'] span").text()).toBe("$191.94");
    })

    it('day range is formatted as currency', async () => {
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='day_range'] span").text()).toBe("$192.25 - $194.91");
    })

    it('bid ask is formatted as currency', async () => {
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='bid_ask'] span").text()).toBe("$192.75 / $191.75");
    })

    it('dividend_yield is formatted as percent', async () => {
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='dividend_yield'] span").text()).toBe("0.50%");
    })

    it('labels can be overridden when prop is passed', async () => {
        const wrapper = mount(QuoteDetail, config)
        expect(wrapper.find(".fb-quote-detail-details li[data-field='dividend_yield'] label").text()).toBe("Dividend Yield");
        await wrapper.setProps({ labels: { dividend_yield: "Yield" } })
        expect(wrapper.find(".fb-quote-detail-details li[data-field='dividend_yield'] label").text()).toBe("Yield");
    })
});