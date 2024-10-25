<template>
  <v-navigation-drawer app permanent color="#3D3C37">
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
      <v-list-item @click="confirmLogout" class="custom-list-item">
        <v-icon class="menu-icon">mdi-logout</v-icon>
        <span class="menu-text">Cerrar sesión</span>
      </v-list-item>
    </v-list>

    <!-- Logo en la parte inferior -->
    <div class="logo-container">
      <img src="@/assets/mangoLogo3.png" alt="Logo" class="logo" />
    </div>

    <!-- Diálogo de confirmación de cierre de sesión -->
    <v-dialog v-model="logoutDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirmar Cierre de Sesión</v-card-title>
        <v-card-text>¿Estás seguro de que quieres cerrar sesión?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="logoutDialog = false">Cancelar</v-btn>
          <v-btn color="green" text @click="confirmLogoutAction">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
const logoutDialog = ref(false); // Controla el estado del diálogo

const goToRoute = (route) => {
  router.push(route);
  activeItem.value = menuItems.findIndex(item => item.route === route);
};

// Muestra el diálogo de confirmación de cierre de sesión
const confirmLogout = () => {
  logoutDialog.value = true;
};

// Función para confirmar el cierre de sesión
const confirmLogoutAction = () => {
  userStore.logout(); // Llama a la función de logout del store
  router.push('/login'); // Redirige a la página de login después de cerrar sesión
  logoutDialog.value = false; // Cierra el diálogo
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

/* Estilos para la imagen del logo */
.logo-container {
  display: flex;
  justify-content: center; /* Centrar el logo */
  padding: 20px 0; /* Espaciado alrededor del logo */
}

.logo {
  width: 80%; /* Ajusta el tamaño del logo */
  max-width: 100px; /* Tamaño máximo */
  margin-top: 200px; /* TRANSITORIO */
}
</style>
