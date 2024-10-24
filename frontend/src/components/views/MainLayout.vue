<template>
  <div class="layout">
    <Sidebar class="sidebar" />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../common/Sidebar.vue";
</script>

<style scoped>
.layout {
  display: flex; /* Usar Flexbox para organizar los elementos */
  min-height: 100vh; /* Altura completa de la pantalla */
  width: 100vw; /* Ancho completo de la pantalla */
  overflow: hidden; /* Evita desbordamiento horizontal */
}

.sidebar {
  width: 250px; /* Ancho fijo para la Sidebar */
  flex-shrink: 0; /* Impide que se encoja si falta espacio */
}

.main-content {
  flex-grow: 1; /* Ocupa el espacio restante */
  margin-left: 250px; /* Desplaza el contenido para que comience donde termina el Sidebar */
  padding: 20px; /* Espaciado interno */
  overflow: auto; /* Manejo de contenido que exceda el tamaño */
}
</style>
