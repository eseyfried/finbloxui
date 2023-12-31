// import DataDefinitions from '../DataDefinitions.vue';
import * as ClientObjectStory from './ClientObject.stories'
import * as DataPointObjectStory from './DataPointObject.stories'
import * as MenuItemObjectStory from './MenuItemObject.stories'
import * as TransactionsObjectStory from './TransactionsObject.stories'

export default {
  title: 'Library/DataDefinitions',
//   component: DataDefinitions,
//   parameters: {
//     // More on how to position stories at: https://storybook.js.org/docs/vue/configure/story-layout
//     layout: 'fullscreen',
//   },
  
};

export const Overview = {
    render: () => ({
        // components: {
        //     DataDefinitions,
        // },
        template: `
        <article>
            <section class="storybook-page">
            <h2>Data Definitions</h2>
            <p>
                FinBloxUI components accept a variety of defined data objects as component properties. This sections contains a complete
                list of data object definitions.
            </p>
        </article>
`,
    }),
};

export const ClientObject = {
    ...ClientObjectStory.default
};

export const DataPointObject = {
    ...DataPointObjectStory.default
};

export const MenuItemObject = {
    ...MenuItemObjectStory.default
};
export const TransactionsObject = {
    ...TransactionsObjectStory.default
};



