 import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; 
import { createVuetify } from 'vuetify';
import 'vuetify/lib/styles/main.sass';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
  });

const app = createApp(App);
app.use(router);  // 注入 Vue Router
app.use(vuetify); // 加載 Vuetify
app.mount('#app');