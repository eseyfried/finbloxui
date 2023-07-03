import { action } from "@storybook/addon-actions";
import DataPoint from '../../../components/Core/DataPoint.vue';

// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Example/Core/DataPoint',
    args: {
        dataPoint: {
            label: "YTD AUM",
            value: "12345678.90",
            format: "currency",
            trend: {
                format: "currency",
                value: 14526.34,
                direction: "up"
            }
        },
    },
    render: (args) => ({
      components: { DataPoint },
      setup() {
        return { args };
      },
      template: '<DataPoint :dataPoint="args.dataPoint" @fb-data-point-details-link:click="handleClick($event)"/>',
      methods: { handleClick: action("clicked") }
    }),
    parameters: {
        docs: {
            description: {
                story: `The DataPoint component offers 1 event that you may bind to an event listener:

- fb-data-point-details-link:click - triggers when the details link is clicked
`,
            },
            source: {
                code: `<DataPoint :dataPoint="dataPoint" @fb-data-point-details-link:click="handleDetailsClick($event)" />`
            }
        }
    }
};
