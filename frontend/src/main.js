import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './styles/styles.css'
import '@mdi/font/css/materialdesignicons.css';
import router from './router' // Importamos el enrutador


loadFonts()

createApp(App)

.use(router) // Usamos el enrutador
.use(vuetify)
.mount('#app')

