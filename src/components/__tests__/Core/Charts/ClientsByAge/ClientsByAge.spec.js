import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import ClientsByAge from '@/components/Core/Charts/ClientsByAge/ClientsByAge.vue'

describe('ClientsByAge', () => {
    let config;
    beforeEach(() => {
        config = {
            props: {
                labels: ["20-30", "31-40", "41-50"],
                data: [50,20,30],
                totalLabel: "Clients"
            },
            global: {
              plugins: [], // <-- This is how you pass options to a plugin
            },
          };
    });

    it('renders properly', () => {
        const wrapper = mount(ClientsByAge, config)
        expect(wrapper.find(".fb-clients-by-age-chart canvas").exists()).toBe(true);
    })

    it('renders total section label properly', () => {
        const wrapper = mount(ClientsByAge, config)
        expect(wrapper.find(".fb-clients-by-age-chart .fb-clients-by-age-chart-hero h2").text()).toBe(config.props.totalLabel);
    })

    it('renders total section value properly', () => {
        const wrapper = mount(ClientsByAge, config)
        expect(wrapper.find(".fb-clients-by-age-chart .fb-clients-by-age-chart-hero h3").text()).toBe("100");
    })

    it('total section is hidden when chart type is pie', () => {
        config.props.type = "pie";
        const wrapper = mount(ClientsByAge, config)
        expect(wrapper.find(".fb-clients-by-age-chart .fb-clients-by-age-chart-hero").exists()).toBe(false);
    })
});