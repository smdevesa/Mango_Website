<template>
  <div class="banner-container">
    <v-img
      class="profile-picture"
      src="https://via.placeholder.com/50"
      alt="Profile Picture"
      contain
    />
    <label class="username">John Salchichon</label>
    <span class="notification-icon" @click="handleNotificationClick">
      <i class="mdi mdi-bell"></i> <!-- Ícono de notificaciones -->
    </span>
  </div>
</template>

<script setup>
const handleNotificationClick = () => {
  // Maneja el evento de clic en el ícono de notificaciones
  alert("¡Notificaciones clickeadas!");
};
</script>

<style scoped>
.banner-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  max-width: 250px; /* Mantiene el ancho máximo en 250px */
  box-sizing: border-box;
  background-color: #444;
  border-radius: 8px;
  color: #fff;
  margin-bottom: 10px;
}

.profile-picture {
  margin-right: 10px;
  border: solid 2px #fff; /* Especifica el color del borde aquí */
  border-radius: 50%; /* Esto hará que la imagen sea redonda */
  width: 50px;
  height: 50px;
  object-fit: cover; /* Asegura que la imagen se recorte adecuadamente en el contenedor */
}

.username {
  margin: 0; /* Elimina márgenes */
  font-size: 16px; /* Tamaño del texto */
  font-weight: bold; /* Estilo del texto */
}

.notification-icon {
  cursor: pointer; /* Cambia el cursor a pointer para indicar que es clickeable */
  color: #fff; /* Color del ícono */
  font-size: 24px; /* Tamaño del ícono */
}

.notification-icon :hover {
  color: #F19743;
}
</style>
