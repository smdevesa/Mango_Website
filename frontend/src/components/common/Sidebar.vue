<template>
  <v-navigation-drawer
    app
    permanent
    color="#3D3C37"
  >
    <v-list dense>
      <v-list-item class="welcome-banner-item">
        <WelcomeBanner />
      </v-list-item>

      <!-- Enlaces a las secciones generados dinámicamente con v-for -->
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

      <!-- Botón de cerrar sesión -->
      <v-list-item @click="logout" class="custom-list-item">
        <v-icon class="menu-icon">mdi-logout</v-icon>
        <span class="menu-text">Cerrar sesión</span>
      </v-list-item>
      
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore'; // Asegúrate de importar tu store

// Menú con items dinámicos
const menuItems = [
  { title: 'Inicio', route: '/home', icon: 'mdi-home' },
  { title: 'Transferencias', route: '/transfer', icon: 'mdi-bank-transfer' },
  { title: 'Historial', route: '/history', icon: 'mdi-history' },
  { title: 'Inversiones', route: '/invest', icon: 'mdi-chart-line' },
  { title: 'Mis tarjetas', route: '/cards', icon: 'mdi-credit-card' }
];

const activeItem = ref(0); // Controla el ítem activo
const router = useRouter();
const userStore = useUserStore(); // Inicializa el store

const goToRoute = (route) => {
  router.push(route);
  activeItem.value = menuItems.findIndex(item => item.route === route);
};

// Función para cerrar sesión
const logout = () => {
  userStore.logout(); // Llama a la función de logout del store
  router.push('/login'); // Redirige a la página de login después de cerrar sesión
};
</script>

<style scoped>
.v-list-item {
  color: #FFFBE6;
}

.v-navigation-drawer {
  border-right: 1px solid #FFFBE6;
}

/* Clase personalizada para asegurar el estilo horizontal */
.custom-list-item {
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 10px; /* Añade algo de espacio al comienzo */
}

.menu-icon {
  margin-right: 12px;
}

.active-item {
  background-color: rgba(255, 255, 255, 0.2); /* Color de fondo para el ítem activo */
  color: #FFF; /* Cambia el color del texto si es necesario */
}
</style>
