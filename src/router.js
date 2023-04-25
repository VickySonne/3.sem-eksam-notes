import { createRouter, createWebHashHistory } from "vue-router";

import MainTaskOverview from "./components/MainTaskOverview.vue";
import MainCreateNew from "./components/MainCreateNew.vue";
import MainTaskDisplay from "./components/MainTaskDisplay.vue";

const routes = [
  { path: '/', component: MainTaskOverview },
  { path: '/case', component: MainCreateNew },
  { path: '/case/:id', component: MainTaskDisplay },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router