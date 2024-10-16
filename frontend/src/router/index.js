import { createRouter, createWebHistory } from 'vue-router'
import GeneralView from '../components/views/GeneralView.vue'
import HistoryView from '../components/views/HistoryView.vue'
import TransferView from '../components/views/TransferView.vue'
import AddCardView from '../components/views/AddCardView.vue'
import LoginView from '../components/views/LoginView.vue'
import RegisterView  from "../components/views/RegisterView.vue";

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