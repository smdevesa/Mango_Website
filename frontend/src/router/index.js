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
      redirect: '/register'  // Redirige al register cuando el usuario entra a "/"
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: GeneralView
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