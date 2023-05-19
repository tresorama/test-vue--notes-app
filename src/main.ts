import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';

// tailwind as base CSS
// tailwind is mainly used for the layout
// instead components libraries are for elements
import "./assets/tailwind.css";

// with flowbite
import "flowbite";

// with primevue
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.mount('#app');
