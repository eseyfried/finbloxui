import { DataPointRoot } from '@/components/Core/DataPoint/';

// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Library/Core/DataPoint',
    args: {
        dataPoint: {
            label: "YTD AUM",
            value: "12345678.9999",
            format: (value) => `$${parseFloat(value).toFixed(2)}`,
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
      template: '<DataPointRoot :dataPoint="args.dataPoint" />',
    }),
    parameters: {
        docs: {
            description: {
                story: `You can pass a custom formatting callback function. Simply pass your callback function in the dataPoint.format field.

Formatter callbacks will be called with the dataPoint.value as it's argument.

> const callback = (value) => {

> // format and return value

>   return formattedValue;

> }
`,
            },
            source: {
                code: `
const dataPoint = {
    label: "YTD AUM",
    value: "12345678.9999",
    format: (value) => '$'+ parseFloat(value).toFixed(2)
};
<DataPointRoot :dataPoint="dataPoint" />
`
            }
        }
    }
};