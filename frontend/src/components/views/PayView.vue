<template>
  <v-container>
    <ReusableCard title="Pagar">
      <v-form @submit.prevent="proceedToPayment">
        <ReusableInput
          v-model="paymentLink"
          label="Ingrese el link de pago"
          required
        ></ReusableInput>

        <v-btn
          class="button-container"
          @click="proceedToPayment"
        >
          Continuar
        </v-btn>
      </v-form>

      <v-alert
        v-if="error"
        type="error"
        class="mt-4"
      >
        {{ error }}
      </v-alert>
    </ReusableCard>
  </v-container>
  <v-snackbar 
  v-model="snackbar" 
  :color="snackbarColor" 
  location="top">
    {{ snackbarMessage }}
    <template #action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>

</template>

<script setup>
import { ref } from 'vue';
import { usePayStore } from '@/store/payStore';
import router from '@/router';

const paymentLink = ref('');
const error = ref('');
const payStore = usePayStore();
const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');

const proceedToPayment = () => {
  try {
    const linkId = extractLinkId(paymentLink.value);
    const selectedLink = payStore.getLink(linkId);
    
    if (selectedLink !== undefined) {
      error.value = '';
      router.push(`/payment/${linkId}`);
    } else {
      error.value = 'El link de pago no es válido';
    }
  } catch (e) {
    snackbarMessage.value = 'El link ingresado no es correcto'; // Mensaje de snackbar
    snackbarColor.value = 'error';
    snackbar.value = true; // Mostrar snackbar
  }
};

// Function to extract the `id` from the payment link
const extractLinkId = (link) => {
  try {
    // Verificar si el string es una URL válida
    const url = new URL(link);
    
    // Verificar si la URL tiene el formato esperado
    if (!url.pathname.includes('/payment/')) {
      throw new Error('URL inválida');
    }

    const segments = url.pathname.split('/');
    return segments[segments.length - 1];
  } catch (e) {
    throw new Error('URL inválida');
  }
};
</script>

<style scoped>
.button-container {
  display: block;
  color: #FFFBE6;
  background: #F19743;
  font-size: 17px;
  text-transform: none;
}
</style>
