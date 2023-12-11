import './styles.scss';

import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';

import App from './app/App.vue';
import { router } from './router/router';

const app = createApp(App).use(VueQueryPlugin).use(router);

app.mount('#root');
