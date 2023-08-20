import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
import MyTheme from './MyTheme';

addons.setConfig({
  theme: MyTheme
});