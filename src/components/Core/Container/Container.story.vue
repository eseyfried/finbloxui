<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Story
        title="Core/Container"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstText type="text" v-model="state.as" title="as" class="tw-w-3/4" />
        </template>
        <Variant title="Default" :init-state="initState">
            <template #default="{state}">
                <Container :as="state.as">as: {{ state.as }}</Container>
            </template>
        </Variant>
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import Container from '@/components/Core/Container/Container'
const state = reactive({
    as: defaultValue(Container, 'as'),
})

const initState = (props) => {
    return {
        ...state,
        ...props
    }
}
</script>