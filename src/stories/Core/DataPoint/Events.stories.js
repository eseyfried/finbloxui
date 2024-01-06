import { action } from "@storybook/addon-actions";
import { DataPointRoot } from '@/components/Core/DataPoint/';

// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Library/Core/DataPoint',
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
      components: { DataPointRoot },
      setup() {
        return { args };
      },
      template: '<DataPointRoot :dataPoint="args.dataPoint" @fb-data-point-action-link:click="handleClick($event)"/>',
      methods: { handleClick: (event) => {  alert(JSON.stringify(event)); return action("clicked"); } }
    }),
    parameters: {
        docs: {
            description: {
                story: `The DataPoint component offers 1 event that you may bind to an event listener:

- fb-data-point-action-link:click - triggers when the action link is clicked
`,
            },
            source: {
                code: `<DataPointRoot :dataPoint="dataPoint" @fb-data-point-details-link:click="handleClick($event)" />`
            }
        }
    }
};
