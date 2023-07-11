---
to: src/components/<%=path%>/<%=h.inflection.camelize(name, false)%>/<%=h.inflection.camelize(name)%>.vue
---
<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-<%= h.changeCase.paramCase(name) %>">
        <slot :props="props">
            Hello World<!-- fallback content -->
        </slot>
    </div>
</template>
<script setup>
// imports
import * as formatters from "@/modules/useFormatter";

// vars
const props = defineProps({});
const emit = defineEmits(['fb-<%= h.changeCase.paramCase(name) %>']);

// methods
const handleEvent = () => {
    emit("fb-<%= h.changeCase.paramCase(name) %>:click", null);
}
</script>
<style lang="scss" scoped>
</style>