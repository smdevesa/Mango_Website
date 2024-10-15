import { createRouter, createWebHistory } from 'vue-router'
import GeneralView from '../pages/GeneralView.vue'
import HistoryView from '../pages/HistoryView.vue'
import TransferView from '../pages/TransferWindow.vue'
import AddCardView from '../pages/AddCardView.vue'
import LoginView from '../pages/LoginView.vue'
import RegisterView  from "../pages/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GeneralView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/history',
      name: 'HistoryView',
      component: HistoryView
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: TransferView
    },
    {
      path: '/add-card',
      name: 'add-card',
      component: AddCardView
    }
  ]
})

export default router