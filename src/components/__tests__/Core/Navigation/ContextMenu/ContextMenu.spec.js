import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import ContextMenu from '@/components/Core/Navigation/ContextMenu/ContextMenu.vue'

describe('ContextMenu', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            menuItems: [
                { url: null, label: "item 1" },
                { url: "some-url", label: "item 2"},
            ]
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(ContextMenu, config)
        expect(wrapper.find(".fb-action-menu").exists()).toBe(true);
    })

    it('rendered menuItems count match passed in items', () => {
        const wrapper = mount(ContextMenu, config)
        expect(wrapper.findAll(".fb-action-menu-item").length).toBe(config.props.menuItems.length);
    })

    it('null item.url renders href value as #', () => {
        const wrapper = mount(ContextMenu, config)
        expect(wrapper.find(".fb-action-menu-item a[href='#']").text()).toBe(config.props.menuItems[0].label);
    })


    it('item.url renders href value', () => {
        const wrapper = mount(ContextMenu, config)
        expect(wrapper.find(`.fb-action-menu-item a[href=${config.props.menuItems[1].url}]`).exists()).toBe(true);
    })

    it("should emit event when item is clicked", async () => {
        const wrapper = mount(ContextMenu, config);
        await wrapper.find("a[href='#']").trigger("click");
        const emitted = wrapper.emitted("fb-action-menu-item:click");
        expect(emitted.length).toBe(1);
    });
});