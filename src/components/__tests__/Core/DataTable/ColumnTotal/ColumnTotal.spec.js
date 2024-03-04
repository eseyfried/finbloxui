import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import ColumnTotal from '@/components/DataTable/ColumnTotal/ColumnTotal.vue';
import Column from '@/components/DataTable/Column/Column.vue';


describe('ColumnTotal', () => {
    let config;
    beforeEach(() => {
        Column.props.field.default = "price";
        Column.props.header.default = "Price";
        Column.props.showTotal.default = true;
        Column.props.formatters.default = ["change-indicator"];
        config = {
            props: {
                column: {
                    type: Column,
                    props: { 
                        field: Column.props.field.default,
                        header: Column.props.header.default,
                        showTotal: Column.props.showTotal.default,
                        formatters: Column.props.formatters.default
                    }
                },
                rows: [
                    { symbol: "AAPL", price: 10.00 },
                    { symbol: "MSFT", price: 10.00 },
                ],
                grouped: false
            },
            global: {
            plugins: [], // <-- This is how you pass options to a plugin
            },
        };
    });

    it('renders properly', () => {
        const wrapper = mount(ColumnTotal, config)
        expect(wrapper.find(".fb-column-total").exists()).toBe(true);
    })

    it('column total equals sum of all rows for given column', () => {
        const wrapper = mount(ColumnTotal, config)
        expect(wrapper.find(".fb-column-total").text()).toBe("20");
    })

    it('column total is not shown when showTotal prop is false', () => {
        config.props.column.props.showTotal = false
        const wrapper = mount(ColumnTotal, config)
        expect(wrapper.find(".fb-column-total").text()).toBe("");
    })

    it('negative column total has the negative css class applied when change-indicator formatter is set', () => {
        config.props.rows = [
            { symbol: "AAPL", price: -10.00 },
            { symbol: "MSFT", price: -10.00 },
        ]
        const wrapper = mount(ColumnTotal, config);
        expect(wrapper.find(".fb-negative").exists()).toBe(true);
    })

    it('positive column total has the positive css class applied when change-indicator formatter is set', () => {
        const wrapper = mount(ColumnTotal, config);
        expect(wrapper.find(".fb-positive").exists()).toBe(true);
    })
});