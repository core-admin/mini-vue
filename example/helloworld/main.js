import { App } from './App.js';
import { createApp } from '../../lib/guide-mini-vue.esm.js';

const app = createApp(App);
const rootContainer = document.querySelector('#app');
app.mount(rootContainer);
