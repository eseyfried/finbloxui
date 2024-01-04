import { defineComponent, h } from 'vue';
import { Slot } from './Slot'

export const AsTag = {
    /**
     * The controlled value of the item to expand when type is "single" or the controlled values of the items to expand when type is "multiple".
     */
    modelValue: []
}


export const PrimitiveProps = {
    /**
     * Setting "asChild" to true has the same effect as setting "as" to "template".
     * @default false
     */
    asChild: Boolean,
    /**
     * @default "div"
     */
    // as: AsTag | Component
    as: {}
  }

  export const Primitive = defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Primitive',
    inheritAttrs: false,
    props: {
      asChild: {
        type: Boolean,
        default: false,
      },
      as: {
        type: [String, Object],
        default: 'div',
      },
    },
    setup(props, { attrs, slots }) {
      const asTag = props.asChild ? 'template' : props.as
      if (asTag !== 'template')
        return () => h(props.as, attrs, { default: slots.default })
  
      return () => h(Slot, attrs, { default: slots.default })
    },
  })