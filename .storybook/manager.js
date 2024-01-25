import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
import MyTheme from './MyTheme';

addons.setConfig({
  theme: MyTheme,
  sidebar: {
    filters: {
      a: (item) => {
        const ignore = ["Empty Story"]
        return !ignore.includes(item.name)
      },
    },
  },
});

