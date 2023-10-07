import { sortBy } from "lodash";



const getOrCreateLegendList = (chart, id, componentID) => {
  const legendContainer = document.querySelector(`#${id}-${componentID}`);
  let listContainer = legendContainer.querySelector('ul');

  if (!listContainer) {
    listContainer = document.createElement('ul');
    listContainer.classList.add("fb-chart-legend-list");
    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

const format = (value, callback = null) => {
    if (callback) {
        return callback(value);
    } else {
        return value;
    }
}


const htmlLegendPlugin = {
  id: 'htmlLegend',
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID, options.componentID);

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
      const itemValueText = document.createTextNode(`${format(chart.data.datasets[0].data[item.index], options.callback || null)}`);
      itemValueContainer.appendChild(itemValueText);
      textContainer.appendChild(itemValueContainer);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
      
    });
  }
};

export {
    htmlLegendPlugin
}