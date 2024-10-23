import { createRouter, createWebHistory } from 'vue-router';
import GeneralView from '../components/views/GeneralView.vue';

const router = createRouter({
  history: createWebHistory(),
  
  routes: [
    {
      path: '/',
      redirect: '/register'
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: GeneralView
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../components/views/HistoryView.vue')
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: () => import('../components/views/TransferView.vue')
    },
    {
      path: '/invest',
      name: 'invest',
      component: () => import('../components/views/InvestView.vue')
    },
    {
      path: '/add-card',
      name: 'add-card',
      component: () => import('../components/views/AddCardView.vue')
    },
    {
      path: '/transfer/new-account',
      name: 'transfer/new-account',
      component: () => import('../components/views/TransferNewAccountView.vue')
    },
    {
      path: '/transfer/mango-contact',
      name: 'transfer/mango-contact',
      component: () => import('../components/views/TransferMangoAccountView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../components/views/NotFoundView.vue')
    }
  ]
});

export default router;
