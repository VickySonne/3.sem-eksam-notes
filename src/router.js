import { createRouter, createWebHashHistory } from "vue-router";

import MainTaskOverview from "./components/MainTaskOverview.vue";
import MainCreateNew from "./components/MainCreateNew.vue";
import MainTaskDisplay from "./components/MainTaskDisplay.vue";
import ComingSoon from "@/components/ComingSoon.vue";

const routes = [
  { path: '/', name: 'MainTaskOverview', component: MainTaskOverview },
  { path: '/case', name: 'MainCreateNew', component: MainCreateNew },
  { path: '/case/:id', name: 'MainTaskDisplay', component: MainTaskDisplay, props: true },
  { path: '/fake-route', name: 'ComingSoon', component: ComingSoon, props: true },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router