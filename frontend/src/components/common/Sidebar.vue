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
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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

const goToRoute = (route) => {
  router.push(route);
  activeItem.value = menuItems.findIndex(item => item.route === route);
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