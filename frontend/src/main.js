import { registerPlugins } from '@/plugins'
import App from './App.vue'
import './styles/styles.css'
import vuetify from './plugins/vuetify'
import router from './router'
import { createApp } from 'vue'

const app = createApp(App)
.use(vuetify)
.use(router)

registerPlugins(app)

app.mount('#app')
