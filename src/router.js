import {createRouter, createWebHistory} from "vue-router";

import CaseIndex from "@/pages/cases/CaseIndex.vue";
import ComingSoon from "@/pages/ComingSoon.vue";
import CreateCase from "@/pages/cases/CreateCase.vue";
import ReadCase from "@/pages/cases/ReadCase.vue";
import UpdateCase from "@/pages/cases/UpdateCase.vue";

const routes = [
  { path: '/', name: 'CaseIndex', component: CaseIndex },
  { path: '/case', name: 'CreateCase', component: CreateCase },
  { path: '/case/:id', name: 'ReadCase', component: ReadCase },
  { path: '/case/:id/edit', name: 'UpdateCase', component: UpdateCase, props: true },
  { path: '/fake-route', name: 'ComingSoon', component: ComingSoon },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router