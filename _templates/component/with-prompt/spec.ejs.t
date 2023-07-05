---
to: src/components/__tests__/<%=path%>/<%=h.inflection.camelize(name)%>/<%=h.inflection.camelize(name)%>.spec.js
---
import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import <%=h.inflection.camelize(name)%> from '@/components/<%=path%>/<%=h.inflection.camelize(name)%>/<%=h.inflection.camelize(name)%>.vue'

describe('<%=h.inflection.camelize(name)%>', () => {
    let config;
    beforeEach(() => {
      config = {
        props: {
            
        },
        global: {
          plugins: [], // <-- This is how you pass options to a plugin
        },
      };
    });

    it('renders properly', () => {
        const wrapper = mount(<%=h.inflection.camelize(name)%>, config)
        expect(wrapper.find(".fb-<%= h.changeCase.paramCase(name) %>").exists()).toBe(true);
    })
});