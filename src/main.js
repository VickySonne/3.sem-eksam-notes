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
    faMagnifyingGlass,
    faPaperPlane,
    faCheck,
    faArrowRightFromBracket,
    faPeopleArrows,
    faTimes,
    faCaretLeft,
    faCaretRight, faCaretDown, faCaretUp, faAngleUp
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
    faAngleUp,
    faPlus,
    faMagnifyingGlass,
    faPaperPlane,
    faCheck,
    faArrowRightFromBracket,
    faPeopleArrows,
    faTimes,
    faCaretLeft,
    faCaretRight,
    faCaretDown,
    faCaretUp,
])

app.component('font-awesome-icon', FontAwesomeIcon)

// Den fortæller vue at den skal bruge router. Vi udvider vue med vue-router, derfor er det ikke nødvendigt at importere router-view
app.use(router)

app.mount('#app')
