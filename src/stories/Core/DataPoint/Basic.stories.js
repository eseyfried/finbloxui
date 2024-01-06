
import {
    DataPointRoot,
    DataPointLabel,
    DataPointValue,
    DataPointTrend,
    DataPointAction
} from '@/components/Core/DataPoint/';

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
        actionLabel: "show more",
        showAction: true,
    },
    render: (args) => ({
      components: { DataPointRoot, DataPointLabel, DataPointValue, DataPointTrend, DataPointAction },
      setup() {
        return { args };
      },
      template: `
        <DataPointRoot v-bind="args" />
        `,
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the DataPoint component. Embed the component, apply the necessary component props and apply styles using the built in css classes.",
            },
            source: {
                code: `<DataPointRoot :dataPoint="dataPoint" />`
            }
        }
    }
};