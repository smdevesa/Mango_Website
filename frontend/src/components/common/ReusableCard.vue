<template>
    <div class="card-container">
      <h3
        v-if="title"
        class="card-title"
      >
        {{ title }}
      </h3> 
      <v-card
        class="card-content"
        outlined
      >
        <slot /> 
      </v-card>
    </div>
  </template>
  
  <script setup>
  
  defineProps({
    title: {
      type: String,
      default: null, 
    },
  });
  </script>
  
  <style scoped>
  .card-container {
    position: relative;
    margin-bottom: 20px; 
  }
  
  .card-title {
    background: transparent; 
    border-radius: 5px; 
    font-weight: normal; 
    font-size: 20pt; 
    text-align: left;
  }
  
  .card-content {
    background-color: #D5ED9F; 
    color: black; 
    padding: 20px; 
  }
  </style>
  