<template>
  <v-container>
    <ReusableCard title="Cobrar">
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
  </ReusableCard>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { usePayStore } from '@/store/payStore'; // Importa el store de pagos
import { useUserStore } from '@/store/userStore';

const domain = 'https://localhost:3000';
const monto = ref('');
const descripcion = ref('');
const enlaceGenerado = ref('');
const mostrarAlertaMonto = ref(false);
const payStore = usePayStore(); // Inicializa el store de pagos
const userStore = useUserStore();

const generarEnlace = () => {
  if (!monto.value) {
    mostrarAlertaMonto.value = true;
    return;
  }

  mostrarAlertaMonto.value = false;

  // Genera un ID único para el enlace (esto es solo un ejemplo; reemplázalo con tu lógica)
  const linkId = `${Date.now()}`;
  const baseUrl = domain + '/pay';
  const params = new URLSearchParams({
    id: linkId
  });
  enlaceGenerado.value = `${baseUrl}?${params.toString()}`;

  // Guarda el enlace en el store
  payStore.addLink(userStore.currentUser.username, linkId, monto.value, descripcion.value);
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
