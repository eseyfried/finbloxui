<template>
    <p>
        <slot>
            {{ desc }}
        </slot>
    </p>
</template>
<script setup>
import { propDesc } from "../modules/useStoryHelper";
const props = defineProps({
    component: {
        type: Object,
        required: true
    },
    prop: {
        type: String,
        required: true
    }
})
const desc = propDesc(props.component, props.prop)
</script>
<style scoped lang="scss">
p {
    margin: 0;
    margin-bottom: 0.5rem;
    margin-left: 7rem;
    padding-left: 1.0rem;
}
</style>