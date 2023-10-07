<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="fb-asset-allocation-chart">
        <p v-if="dataTotals100Percent === false">Data values must total 100% when using percent format.</p>
        <Chart
            v-if="(allocations.length > 0 && assetCategories.length > 0)"
            :id="id"
            :type="type"
            :data="chartData"
            :options="chartOptions"
            :plugins="[htmlLegendPlugin]"
            :colors="colors"
        />
       
        <div class="fb-asset-allocation-chart-hero" v-if="showTotal">
            <slot :props="props" :totalLabel="totalLabel" :totalAmount="formatters.formatCurrency(totalAmount)">
                <h2>{{ totalLabel }}</h2>
                <h3>{{ formatters.formatCurrency(totalAmount) }}</h3>
            </slot>
        </div>
        <div :id="`legend-container-${component.uid}`" class="fb-chart-legend"></div>
    </div>
</template>

<script setup>
// imports
import Chart from "@/components/Core/Charts/Chart";
import ChartJS from 'chart.js/auto';
import { computed, getCurrentInstance, watch } from "vue";
import * as formatters from "@/modules/useFormatter";
import { sortBy } from "lodash";


// vars
const component = getCurrentInstance();

const id = `fb-asset-allocation-chart-${component.uid}`;
const props = defineProps({
    type: {
        type: String,
        default: "doughnut",
        validator: (value) => ["doughnut", "pie"].includes(value),
    },
    assetCategories: {
        type: Array,
        default: () => [],
    },
    format: {
        type: String,
        default: "percent",
        validator: (value) => ["percent", "currency"].includes(value)
    },
    allocations: {
        type: Array,
        default: () => [],
    },
    chartjsData: {
        type: Object,
        default: () => {},
    },
    chartjsOptions: {
        type: Object,
        default: () => {},
    },
    colors: {
        type: Array,
        default: () => []
    },
    showTotal: {
        type: Boolean,
        default: true
    },
    totalLabel: {
        type: String,
        default: "Total Value"
    },
    totalAmount: {
        type: String,
        default: "0.00"
    }
});

const defaultChartData = computed(() => {
    return {
        labels: props.assetCategories,
        datasets: [{
            data: props.allocations
        }],
    }
});

/**
 * merge chartjs prop options with default options
 */
const chartOptions = computed(() => {
    let cutout = props.chartjsOptions?.cutout ? props.chartjsOptions.cutout : "80%";
    if (props.type === "pie") {
        cutout = 0;
    }
    return {
        ...props.chartjsOptions,
        ...{
                maintainAspectRatio: false,
                cutout: cutout,
                plugins: {
                    htmlLegend: {
                        // ID of the container to put the legend in
                        containerID: "legend-container",
                    },
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const format = props.format;
                                if (format === "percent") {
                                    return formatters.formatPercent(context.parsed);
                                } else if (format === "currency") {
                                    return formatters.formatCurrency(context.parsed);
                                }
                            }
                        }
                    }
                }
            }
    }
});


const chartData = computed(() => {
    return {
        ...props.chartjsData,
        ...defaultChartData.value
    }
});

const dataTotals100Percent = computed(() => {
    if(props.format === "percent") {
        return props.allocations.reduce((partialSum, a) => partialSum + a, 0) === 100;
    }
    return null;
})


const getLegendItemValue = (index) => {
    return props.allocations[index];
}

const formatValue = computed(() => {
    return (value) => {
        let formattedValue;
        if (props.format == "percent") {
            formattedValue = formatters.formatPercent(value);
        } else if (props.format == "currency") {
            formattedValue = formatters.formatCurrency(value);
        }
        return formattedValue;
    }
});

const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.querySelector(`#${id}-${component.uid}`);
  let listContainer = legendContainer.querySelector('ul');

  if (!listContainer) {
    listContainer = document.createElement('ul');
    listContainer.classList.add("fb-chart-legend-list");
    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin = {
  id: 'htmlLegend',
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = sortBy(chart.options.plugins.legend.labels.generateLabels(chart), ["text"]);

    items.forEach(item => {
      const li = document.createElement('li');
      li.classList.add("fb-chart-legend-list-item")


      li.onclick = () => {
        const {type} = chart.config;
        if (type === 'pie' || type === 'doughnut') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.classList.add("fb-chart-legend-list-item-color");
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + 'px';

      // Text
      const textContainer = document.createElement('p');
      if (item.hidden) {
        textContainer.classList.add("fb-chart-legend-item-hidden");
      } else {
        textContainer.classList.remove("fb-chart-legend-item-hidden");
      }

      const itemContainer = document.createElement('span');
      const itemText = document.createTextNode(`${item.text}`);
      itemContainer.appendChild(itemText);
      textContainer.appendChild(itemContainer);

      const itemValueContainer = document.createElement('span');
      const itemValueText = document.createTextNode(`${formatValue.value(getLegendItemValue(item.index))}`);
      itemValueContainer.appendChild(itemValueText);
      textContainer.appendChild(itemValueContainer);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  }
};

/**
 * The chart legend plugin does not re-render
 * when format prop updates.
 */
watch(() => [props.format], () => {
   const chart = ChartJS.getChart(id);
   if(chart) {
    chart.update();
   }
}, { immediate: true })


</script>
<style lang="scss" scoped>
.fb-asset-allocation-chart {
    position: relative;
}
.fb-asset-allocation-chart-hero {
    text-align: center;
    position: absolute;
    top: 25%;
    width:100%;
}
.fb-chart-legend {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.fb-chart-legend:deep(.fb-chart-legend-list) {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;

    .fb-chart-legend-list-item {
        align-items: center;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        margin-left: 10px;
        margin-bottom: 3px;
        p {
            margin: 0;
            padding: 0;
        }
        .fb-chart-legend-list-item-color {
            display: inline-block;
            flex-shrink: 0;
            height: 20px;
            width: 20px;
            margin-right: 10px;
        }

        .fb-chart-legend-item-hidden {
            text-decoration: line-through;
        }
    }
}
</style>