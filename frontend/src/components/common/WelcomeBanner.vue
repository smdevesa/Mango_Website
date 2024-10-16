<template>
  <v-card class="welcome-banner" outlined>
    <v-row align="center" justify="start" class="banner-content">
      <v-col cols="auto" class="profile-col">
        <v-img :src="profileImage" class="profile-image" />
        <v-card-title class="username">
          Bienvenido,
          <br />
          {{ username }}
        </v-card-title>
      </v-col>
      <v-col cols="auto" class="menu-col">
        <!-- Menú desplegable con los 3 puntos -->
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn icon v-bind="props" class="menu-button">
              <v-icon class="menu-icon">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click.stop="showDialog = true">
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <!-- Diálogo de confirmación para cerrar sesión -->
    <v-dialog v-model="showDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirmar cierre de sesión</v-card-title>
        <v-card-text>
          ¿Estás seguro de que deseas cerrar sesión?
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="showDialog = false">Cancelar</v-btn>
          <v-btn text color="red" @click="logout">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  username: {
    type: String,
    default: 'Juan F. Palermo',
  },
  profileImage: {
    type: String,
    default: 'https://placehold.co/50x50',
  },
});

const showDialog = ref(false);

// Lógica para cerrar sesión (aquí iría la llamada a la API)
const logout = () => {
  // Aquí iría la lógica para hacer la llamada a la API de cierre de sesión
  alert('Sesión cerrada exitosamente');
  showDialog.value = false;
};
</script>

<style scoped>
.welcome-banner {
  border-radius: 55px;
  background-color: #3d3c37;
  color: white;
  text-align: left;
  width: 500px;
  height: 70px;
  margin-bottom: 20px;
}

.profile-col {
  display: flex;
  align-items: center; /* Alinea verticalmente la imagen y el nombre */
  margin-left: 30px;
}

.profile-image {
  width: 50px;
  height: 50px;
  margin-right: 10px; /* Espacio entre la imagen y el nombre */
  border-radius: 50%;
  border: solid #ff9500 2px;
}

.username {
  white-space: normal;
  font-size: 13pt;
  margin: 0; /* Asegúrate de que no haya margen adicional */
}

.menu-col {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}

.menu-button {
  margin-right: 20px;
  background-color: transparent;
  box-shadow: none;
  border: none;
}

.menu-icon {
  color: white;
  transition: color 0.3s;
}

.menu-button:hover .menu-icon {
  color: #ff9500;
}

/* Estilos para embellecer el menú */
.v-list-item-title {
  color: #3d3c37;
  font-weight: bold;
}

.v-list-item:hover {
  background-color: #3d3c37 !important;
  color: white;
}

.v-list-item:hover .v-list-item-title {
  color: white;
}
</style>

