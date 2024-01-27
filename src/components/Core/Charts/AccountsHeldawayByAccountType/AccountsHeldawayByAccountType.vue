<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-accounts-heldaway-by-account-type-chart" :class="componentClasses.getClassByType('component')">
        <div>
            <Chart
                :id="id"
                :type="type"
                :data="chartData"
                :options="chartOptions"
                :plugins="[htmlLegendPlugin]"
                :colors="colors"
            />
            <div
                class="fb-accounts-heldaway-by-account-type-chart-hero"
                :class="componentClasses.getClassByType('chartHero')"
                v-if="type === 'doughnut'"
            >
                <slot :totalLabel="totalLabel" :totalValue="totalValue">
                    <h2>{{ totalLabel }}</h2>
                    <h3>{{ totalValue }}</h3>
                </slot>
            </div>
        </div>
        <div
            :id="`legend-container-${component.uid}`"
            :class="[isMobile ? componentClasses.getClassByType('chartLegendStacked') : null, componentClasses.getClassByType('chartLegend')]"
        ></div>
    </div>
</template>
<script setup>
// imports
import { getCurrentInstance, computed } from "vue";
import * as componentClasses from "@/modules/useCommonCSS";
import { isMobile } from "@/modules/useResponsive";
import { arraySum } from "@/modules/useArrayUtils";
import * as base from "@/modules/usePieChartBase";
import Chart from "@/components/Core/Charts/Chart";
import { htmlLegendPlugin } from "@/modules/useChartLegend"

// vars
const component = getCurrentInstance();
const id = `fb-accounts-heldaway-by-account-type-chart-${component.uid}`;
const numGridCol = isMobile.value ? 1 : 2;


// eslint-disable-next-line no-unused-vars
const props = defineProps(
    computed(() => base.useProps({
        totalLabel: {
            type: String,
            default: "Total AUM"
        },
        totalValue: {
            type: String,
            default: "0.00"
        }
    })).value
);

const chartData = computed(() => base.chartData(props));
const defaultOptions = {}
const chartOptions = computed(() => base.chartOptions(props, component.uid, defaultOptions)).value;

</script>
<style lang="scss" scoped>
@import "../../../../scss/fb-chart-legend.scss";
.fb-accounts-heldaway-by-account-type-chart {
    display: grid;
    grid-template-columns: repeat(v-bind(numGridCol), minmax(0, 1fr));
    & > div {
        position: relative;
    }
}
.fb-accounts-heldaway-by-account-type-chart-hero {
    text-align: center;
    position: absolute;
    top: 30%;
    width:100%;
}
</style>