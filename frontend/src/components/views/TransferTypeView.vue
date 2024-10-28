<template>
    <div>
      <h1>Transferir a {{ transferType }}</h1>
      <div v-if="transferType === 'contacts'">
        <p>Contenido para Transferir a Contactos Mango.</p>
       
      </div>
      <div v-else-if="transferType === 'bank-details'">
        <p>Contenido para Transferir a CBU, CVU o Alias.</p>
        
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

  </style>
  