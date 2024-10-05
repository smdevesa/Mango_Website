<!--<template>
  <div class="pill" :style="{ backgroundColor: bgColor }">
      <div class="icon" :style="{ backgroundColor: iconColor }"></div>
      <div class="text-container">
          <span class="name">{{ name }}</span>
          <div class="value-container">
              <span class="value">{{ value }}</span>
          </div>
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
  align-items: center; /* Centra verticalmente el contenido */
  padding: 10px 20px; /* Espaciado interno */
  border-radius: 20px; /* Bordes redondeados para el efecto de píldora */
  margin: 5px; /* Espaciado entre píldoras */
  color: #000; /* Cambiar el color del texto a negro */
  /*font-weight: bold; /* Texto en negrita */
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
  align-items: center; /* Centra verticalmente el texto */
  justify-content: space-between; /* Espacio entre el nombre y el valor */
  flex-grow: 1; /* Permitir que el contenedor de texto crezca para llenar el espacio */
  font-weight: normal;
}

.name {
  font-size: 18px; /* Tamaño de fuente para el nombre */
  text-align: left; /* Alinear a la izquierda */
  line-height: 20px; /* Ajustar el line-height para centrar verticalmente */
}

.value-container {
  background-color: #F19743; /* Fondo naranja */
  border: 2px solid #000; /* Borde negro */
  border-radius: 15px; /* Bordes redondeados para la píldora */
  padding: 4px 20px; /* Espaciado interno para la píldora */
}

.value {
  font-size: 16px; /* Tamaño de fuente para el valor */
  opacity: 0.8; /* Opacidad menor para el valor */
  text-align: right; /* Alinear a la derecha */
  font-weight: bold;
}
</style>
-->

<template>
  <div class="pill-button" :style="{ backgroundColor: bgColor }">
    <div class="icon" :style="{ backgroundColor: iconColor }">
      <v-icon>{{ icon }}</v-icon>
    </div>
    <div class="text-container">
      <span class="name">{{ name }}</span>
    </div>
    <div class="amount-pill" style="background-color: orange;">
      <span>{{ "$"+value }}</span> <!-- Muestra el valor asignado -->
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
      default: '#000',
    },
    bgColor: {
      type: String,
      default: '#FFFBE6',
    },
  },
};
</script>

<style scoped>
.pill-button {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 20px;
  margin: 5px;
  color: #000;
  font-weight: bold;
  justify-content: space-between;
  cursor: pointer;
}

.icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}

.text-container {
  flex-grow: 1;
  border: #000;
}

.name {
  font-size: 16px;
}

.amount-pill {
  border-radius: 12px; /* Forma de píldora */
  padding: 5px 10px;
  color: white;
}
</style>


