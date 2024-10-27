<template>
  <v-container class="payment-container" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="payment-card">
          <v-card-title class="headline">Selecciona un método de pago</v-card-title>
          <v-card-text v-if="selectedLink" class="payment-content">
            <p class="payment-info"><strong>Monto:</strong> ${{ selectedLink.amount }}</p>
            <p class="payment-info"><strong>Descripción:</strong> {{ selectedLink.description }}</p>
            <v-btn @click="payWithAvailableBalance" class="payment-btn mb-4" block>
              Balance Disponible: ${{ availableBalance }}
            </v-btn>
            
            <v-select
              v-model="selectedCard"
              :items="cardNumbers" 
              item-text="number" 
              item-value="id" 
              label="Selecciona una tarjeta"
              return-object
              outlined
              class="mb-4"
            ></v-select>
            
            <v-btn @click="payWithCard" :disabled="!selectedCard" class="payment-btn" block>
              Pagar con Tarjeta
            </v-btn>
          </v-card-text>
          <v-card-text v-else class="payment-error">
            <p>ID de pago no válido o no encontrado.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePayStore } from '@/store/payStore';
import { useBalanceStore } from '@/store/balanceStore';
import { useUserStore } from '@/store/userStore';
import { useCardStore } from '@/store/cardStore';
import { useHistoryStore } from '@/store/historyStore'; // Importa el store de historial
import router from '@/router';

const route = useRoute();
const payStore = usePayStore();
const balanceStore = useBalanceStore();
const userStore = useUserStore();
const cardStore = useCardStore();
const historyStore = useHistoryStore(); // Instancia el store de historial

const showPaymentOptions = ref(false);
const selectedLink = ref(null);
const selectedCard = ref(null);

const availableBalance = balanceStore.availableBalance(userStore.currentUser.username);

onMounted(() => {
  const linkId = route.params.id;
  if (linkId) {
    selectedLink.value = payStore.getLink(linkId);
    showPaymentOptions.value = !!selectedLink.value;
  }
});

const cardNumbers = computed(() => {
  return cardStore.getCards.map(card => card.number);
});

const payWithAvailableBalance = () => {
  if (!selectedLink.value) return;

  if (balanceStore.transferMoney(userStore.currentUser.username, selectedLink.value.owner, selectedLink.value.amount)) {
    historyStore.addTransaction({
      fromUser: userStore.currentUser.username,
      toUser: selectedLink.value.owner,
      amount: selectedLink.value.amount,
      description: selectedLink.value.description,
      date: new Date().toISOString(),
    });
    payStore.removeLink(selectedLink.value.id);
    showPaymentOptions.value = false;
    alert('Pago realizado con balance disponible.');
    router.push('/home');
  } else {
    alert('Fondos insuficientes.');
  }
};

const payWithCard = () => {
  if (!selectedCard.value) return;

  historyStore.addTransaction({
    fromUser: userStore.currentUser.username,
    toUser: selectedLink.value.owner,
    amount: selectedLink.value.amount,
    description: selectedLink.value.description,
    date: new Date().toISOString(),
    method: `Tarjeta ${selectedCard.number}`
  });
  
  balanceStore.addMoney(selectedLink.value.owner, selectedLink.value.amount);
  payStore.removeLink(selectedLink.value.id);
  showPaymentOptions.value = false;
  alert(`Pago realizado con tarjeta: ${selectedCard.number}`);
  router.push('/home');
};

</script>

<style scoped>

.payment-container {
  background-color: #FFFBE6;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.headline {
  background-color: #D5ED9F;
  color: #333;
  font-weight: bold;
  padding: 16px;
  text-align: center;
}

.payment-content {
  padding: 20px;
}

.payment-info {
  margin-bottom: 12px;
  font-size: 16px;
}

.payment-btn {
  background-color: #FFFBE6 !important;
  color: #333 !important;
  font-weight: bold;
  text-transform: none;
  height: 48px;
}

.payment-error {
  text-align: center;
  color: #ff5252;
  font-weight: bold;
}
</style>
