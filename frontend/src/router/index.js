import { createRouter, createWebHistory } from 'vue-router'
import GeneralView from '../pages/GeneralView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GeneralView
    },
    {
      path: '/history',
      name: 'HistoryView',
      component: () => import('../pages/HistoryView.vue')
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: () => import('../pages/TransferWindow.vue')
    },
    {
      path: '/add-card',
      name: 'add-card',
      component: () => import('../pages/AddCardView.vue')
    }
  ]
})

export default router