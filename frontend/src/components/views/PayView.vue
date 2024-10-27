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
        v-if="invalidLink"
        type="error"
        class="mt-4"
      >
        El link de pago no es válido 
      </v-alert>
    </ReusableCard>
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
    text-transform: none;
  }
  </style>
  