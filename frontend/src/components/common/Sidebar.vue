<template>
  <v-navigation-drawer app permanent color="#3D3C37">
    <v-list dense>
      <v-list-item class="welcome-banner-item">
        <WelcomeBanner />
      </v-list-item>


      <v-list-item-group v-model="activeItem">
        <v-list-item 
          v-for="(item, index) in menuItems" 
          :key="index" 
          @click="goToRoute(item.route)" 
          :class="['custom-list-item', { 'active-item': activeItem === index }]"
        >
          <v-icon class="menu-icon">{{ item.icon }}</v-icon>
          <span class="menu-text">{{ item.title }}</span>
        </v-list-item>
      </v-list-item-group>

 
      <v-list-item @click="confirmLogout" class="custom-list-item">
        <v-icon class="menu-icon">mdi-logout</v-icon>
        <span class="menu-text">Cerrar sesión</span>
      </v-list-item>
    </v-list>

    
    <v-dialog v-model="logoutDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirmar Cierre de Sesión</v-card-title>
        <v-card-text>¿Estás seguro de que quieres cerrar sesión?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="logoutDialog = false" class="btn-class">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="confirmLogoutAction" class="btn-class">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';


const menuItems = [
  { title: 'Inicio', route: '/home', icon: 'mdi-home' },
  { title: 'Transferencias', route: '/transfer', icon: 'mdi-bank-transfer' },
  { title: 'Historial', route: '/history', icon: 'mdi-history' },
  { title: 'Cobrar', route: '/charge', icon: 'mdi-cash-register' },
  { title: 'Pagar', route: '/pay', icon: 'mdi-cash-fast' },
  { title: 'Mis tarjetas', route: '/cards', icon: 'mdi-credit-card' }
];

const activeItem = ref(0); 
const router = useRouter();
const userStore = useUserStore(); 
const logoutDialog = ref(false); 

const goToRoute = (route) => {
  router.push(route);
  activeItem.value = menuItems.findIndex(item => item.route === route);
};

const confirmLogout = () => {
  logoutDialog.value = true;
};

const confirmLogoutAction = () => {
  userStore.logout(); 
  router.push('/login'); 
  logoutDialog.value = false; 
};
</script>

<style scoped>
.v-list-item {
  color: #FFFBE6;
}

.v-navigation-drawer {
  border-right: 1px solid #FFFBE6;
}

.custom-list-item {
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 10px;
}

.menu-icon {
  margin-right: 12px;
}

.active-item {
  background-color: rgba(255, 255, 255, 0.2); 
  color: #FFF; 
}

.btn-class {
  text-transform: none;
  font-size: 18px;
}
</style>
