<template>
    <div>
      <h1>Transferir a {{ transferType }}</h1>
      <div v-if="transferType === 'contacts'">
        <p>Contenido para Transferir a Contactos Mango.</p>
        <!-- Aquí puedes agregar la lógica y componentes necesarios para la transferencia a contactos -->
      </div>
      <div v-else-if="transferType === 'bank-details'">
        <p>Contenido para Transferir a CBU, CVU o Alias.</p>
        <!-- Aquí puedes agregar la lógica y componentes necesarios para la transferencia a CBU, CVU o Alias -->
      </div>
      <div v-else>
        <p>Tipo de transferencia no válido.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const transferType = route.params.type;
  </script>
  
  <style scoped>
  /* Agrega estilos aquí si es necesario */
  </style>
  