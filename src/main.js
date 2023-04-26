import { createApp } from 'vue'
import App from './App.vue'

import router from "@/router"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import icons here */
import {} from '@fortawesome/free-solid-svg-icons'

import './assets/reset.css'
import './assets/global.css'

const app = createApp(App)

/* add icons to the library */
library.add()

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.mount('#app')
