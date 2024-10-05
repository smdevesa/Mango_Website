<template>
    <div class="pill" :style="{ backgroundColor: bgColor }">
      <div class="icon" :style="{ backgroundColor: iconColor }"></div>
      <div class="text-container">
        <span class="name">{{ name }}</span>
        <span class="value">{{ value }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PlannerInput',
    props: {
      name: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
      iconColor: {
        type: String,
        default: '#000', // Color por defecto del icono
      },
      bgColor: {
        type: String,
        default: '#FFFBE6', // Color de fondo por defecto
      },
    },
  };
  </script>
  
  <style scoped>
  .pill {
    display: flex; /* Flex para alinear el icono y el texto */
    align-items: center; /* Centra verticalmente */
    padding: 10px 15px; /* Espaciado interno */
    border-radius: 20px; /* Bordes redondeados para el efecto de píldora */
    margin: 5px; /* Espaciado entre píldoras */
    color: #000; /* Cambiar el color del texto a negro */
    font-weight: bold; /* Texto en negrita */
    justify-content: space-between; /* Espacio entre el texto y el valor */
  }
  
  .icon {
    width: 20px; /* Ancho del círculo */
    height: 20px; /* Alto del círculo */
    border-radius: 50%; /* Hacer el círculo */
    margin-right: 10px; /* Espacio entre el icono y el texto */
  }
  
  .text-container {
    display: flex; /* Flex para alinear nombre y valor */
    justify-content: space-between; /* Espacio entre el nombre y el valor */
    flex-grow: 1; /* Permitir que el contenedor de texto crezca para llenar el espacio */
  }
  
  .name {
    font-size: 16px; /* Tamaño de fuente para el nombre */
    text-align: left; /* Alinear a la izquierda */
  }
  
  .value {
    font-size: 14px; /* Tamaño de fuente para el valor */
    opacity: 0.8; /* Opacidad menor para el valor */
    text-align: right; /* Alinear a la derecha */
  }
  </style>
  