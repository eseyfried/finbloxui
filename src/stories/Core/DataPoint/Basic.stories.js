
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
      template: '<DataPoint :dataPoint="args.dataPoint" />',
    }),
    parameters: {
        docs: {
            description: {
                story: "The basic use of the DataPoint component.",
            },
            source: {
                code: `<DataPoint :dataPoint="dataPoint" />`
            }
        }
    }
};