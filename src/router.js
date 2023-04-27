import {createRouter, createWebHistory} from "vue-router";

import MainTaskOverview from "./pages/TasksOverview.vue";
import MainCreateNew from "./pages/CreateNewTask.vue";
import MainTaskDisplay from "./pages/DisplayTask.vue";
import ComingSoon from "@/components/ComingSoon.vue";

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