<template>
    <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
        <slot :model-value="modelValue" />
    </Primitive>
</template>
<script>
import { mergeProps } from 'vue';
import { PrimitiveProps } from '@/components/Core/Primitive';
import { createContext, useDirection } from '@/modules/shared';
export const AccordionRootEmits = ['update:modelValue']

export const AccordionRootProps = mergeProps(PrimitiveProps, {
    type: {
        type: String,
        default: "single",
        validate: (value) => ["single", "multiple"].includes(value)
    },
    /**
     * The default value of the item to expand when type is "single" or the default values of the items to expand when type is "multiple".
     * Use when you do not need to control the state of the item(s).
     */
    defaultValue: {
        type: [String, Array],
        default: ''
    },
    collapsible: {
        type: Boolean,
        default: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    modelValue: {
        type: [String, Array],
        default: ''
    }
})

export const [injectAccordionRootContext, provideAccordionRootContext]
  = createContext('AccordionRoot')
</script>


<script setup>
import { computed, toRefs } from 'vue';
import {
  Primitive,
  usePrimitiveElement,
} from '@/components/Core/Primitive';
import { useSingleOrMultipleValue } from '@/modules/shared/useSingleOrMultipleValue'

const props = defineProps(AccordionRootProps)
const emits = defineEmits(AccordionRootEmits);
const { disabled, collapsible } = toRefs(props);

const { modelValue, changeModelValue } = useSingleOrMultipleValue(props, emits);

const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();

provideAccordionRootContext({
    disabled,
    collapsible,
    parentElement,
    direction: useDirection('ltr'),
    isSingle: computed(() => props.type === 'single'),
    modelValue,
    changeModelValue,
});

defineExpose({
  modelValue,
})
</script>
