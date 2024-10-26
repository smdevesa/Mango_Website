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
  
      <v-dialog v-model="showPaymentOptions" max-width="400px">
        <v-card>
          <v-card-title class="headline">Select a payment method</v-card-title>
          <v-card-text>
            <p><strong>Amount:</strong> ${{ selectedLink.amount }}</p>
            <p><strong>Description:</strong> {{ selectedLink.description }}</p>
            <v-btn @click="payWithAvailableBalance">Available Balance: ${{ availableBalance }}</v-btn>
            <v-btn @click="payWithCard">Card</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { usePayStore } from '@/store/payStore'; // Import the pay link store
  import { useBalanceStore } from '@/store/balanceStore';
  import { useUserStore } from '@/store/userStore';
  
  const balanceStore = useBalanceStore();
  const userStore = useUserStore();
  const paymentLink = ref('');
  const invalidLink = ref(false);
  const showPaymentOptions = ref(false);
  const selectedLink = ref({ amount: 0, description: '' });
  const payStore = usePayStore();
  const availableBalance = balanceStore.totalBalance(userStore.currentUser.username);
  
  const proceedToPayment = () => {
    showPaymentOptions.value = false;
    const linkId = extractLinkId(paymentLink.value);
    const link = payStore.getLink(linkId);
    if (link !== undefined) {
      selectedLink.value = link;
      showPaymentOptions.value = true;
      invalidLink.value = false;
    } else {
      invalidLink.value = true;
    }
  };
  
  // Function to extract the `id` from the payment link
  const extractLinkId = (link) => {
    const urlParams = new URLSearchParams(new URL(link).search);
    return urlParams.get('id');
  };
  
  const payWithAvailableBalance = () => {
    if (availableBalance.value >= selectedLink.value.amount) {
      availableBalance.value -= selectedLink.value.amount;
      payStore.removeLink(selectedLink.value.id);
      showPaymentOptions.value = false;
      alert('Payment made with available balance.');
    } else {
      alert('Insufficient funds.');
    }
  };
  
  const payWithCard = () => {
    payStore.removeLink(selectedLink.value.id);
    showPaymentOptions.value = false;
    alert('Payment made with card.');
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
  