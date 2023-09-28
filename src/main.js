
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './stories/Examples/preFlight.css';
import "./assets/fontawesome/css/fontawesome.css";
import "./assets/fontawesome/css/brands.css";
import "./assets/fontawesome/css/solid.css";
import './scss/www.css';
import 'animate.css';
import App from './App.vue'

const app = createApp(App);

app.use(createPinia())

app.mount('#app')
