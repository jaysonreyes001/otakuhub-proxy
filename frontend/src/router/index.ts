import { createWebHistory, createRouter } from 'vue-router'

import Home from "@/Pages/Home/index.vue";
import Watch from "@/Pages/Watch/index.vue";
import Info from "@/Pages/Info/index.vue";
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
  { 
    path: '/info/:id',
    name:'info',
    component: Info,
    meta:{
      title:"Info"
    } 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to,_from, savedPosition) {
      if (savedPosition) {
        return savedPosition; // Maintain scroll position when using back/forward buttons
      } else {
        return { top: 0, left: 0 }; // Scroll to top for new route navigations
      }
    }
});
router.beforeEach((to,_from,next)=>{
    let title:string;
    title =  to.meta?.title as string;
    document.title = title;
    next();
})
export default router;