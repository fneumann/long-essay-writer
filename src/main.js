import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Store from './store/index'

Store.dispatch('init');

createApp(App)
    .use(Store)
    .use(vuetify)
    .mount('#app')
