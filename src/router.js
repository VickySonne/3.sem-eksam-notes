import { createRouter, createWebHashHistory } from "vue-router";

import MainTaskOverview from "./components/MainTaskOverview.vue";
import MainCreateNew from "./components/MainCreateNew.vue";
import MainTaskDisplay from "./components/MainTaskDisplay.vue";

const routes = [
  { path: '/', name: MainTaskOverview, component: MainTaskOverview },
  { path: '/case', name: MainCreateNew, component: MainCreateNew },
  { path: '/case/:id', name: MainTaskDisplay, component: MainTaskDisplay, props: {id:null} },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router