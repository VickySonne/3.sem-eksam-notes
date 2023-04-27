import {createRouter, createWebHistory} from "vue-router";

import MainTaskOverview from "./pages/CasesOverview.vue";
import MainCreateNew from "./pages/CreateNewCase.vue";
import MainTaskDisplay from "./pages/DisplayCase.vue";
import ComingSoon from "@/components/shared/ComingSoon.vue";

const routes = [
  { path: '/', name: 'MainTaskOverview', component: MainTaskOverview },
  { path: '/case', name: 'MainCreateNew', component: MainCreateNew },
  { path: '/case/:id', name: 'MainTaskDisplay', component: MainTaskDisplay, props: true },
  { path: '/fake-route', name: 'ComingSoon', component: ComingSoon, props: true },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router