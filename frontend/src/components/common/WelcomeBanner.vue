<template>
  <div class="welcome-banner">
    <div class="profile-section">
      <img class="profile-picture" src="https://via.placeholder.com/60" alt="Profile Picture" />
      <div class="user-info">
        <h2 class="username">Welcome, John!</h2>
        <p class="user-role">Administrator</p>
      </div>
    </div>
    <button class="notification-button">
      <span class="material-icons">notifications</span>
    </button>
  </div>
</template>

<script setup>
// Importa un ícono si estás usando un paquete de íconos específico
</script>

<style scoped>
.welcome-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
  background-color: #444;
  color: #fff;
}

.profile-section {
  display: flex;
  align-items: center;
}

.profile-picture {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.user-role {
  margin: 0;
  font-size: 14px;
  color: #ccc;
}

.notification-button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
}

.notification-button .material-icons {
  font-size: 24px;
}
</style>
