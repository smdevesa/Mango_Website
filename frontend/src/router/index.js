import { createRouter, createWebHistory } from 'vue-router';
import GeneralView from '../components/views/GeneralView.vue';
import MainLayout from '../components/views/MainLayout.vue';
import { useUserStore } from '@/store/userStore'; 

const router = createRouter({
  history: createWebHistory(),
  
  routes: [
    {
      path: '/',
      redirect: '/landing'
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('../components/views/LandingView.vue')
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
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: GeneralView,
          meta: { requiresAuth: true } 
        },
        {
          path: '/history',
          name: 'history',
          component: () => import('../components/views/HistoryView.vue'),
          meta: { requiresAuth: true } 
        },
        {
          path: '/transfer',
          name: 'transfer',
          component: () => import('../components/views/TransferView.vue'),
          meta: { requiresAuth: true } 
        },
        {
          path: '/charge',
          name: 'charge',
          component: () => import('../components/views/ChargeView.vue'),
          meta: { requiresAuth: true } 
        },
        {
          path: '/pay',
          name: 'pay',
          component: () => import('../components/views/PayView.vue'),
          meta: { requiresAuth: true } 
        },
        {
          path: '/cards',
          name: 'cards',
          component: () => import('../components/views/AddCardView.vue'),
          meta: { requiresAuth: true } 
        },
        {
          path: '/transfer/new-account',
          name: 'transfer/new-account',
          component: () => import('../components/views/TransferNewAccountView.vue'),
          meta: { requiresAuth: true } 
        },
        {
          path: '/transfer/mango-contact',
          name: 'transfer/mango-contact',
          component: () => import('../components/views/TransferMangoAccountView.vue'),
          meta: { requiresAuth: true } 
        },
      ]
    },
    {
      path: '/payment/:id',
      props: true,
      name: 'payment',
      component: () => import('../components/views/PaymentView.vue'),
      meta: { requiresAuth: true } 
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../components/views/NotFoundView.vue')
    }
  ]
});


router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  
  
  if (to.meta.requiresAuth && !userStore.isLoggedIn()) {
    next({ name: 'login' }); 
  } else {
    next(); 
  }
});

export default router;