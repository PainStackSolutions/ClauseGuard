import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Upload from '../views/UploadView.vue'
import About from '../views/About.View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
})

export default router
