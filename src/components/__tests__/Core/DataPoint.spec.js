import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import DataPoint from '@/components/Core/DataPoint';

describe('DataPoint', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            dataPoint: {
                label: "Total AUM",
                value: "12345678.90",
                format: "currency",
                trend: {
                    format: "currency",
                    value: 14526.34,
                    direction: "up"
                }
            }
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(DataPoint, config)
        expect(wrapper.find(".fb-data-point").exists()).toBe(true);
    })

    it('label renders properly', () => {
        const wrapper = mount(DataPoint, config)
        expect(wrapper.find(".fb-data-point h3").text()).toBe(config.props.dataPoint.label);
    })

    it('value renders properly', () => {
        config.props.dataPoint.format = null;
        const wrapper = mount(DataPoint, config)
        expect(wrapper.find(".fb-data-point h4").text()).toBe(config.props.dataPoint.value);
    })

    it('value renders as currency', () => {
        const wrapper = mount(DataPoint, config)
        expect(wrapper.find(".fb-data-point h4").text()).toBe("$12,345,678.90");
    })

    it('value renders as percent', () => {
        config.props.dataPoint.format = "percent";
        config.props.dataPoint.value = "10.23";
        const wrapper = mount(DataPoint, config)
        expect(wrapper.find(".fb-data-point h4").text()).toBe("10.23%");
    })

    it('value renders using custom formatter', () => {
        config.props.dataPoint.format = (value) => `${value}%`;
        config.props.dataPoint.value = "10.23";
        const wrapper = mount(DataPoint, config)
        expect(wrapper.find(".fb-data-point h4").text()).toBe("10.23%");
    })

    it('trend value renders properly', () => {
        const wrapper = mount(DataPoint, config)
        expect(wrapper.find(".fb-data-point-trend").text()).toBe("$14,526.34");
    })

    it('details link is hidden when showDetailsLink prop is set to false', () => {
        config.props.showDetailsLink = false;
        const wrapper = mount(DataPoint, config)
        expect(wrapper.find(".fb-data-point-footer a").exists()).toBe(false);
    })

    it('details link emits event when clicked', async () => {
        const wrapper = mount(DataPoint, config);
        await wrapper.find(".fb-data-point-footer a").trigger("click");
        const emitted = wrapper.emitted("fb-data-point-details-link:click");
        expect(emitted.length).toBe(1);
    })
});