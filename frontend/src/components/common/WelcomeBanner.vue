<template>
  <div class="banner-container">
    <v-img
      class="profile-picture"
      src="https://via.placeholder.com/50"
      alt="Profile Picture"
      contain
    />
    <label class="username">{{ userStore.currentUser.username }}</label>
    <span class="notification-icon" @click="handleNotificationClick">
      <i class="mdi mdi-bell"></i>
    </span>
  </div>

  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    location="top"
  >
    {{ snackbarMessage }}
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useUserStore } from '@/store/userStore';
import { ref } from 'vue';

const userStore = useUserStore();

const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');

const handleNotificationClick = () => {
  snackbarMessage.value = 'No hay notificaciones pendientes';
  snackbarColor.value = 'info';
  snackbar.value = true;
};
</script>

<style scoped>
.banner-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  max-width: 250px; 
  box-sizing: border-box;
  background-color: #444;
  border-radius: 8px;
  color: #fff;
  margin-bottom: 10px;
}

.profile-picture {
  margin-right: 10px;
  border: solid 2px #fff; 
  border-radius: 50%; 
  max-width: 50px; 
  max-height: 50px; 
  object-fit: cover; 
}

.username {
  margin: 0; 
  font-size: 16px; 
  font-weight: bold; 
  flex-grow: 1; 
  min-width: 0; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}

.notification-icon {
  cursor: pointer; 
  color: #fff;
  font-size: 24px; 
}

.notification-icon:hover {
  color: #F19743;
}
</style>
