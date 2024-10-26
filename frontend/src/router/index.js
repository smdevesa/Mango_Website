import { createRouter, createWebHistory } from 'vue-router';
import GeneralView from '../components/views/GeneralView.vue';
import MainLayout from '../components/views/MainLayout.vue';
import { useUserStore } from '@/store/userStore'; // Asegúrate de importar tu store

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
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: GeneralView,
          meta: { requiresAuth: true } // Ruta protegida
        },
        {
          path: '/history',
          name: 'history',
          component: () => import('../components/views/HistoryView.vue'),
          meta: { requiresAuth: true } // Ruta protegida
        },
        {
          path: '/transfer',
          name: 'transfer',
          component: () => import('../components/views/TransferView.vue'),
          meta: { requiresAuth: true } // Ruta protegida
        },
        {
          path: '/charge',
          name: 'charge',
          component: () => import('../components/views/ChargeView.vue'),
          meta: { requiresAuth: true } // Ruta protegida
        },
        {
          path: '/pay',
          name: 'pay',
          component: () => import('../components/views/PayView.vue'),
          meta: { requiresAuth: true } // Ruta protegida
        },
        {
          path: '/invest',
          name: 'invest',
          component: () => import('../components/views/InvestView.vue'),
          meta: { requiresAuth: true } // Ruta protegida
        },
        {
          path: '/cards',
          name: 'cards',
          component: () => import('../components/views/AddCardView.vue'),
          meta: { requiresAuth: true } // Ruta protegida
        },
        {
          path: '/transfer/new-account',
          name: 'transfer/new-account',
          component: () => import('../components/views/TransferNewAccountView.vue'),
          meta: { requiresAuth: true } // Ruta protegida
        },
        {
          path: '/transfer/mango-contact',
          name: 'transfer/mango-contact',
          component: () => import('../components/views/TransferMangoAccountView.vue'),
          meta: { requiresAuth: true } // Ruta protegida
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../components/views/NotFoundView.vue')
    }
  ]
});

// Guardias de navegación
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  
  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth && !userStore.isLoggedIn()) {
    next({ name: 'login' }); // Redirigir a Login si no está autenticado
  } else {
    next(); // Permitir acceso a la ruta
  }
});

export default router;
