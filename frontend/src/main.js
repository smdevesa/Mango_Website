import { registerPlugins } from '@/plugins'
import App from './App.vue'
import './styles/styles.css'
import vuetify from './plugins/vuetify'
import router from './router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const pinia = createPinia();
const app = createApp(App)
.use(vuetify)
.use(router)
.use(pinia);

registerPlugins(app);

app.mount('#app');
