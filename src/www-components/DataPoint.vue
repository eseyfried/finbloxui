<!-- eslint-disable vue/valid-template-root -->
<template>
    <div id="datapoint">
        <DataPoint :dataPoint="ytdAum" detailsLinkLabel="see more" />
    </div>
</template>
<script setup>
import DataPoint from "@/components/Core/DataPoint";
const ytdAum = {
  "label": "YTD AUM",
  "value": "12345678.90",
  "format": "currency",
  "trend": {
    "format": "currency",
    "value": 14526.34,
    "direction": "up"
  }
}
</script>
<style lang="scss" scoped>
#datapoint:deep(.fb-data-point) {
    @apply bg-blue-500 rounded text-white drop-shadow-lg w-[350px];
    h4 {
        @apply text-3xl;
    }
    .fb-data-point-body {
        @apply p-3;
    }
    .fb-data-point-trend {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .fb-data-point-trend[data-trend-direction='up']::before {
        content: "+";
    }
    .fb-data-point-trend[data-trend-direction='down']::before {
        content: "-";
    }
    .fb-data-point-footer {
        @apply pl-3 py-2 bg-blue-400/40;
    }
    &::before {
        display: inline-block;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
    }

    .fb-data-point-body {
        margin-left: 55px;
    }

    &::before {
        position: absolute;
        top: 20px;
        left: 10px;
        font-size: 20px !important;
        font: var(--fa-font-solid);
        padding: .75rem 1rem;
        @apply rounded-full bg-white text-blue-500;
    }
    &::before {
        content: "\24";
    }
}
</style>