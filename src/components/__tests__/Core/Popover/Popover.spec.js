import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Popover from '@/components/Core/Popover/Popover.vue'

describe('Popover', () => {
    const triggerButton = document.createElement("button");
    triggerButton.setAttribute("id", "show");
    document.body.appendChild(triggerButton);
    let config;
    beforeEach(() => {
      config = {
        props: {
            selector: "#show",
            trigger: "click"
        },
        global: {
          plugins: [],
        },
        slots: {
            default: '<div class="popover-content"></div>'
        }
      };
      
    });

    it('renders properly', async () => {
        const wrapper = mount(Popover, config);
        expect(wrapper.find(".fb-popover").exists()).toBe(true);
    })

    it('popover appears when trigger target is clicked', async () => {
        const wrapper = mount(Popover, config);
        const mouseEvent = new Event('click');
        const triggerButton = document.querySelector("#show");
        triggerButton.dispatchEvent(mouseEvent);
        expect(wrapper.attributes()["data-show"]).toBe("");
    })

    it('popover appears when trigger target is hovered', async () => {
        config.props.trigger = "hover";
        const wrapper = mount(Popover, config);
        const mouseEvent = new Event('mouseenter');
        const triggerButton = document.querySelector("#show");
        triggerButton.dispatchEvent(mouseEvent);
        expect(wrapper.attributes()["data-show"]).toBe("");
    })
});