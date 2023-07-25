import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import ColumnFilter from '@/components/DataTable/ColumnFilter/ColumnFilter.vue'

describe('ColumnFilter', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            selectOptions: ["some text'", "some more text", "some more text"],
            operator: "equality"
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(ColumnFilter, config)
        expect(wrapper.find(".fb-column-filter").exists()).toBe(true);
    })

    it('column filters appear when trigger button is clicked', async () => {
        const wrapper = mount(ColumnFilter, config);
        await wrapper.find(".fb-column-filter-button").trigger("click");
        expect(wrapper.find(".fb-column-filter-menu-visible").exists()).toBe(true);
    })

    it('filterType text renders input field', () => {
        const wrapper = mount(ColumnFilter, config)
        expect(wrapper.find(".fb-column-filter-input").exists()).toBe(true);
    })

    it('filterType select renders select field', () => {
        config.props.filterType = "select";
        const wrapper = mount(ColumnFilter, config)
        expect(wrapper.find(".fb-column-filter-select").exists()).toBe(true);
    })

    it('filterType select renders multiselect field', () => {
        config.props.filterType = "multiselect";
        const wrapper = mount(ColumnFilter, config)
        expect(wrapper.find(".fb-column-filter-select").exists()).toBe(true);
    })

    it('operator select renders when operator prop is set', () => {
        config.props.operator = "equality";
        const wrapper = mount(ColumnFilter, config)
        expect(wrapper.find(".fb-column-filter-operator").exists()).toBe(true);
    })

    it('equality operator uses equalityOperators prop', () => {
        config.props.operator = "equality";
        const wrapper = mount(ColumnFilter, config)
        expect(wrapper.find(".fb-column-filter-operator option").text()).toBe("Starts With");
    })

    it('comparison operator uses comparisonOperators prop', () => {
        config.props.operator = "comparison";
        const wrapper = mount(ColumnFilter, config)
        expect(wrapper.find(".fb-column-filter-operator option").text()).toBe("Equals");
    })

    it('filterType select renders options with no duplicates', () => {
        config.props.filterType = "select";
        const wrapper = mount(ColumnFilter, config)
        expect(wrapper.findAll(".fb-column-filter-select option").length).toBe(2);
    })

    it('clear button restors default filter state', async () => {
        config.props.filterType = "text";
        config.props.operator = "equality";
        const wrapper = mount(ColumnFilter, config)
        const input = wrapper.find(".fb-column-filter-input");
        const operator = wrapper.find(".fb-column-filter-operator");
        
        await wrapper.find(".fb-column-filter-button").trigger("click");

        await operator.setValue("contains"); // Contains
        await input.setValue("some text");
        expect(input.element.value).toBe("some text");
        expect(operator.element.value).toBe("contains");

        await wrapper.find(".fb-column-filter-clear-button").trigger("click");
        
        expect(input.element.value).toBe("");
        expect(operator.element.value).toBe("starts_with"); // Starts With
    })

    it('apply button should emit event passing filter options', async () => {
        config.props.filterType = "text";
        config.props.operator = "equality";
        const wrapper = mount(ColumnFilter, config)
        const input = wrapper.find(".fb-column-filter-input");
        const operator = wrapper.find(".fb-column-filter-operator");
        
        await wrapper.find(".fb-column-filter-button").trigger("click");

        await operator.setValue("contains"); // Contains
        await input.setValue("some text");

        await wrapper.find(".fb-column-filter-apply-button").trigger("click");
        const emitted = wrapper.emitted("fb-column-filter-apply-button:click");

        expect(emitted[0]).toEqual([
            {
                filterValue: "some text",
                filterOperator: "contains"
            }
        ]);
    })
});