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
        const handleButtonClick = () => {};
        return { args, handleButtonClick };
      },
      template: `
<DataPoint :dataPoint="args.dataPoint">
    <template #default="slotProps">
        <h3>{{ slotProps.dataPoint.value }}</h3>
        <h4>{{ slotProps.dataPoint.label }}</h4>
    </template>
    <template #name="slotProps">
        <span class="fb-data-point-trend" :data-trend="slotProps.dataPoint.trend.direction">{{ slotProps.dataPoint.trend.value }}</span>
    </template>
    <template #footer="slotProps">
        <button @click="handleButtonClick(slotProps.dataPoint)">{{ slotProps.props.detailsLinkLabel }}</button>
    </template>
</DataPoint>
`,
    }),
    parameters: {
        docs: {
            description: {
                story: `You can override the data point templates with your own custom layout using slotted content.
There are 2 available template slots:
- default - layout template for the dataPoint object
- trend - layout template for the dataPoint trend object
- footer - layout template for the footer section which includes the details link

Wrap your content in a slot template tag named default. The following slotProps will be available for use in your
template:
- props - all component props
- dataPoint - the dataPoint object`,
            },
            source: {
                code: `
<DataPoint :dataPoint="dataPoint">
    <template #default="slotProps">
        <h3>{{ slotProps.dataPoint.value }}</h3>
        <h4>{{ slotProps.dataPoint.label }}</h4>
    </template>
    <template #name="slotProps">
        <span class="fb-data-point-trend" :data-trend="slotProps.dataPoint.trend.direction">
            {{ slotProps.dataPoint.trend.value }}
        </span>
    </template>
    <template #footer="slotProps">
        <button @click="handleButtonClick(slotProps.dataPoint)">
            {{ slotProps.props.detailsLinkLabel }}
        </button>
    </template>
</DataPoint>
                `
            }
        }
    }
};