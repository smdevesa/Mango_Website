import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './styles/styles.css'
import '@mdi/font/css/materialdesignicons.css';


loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')
