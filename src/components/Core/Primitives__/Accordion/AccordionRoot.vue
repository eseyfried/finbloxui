<script>
import { ref, mergeProps } from 'vue';
import { PrimitiveProps } from '@/components/Core/Primitives/Primitive';
import { createContext, useDirection } from '@/modules/shared';

export const AccordionRootEmits = ['update:modelValue']

export const AccordionRootContext = {
    disabled: ref(),
    direction: ref(),
    orientation: ref(),
    collapsible: ref(),
    parentElement: ref(),
    isSingle: computed(() => props.type === 'single'),
    changeModelValue: ref(),
    modelValue: ref()
}

export const [injectAccordionRootContext, provideAccordionRootContext]
  = createContext('AccordionRoot')
</script>
<script setup>
import {
  Primitive,
  usePrimitiveElement,
} from '@/components/Core/Primitives/Primitive';
import { useSingleOrMultipleValue } from '@/modules/shared/useSingleOrMultipleValue'
import { computed, toRefs } from 'vue';
const props = defineProps(mergeProps(PrimitiveProps, {
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
        default: null
    },
    collapsible: {
        type: Boolean,
        default: true,
    },
    dir: {
        type: String,
        default: "ltr",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    orientation: {
        type: String,
        default: "vertical",
        validate: (value) => ["vertical", "horizontal"].includes(value)
    },
    modelValue: {
        type: [String, Array],
        default: null
    }
}));
const emits = defineEmits(AccordionRootEmits);
const { dir, disabled, orientation, collapsible } = toRefs(props);
const direction = useDirection(dir);

const { modelValue, changeModelValue } = useSingleOrMultipleValue(props, emits);

const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();

provideAccordionRootContext({
    disabled,
    direction,
    orientation,
    collapsible,
    parentElement,
    isSingle: computed(() => props.type === 'single'),
    modelValue,
    changeModelValue,
});

defineExpose({
  modelValue,
})
</script>
<template>
    <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
        <slot :model-value="modelValue" />
    </Primitive>
</template>