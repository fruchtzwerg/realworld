import './styles.scss';

import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';

import App from './app/App.vue';
import { ClickOutsidePlugin } from './common/plugins/click-outside.plugin';
import { router } from './router/router';

const app = createApp(App).use(VueQueryPlugin).use(ClickOutsidePlugin).use(router);

app.mount('#root');
