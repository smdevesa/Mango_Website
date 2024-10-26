<template>
  <v-container>
    <h1>VENTANA DE COBRO</h1>
    <v-form @submit.prevent="generarEnlace">
      <ReusableInput
        v-model="monto"
        label="Monto a cobrar"
        type="number"
        required
      ></ReusableInput>
      <v-textarea
        v-model="descripcion"
        label="Descripción del cobro"
        required
      ></v-textarea>
      <v-btn class="button-container" @click="generarEnlace"> 
        Generar enlace de pago
      </v-btn>
    </v-form>
    <v-alert
      v-if="enlaceGenerado"
      type="success"
      class="mt-4"
    >
      Enlace de pago generado: <a :href="enlaceGenerado" target="_blank">{{ enlaceGenerado }}</a>
    </v-alert>
    <v-alert
      v-if="mostrarAlertaMonto"
      type="error"
      class="mt-4"
    >
      Debe ingresar un monto para generar un enlace
    </v-alert>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const monto = ref('');
const descripcion = ref('');
const enlaceGenerado = ref('');
const mostrarAlertaMonto = ref(false);

const generarEnlace = () => {
  if (!monto.value) {
    mostrarAlertaMonto.value = true;
    return;
  }
  
  mostrarAlertaMonto.value = false;
  // Aquí deberías implementar la lógica para generar el enlace de pago
  // Esto es solo un ejemplo y deberías reemplazarlo con tu lógica real
  const baseUrl = 'https://mango$-pay.com/pagar';
  const params = new URLSearchParams({
    monto: monto.value,
    descripcion: descripcion.value
  });
  enlaceGenerado.value = `${baseUrl}?${params.toString()}`;
};
</script>

<style scoped>
.button-container {
display: block;
  color: #FFFBE6;
  background: #F19743;
  font-size: 17px;
}
</style>
