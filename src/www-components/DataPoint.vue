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
    @apply tw-bg-blue-500 tw-rounded tw-text-white tw-drop-shadow-lg tw-w-[350px];
    h4 {
        @apply tw-text-3xl;
    }
    .fb-data-point-body {
        @apply tw-p-3;
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
        @apply tw-pl-3 tw-py-2 tw-bg-blue-400/40;
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
        @apply tw-rounded-full tw-bg-white tw-text-blue-500;
    }
    &::before {
        content: "\24";
    }
}
</style>