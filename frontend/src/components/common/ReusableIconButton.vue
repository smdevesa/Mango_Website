<template>
    <v-btn
      :outlined="outlined"
      :color="color"
      class="rounded-xl custom-button"
      :style="{ borderColor: borderColor }"
    >
      <v-icon left class="custom-icon">{{ icon }}</v-icon>
      {{ text }}
    </v-btn>
  </template>
  
  <script>
  export default {
    name: 'ReusableIconButton',
    props: {
      icon: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      color: {
        type: String,
        default: '#FFFBE6'
      },
      borderColor: {
        type: String,
        default: '#000' // Default black border
      },
      outlined: {
        type: Boolean,
        default: true // Default to having a border
      }
    }
  }
  </script>
  
  <style scoped>
  .custom-icon {
    color: #F19743; /* Cambia el color del icono */
  }

  .custom-button {
    text-transform: none; /* Evita que el texto se vea en mayúsculas */
    height: 60px;
    border: solid 0.5px;
    width: 100%;
  }
  </style>
  