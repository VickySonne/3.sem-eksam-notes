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


// importeret her istedet for app.vue for at sikre konsistent styling, 
// og seperarer global styling fra component specifik styling, 
// da app.vues styling stadig er specifik til det, selv om det er det øverste komponent
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

// Ved at kalde dette, bliver vue-router installeret og intergreret i vores projekt, 
// derved for vi adgang til componenter som router-view og skal ikke explicit importerer dem i componenter
app.use(router)

// Tilføjer vores application til DOM´en 
app.mount('#app')
