<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Core/Label"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" class="tw-w-3/4" />
        </template>
        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <Label :as="state.as">as: {{ state.as }}</Label>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import Label from "@/components/Core/Label/Label"
const state = reactive({
    as: defaultValue(Label, 'as'),
})

const initState = (props) => {
    return {
        ...state,
        ...props
    }
}
</script>