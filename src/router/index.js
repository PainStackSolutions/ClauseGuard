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
      meta: {
        title: 'ClauseGuard - AI-Powered Contract Review Made Simple',
        description: 'Transform your contract review process with AI technology',
      },
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
      meta: {
        title: 'Upload Contract - ClauseGuard AI Analysis',
        description: 'Upload your contracts for instant AI-powered analysis',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        title: 'About ClauseGuard - AI Contract Review Technology',
        description: 'Learn about our mission to revolutionize contract review',
      },
    },
  ],
})

// Track page views with Google Analytics
router.afterEach((to) => {
  // Track page view
  if (typeof gtag !== 'undefined') {
    gtag('config', 'G-V12BDM5WTD', {
      page_path: to.path,
      page_title: to.meta.title || 'ClauseGuard',
      page_location: window.location.href,
    })
  }
})

export default router
