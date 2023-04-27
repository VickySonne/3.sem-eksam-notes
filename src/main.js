import { createApp } from 'vue'
import App from './App.vue'

import router from "@/router"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import icons here */
import {
    faHome,
    faTasks,
    faCashRegister,
    faUsers,
    faBarcode,
    faChartBar,
    faLifeRing,
    faCogs,
    faArrowLeft,
    faArrowRight,
    faBell,
    faUser,
    faAngleDown,
    faPlus,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'

import './assets/reset.css'
import './assets/global.css'

const app = createApp(App)

/* add icons to the library */
library.add([
    faHome,
    faTasks,
    faCashRegister,
    faUsers,
    faBarcode,
    faChartBar,
    faLifeRing,
    faCogs,
    faArrowLeft,
    faArrowRight,
    faBell,
    faUser,
    faAngleDown,
    faPlus,
    faMagnifyingGlass
])

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.mount('#app')
