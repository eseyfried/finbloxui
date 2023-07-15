import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import ColumnSelector from '@/components/DataTable/ColumnSelector/ColumnSelector.vue'

describe('ColumnSelector', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            columns: [
                { name: 'column_1', label: 'Column 1'},
                { name: 'column_2', label: 'Column 2'},
            ],
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(ColumnSelector, config)
        expect(wrapper.find(".fb-column-selector").exists()).toBe(true);
    })

    it('renders a list of columns', () => {
        const wrapper = mount(ColumnSelector, config)
        expect(wrapper.findAll(".fb-column-selector li").length).toBe(config.props.columns.length);
    })

    it('column list appears when trigger button is clicked', async () => {
        const wrapper = mount(ColumnSelector, config);
        await wrapper.find(".fb-column-selector-button").trigger("click");
        expect(wrapper.find(".fb-column-selector-visible").exists()).toBe(true);
    })

    it('column is added to selected columns when column is clicked', async () => {
        const wrapper = mount(ColumnSelector, config);
        await wrapper.find(".fb-column-selector-button").trigger("click");
        await wrapper.find(".fb-column-selector li a").trigger("click");
        const emitted = wrapper.emitted("fb-column-selector-selected:click");
        expect(emitted.length).toBe(1);
    })

    it('column is removed from selected columns when column is de-selected', async () => {
        const wrapper = mount(ColumnSelector, config);
        await wrapper.find(".fb-column-selector-button").trigger("click");
        const column = wrapper.find(".fb-column-selector li a");
        await column.trigger("click");
        await column.trigger("click");
        const emitted = wrapper.emitted("fb-column-selector-selected:click");
        expect(emitted[1][0].length).toBe(0);
    })

    it('selected column has css class applied when column is clicked', async () => {
        const wrapper = mount(ColumnSelector, config);
        await wrapper.find(".fb-column-selector-button").trigger("click");
        const column = wrapper.find(".fb-column-selector li");
        await column.find('a').trigger("click");
        
        expect(wrapper.find(".fb-column-selector li.fb-column-selector-selected").exists()).toBe(true);
    })

    it('selected column has css class removed when column is de-selected', async () => {
        const wrapper = mount(ColumnSelector, config);
        await wrapper.find(".fb-column-selector-button").trigger("click");
        const column = wrapper.find(".fb-column-selector li");
        await column.find('a').trigger("click");
        await column.find('a').trigger("click");
        
        expect(wrapper.find(".fb-column-selector li.fb-column-selector-selected").exists()).toBe(false);
    })
});