import { createWebHistory, createRouter } from 'vue-router'

import Home from "@/Pages/Home/index.vue";
import Watch from "@/Pages/Watch/index.vue";
const routes = [
  { 
    path: '/',
    name:'home',
    component: Home,
    meta:{
      title:"Home"
    } 
  },
  { 
    path: '/watch/:id/:episode_id?',
    name:'watch',
    component: Watch,
    meta:{
      title:"Watch"
    } 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to,_from,next)=>{
    let title:string;
    title =  to.meta?.title as string;
    document.title = title;
    next();
})
export default router;