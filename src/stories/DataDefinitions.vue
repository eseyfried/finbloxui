<template>
  <article>
    <section class="storybook-page">
      <h2>{{ ucFirst(name) }}</h2>
      <table>
        <thead>
            <tr>
                <th>Object Path</th><th>Definition</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(line, i) in dataDef.dataObjectDocs" :key="i">
                <td>{{ line.path }}</td>
                <td>{{ line.definition }}</td>
            </tr>
        </tbody>
      </table>
      <h3>Example Object</h3>
      <pre>{{JSON.stringify(dataDef.dataObject, null, 4)}}</pre>
    </section>
  </article>
</template>

<script setup>
import './page.css';
import { ref, onBeforeMount } from 'vue';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    name: {
        type: String,
        default: null,
    },
    fileName: {
        type: String,
        default: null,
    }
});


import * as dataDefs from '../modules/dataDefs/';

const dataDef = ref({});

onBeforeMount( async () => {
    dataDef.value = await dataDefs.default[props.fileName]()
})

const ucFirst = (value) => {
    return value.split(" ").map((str) => str.substr(0,1).toUpperCase() + str.substr(1)).join(" ")
};
</script>
