<template>
  <div class="card-container">
    <h3
      v-if="title"
      class="card-title"
    >
      {{ title }}
    </h3> <!-- Muestra el título solo si existe -->
    <v-card
      class="card-content"
      outlined
    >
      <slot /> <!-- Permite insertar contenido dinámico -->
    </v-card>
  </div>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    default: null, // Establece un valor por defecto a null
  },
});
</script>

<style scoped>
.card-container {
  position: relative;
  margin-bottom: 20px; /* Espaciado entre tarjetas */
}

.card-title {
  background: transparent; /* Fondo transparente para el título */
  border-radius: 5px; /* Esquinas redondeadas */
  font-weight: normal; /* Para quitar el bold */
  font-size: 20pt; /* Tamaño de fuente de 20 puntos */
}

.card-content {
  background-color: #D5ED9F; /* Color de fondo de la tarjeta */
  color: black; /* Color del texto dentro de la tarjeta */
  padding: 20px; /* Espaciado interno de la tarjeta */
}
</style>
