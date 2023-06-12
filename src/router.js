import {createRouter, createWebHistory} from "vue-router";
// curlybrackets= importeret specifikke dele af vue-router filen
// webhistory= hvis vi ikke bruger webhistory, er standarden at bruge webhashhistory og der ville være # mellem vores rod url og vores path.
// Det tillader os nemmere at tilgå vores paths direkte.

import CaseIndex from "@/pages/cases/CaseIndex.vue";
import ComingSoon from "@/pages/ComingSoon.vue";
import CreateCase from "@/pages/cases/CreateCase.vue";
import ReadCase from "@/pages/cases/ReadCase.vue";
import UpdateCase from "@/pages/cases/UpdateCase.vue";

const routes = [
  { path: '/', name: 'CaseIndex', component: CaseIndex },
  { path: '/case', name: 'CreateCase', component: CreateCase },
  { path: '/case/:id', name: 'ReadCase', component: ReadCase },
  // props: true er ikke nødvendig til vores formål, da det er en måde at decouple (sikrer component reusability) components og routes - teknisk set ikke nødvendig
  { path: '/case/:id/edit', name: 'UpdateCase', component: UpdateCase, props: true },
  { path: '/fake-route', name: 'ComingSoon', component: ComingSoon },
  // path=stien i url. Name=en anden måde at referere til url paths. Component=referer til componentet der bliver rendered.
]

// Hvis url/path bliver tilgået direkte i browseren, rammer forespørgslen ikke vores router og de vil derfor ikke virke. 
// Selv om det tillader det, er det i det her projekt i stykker, derfor virker det ikke.

const router = createRouter({
  history: createWebHistory(),
  routes,
})
// Det er det vi eksporterer, routes er en parameter i objektet.
// routes er ikke skrevet med en key og en value, det er en prædefineret attribut som omfanger begge. 

export default router