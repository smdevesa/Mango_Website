<template>
    <v-btn
      :outlined="outlined"
      :color="color"
      class="rounded-xl custom-button"
      :style="{ borderColor: borderColor }"
    >
      <v-icon
        left
        class="custom-icon"
      >
        {{ icon }}
      </v-icon>
      {{ text }}
    </v-btn>
  </template>
  
  <script setup>
  
  defineProps({
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#FFFBE6',
    },
    borderColor: {
      type: String,
      default: '#000', 
    },
    outlined: {
      type: Boolean,
      default: true, 
    },
  });
  
  </script>
  
  <style scoped>
  .custom-icon {
    color: #F19743; 
    font-size: 30px;
    margin-right: 25px;
  
    position: absolute;
    left: 20px;
  }
  
  .custom-button {
    text-transform: none; /* Evita que el texto se vea en mayúsculas */
    height: 60px;
    border: solid 1px;
    width: 95%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  </style>
  