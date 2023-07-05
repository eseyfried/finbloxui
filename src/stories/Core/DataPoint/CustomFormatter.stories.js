import DataPoint from '@/components/Core/DataPoint.vue';

// eslint-disable-next-line storybook/story-exports
export default {
    title: 'Example/Core/DataPoint',
    args: {
        dataPoint: {
            label: "YTD AUM",
            value: "12345678.9999",
            format: (value) => parseFloat(value).toFixed(2),
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
    format: (value) => parseFloat(value).toFixed(2)
};
<DataPoint :dataPoint="dataPoint" />
`
            }
        }
    }
};