<template>
    <v-container class="not-found-container">
      <h1>Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <reusableIconButton 
        color="#F19743" 
        class="boton" 
        @click="$router.push('/home')" 
        text="Volver al inicio" 
      />
    </v-container>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .not-found-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;     
    height: 50vh;           
    text-align: center;  
  }
  
  .boton {
    margin-top: 20px;
    width: 400px;
    font-size: 24px;
  }
  </style>
  