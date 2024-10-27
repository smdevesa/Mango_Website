<template>
    <v-container>
      <h1>PAGINA DE PAGO</h1>
      <v-form @submit.prevent="proceedToPayment">
        <v-text-field
          v-model="paymentLink"
          label="Enter the payment link"
          required
        ></v-text-field>
  
        <v-btn
          class="button-container"
          @click="proceedToPayment"
        >
          Continue
        </v-btn>
      </v-form>
  
      <v-alert
        v-if="invalidLink"
        type="error"
        class="mt-4"
      >
        The payment link is not valid.
      </v-alert>
  
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { usePayStore } from '@/store/payStore'; // Import the pay link store
  import router from '@/router';
  
  const paymentLink = ref('');
  const invalidLink = ref(false);
  let selectedLink = null;
  const payStore = usePayStore();

  const proceedToPayment = () => {
    const linkId = extractLinkId(paymentLink.value);
    selectedLink = payStore.getLink(linkId);
    if (selectedLink !== undefined) {
      invalidLink.value = false;
      router.push(`/payment/${linkId}`);
    } else {
      selectedLink = null;
      invalidLink.value = true;
    }
  };
  
  // Function to extract the `id` from the payment link
  const extractLinkId = (link) => {
    const segments = new URL(link).pathname.split('/');
    return segments[segments.length - 1]; // Devuelve el último segmento después de "payment/"
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
  