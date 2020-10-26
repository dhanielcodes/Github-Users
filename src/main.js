import { createApp } from 'vue'
import App from './App.vue'

import Nav from "./Nav.vue";


const app = createApp(App)
app.component('Nav', Nav)
app.mount('#app')
