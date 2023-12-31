<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <button @click="showSource = !showSource">{{ label }}</button>
        <prism v-if="sourceCode && showSource" language="javascript">{{ sourceCode }}</prism>
    </div>
</template>
<script setup>
import { ref, computed } from "vue";

import "prismjs";
import "prismjs/themes/prism-funky.css";
import Prism from 'vue-prism-component';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    filename: {
        type: String,
        default: null,
        required: true
    },
    label: {
        type: String,
        default: "Show Source Code",
    },
    tag: {
        type: String,
        default: null,
        validator: (value) => ["template", "script", "style"].includes(value)
    },
    
});
const rawSource = ref(null);
const showSource = ref(false);

const fileType = props.filename.split(".")[1];
let importedFiles = {};
let importFileKey = "";
if (fileType == "vue") {
    /**
     * we use import.meta.glob as raw vs import(/path/to/file?raw) because
     * vite/rollup production build cannot handle dynamic imports with raw
     */
    importedFiles = import.meta.glob('./*.vue', { as: 'raw'});
    importFileKey = `./${props.filename}`;
} else if (fileType == "css") {
    importedFiles = import.meta.glob('./themes/*.css', { as: 'raw'});
    importFileKey = `./themes/${props.filename}`;
}
importedFiles[importFileKey]().then((resolve) => {
        rawSource.value = resolve;
});

const sourceCode = computed(() => {
    if(rawSource.value) {
        switch(props.tag) {
            default:
                return stripSourceComponent(rawSource.value);
            case "template":
                return getTemplate(rawSource.value);
            case "script":
                return getScript(rawSource.value);
            case "style":
                return getStyle(rawSource.value);
        }
    }
    return ""
});

const getTemplate = (code) => {
    const tagStart = code.indexOf("<template>");
    const tagEnd = code.indexOf("</template>") + "</template>".length;
    const sourceCode = code.substring(tagStart, tagEnd);
    return stripSourceComponent(sourceCode);
}
const getScript = (code) => {
    const tagStart = code.indexOf("<script");
    const tagEnd = code.indexOf("/script>") + "</sctipt>".length;
    const sourceCode = code.substring(tagStart, tagEnd);
    return stripSourceComponent(sourceCode);
}
const getStyle = (code) => {
    const tagStart = code.indexOf("<style");
    const tagEnd = code.indexOf("/style>") + "</style>".length;
    const sourceCode = code.substring(tagStart, tagEnd);
    return stripSourceComponent(sourceCode);
}
const stripSourceComponent = (code) => {
    const regex1 = /[ \t]*?<SFCSource(.*)\/>\n?/g
    const regex2 = /import SFCSource(.*)\n/g
    return code.replace(regex1,"").replace(regex2, "");
}
</script>
<style lang="scss" scoped>
pre[class*="language-"] {
    background: #000000;
}
button {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: inherit;
    cursor: pointer;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 13px;
    font-weight: bold;
    height: 28px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    margin-top: 6px;
    margin-left: 1rem;
    padding: 1rem 1rem;
    background-color: #029CFD;
    color: #E5F4FF;
}
</style>