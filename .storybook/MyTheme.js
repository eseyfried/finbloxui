import { create } from '@storybook/theming/create';
import logo from '../public/assets/logo-400.png';
export default create({
  base: 'light',
  brandTitle: 'FinBlox-UI',
  brandUrl: 'https://finbloxui.com',
  brandImage: logo,
//   brandImage: 'https://storybook.js.org/images/placeholders/350x150.png',
  brandTarget: '_self',
});