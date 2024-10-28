<template>
  <v-container class="payment-container" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <ReusableCard title="Pagar">
          <div class="close-button-container">
            <v-btn
              icon="mdi-close"
              color="red"
              size="small"
              @click="goHome"
            ></v-btn>
          </div>
          <div v-if="selectedLink" class="payment-content">
            <p class="payment-info"><strong>Monto:</strong> ${{ selectedLink.amount }}</p>
            <div>
              <p class="payment-info"><strong>Descripción:</strong> {{ selectedLink.description }}</p>
            </div>
            
            <v-divider class="mb-7"></v-divider>
            
            <v-select
              v-model="selectedPaymentMethod"
              :items="paymentMethods"
              item-title="text"
              item-value="value"
              label="Selecciona un método de pago"
              outlined
              class="mb-4"
            ></v-select>
            
            <div class="text-center">
              <v-btn 
                @click="processPayment" 
                :disabled="!selectedPaymentMethod" 
                class="payment-btn"
              >
                Pagar
              </v-btn>
            </div>
          </div>
          <div v-else class="payment-error">
            <p>ID de pago no válido o no encontrado.</p>
          </div>
        </ReusableCard>
      </v-col>
    </v-row>

    <!-- Snackbar para mensajes de éxito -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="1000"
      location="top"
    >
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar.show = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePayStore } from '@/store/payStore';
import { useBalanceStore } from '@/store/balanceStore';
import { useUserStore } from '@/store/userStore';
import { useCardStore } from '@/store/cardStore';
import { useHistoryStore } from '@/store/historyStore';
import router from '@/router';
import ReusableCard from '@/components/common/ReusableCard.vue';

const route = useRoute();
const payStore = usePayStore();
const balanceStore = useBalanceStore();
const userStore = useUserStore();
const cardStore = useCardStore();
const historyStore = useHistoryStore();

const selectedLink = ref(null);
const selectedPaymentMethod = ref(null);

const availableBalance = computed(() => {
  return balanceStore.availableBalance(userStore.currentUser.username);
});

const paymentMethods = computed(() => {
  const methods = [
    { text: `Dinero en cuenta (Disponible: $${availableBalance.value})`, value: 'balance' }
  ];
  return methods.concat(cardStore.getCards.map(card => ({ text: `Tarjeta ${card.number}`, value: card.id })));
});

onMounted(() => {
  const linkId = route.params.id;
  if (linkId) {
    selectedLink.value = payStore.getLink(linkId);
  }
});

const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
});

const showSnackbar = (message, color = 'success') => {
  snackbar.value = {
    show: true,
    message,
    color
  };
};

const processPayment = () => {
  if (!selectedPaymentMethod.value) {
    showSnackbar('Por favor seleccione un método de pago', 'warning');
    return;
  }

  if (selectedPaymentMethod.value === 'balance') {
    payWithAvailableBalance();
  } else {
    payWithCard(selectedPaymentMethod.value);
  }
};

const payWithAvailableBalance = () => {
  if (!selectedLink.value) return;

  if (balanceStore.transferMoney(userStore.currentUser.username, selectedLink.value.owner, selectedLink.value.amount)) {
    historyStore.addTransaction(
      userStore.currentUser.username,
      selectedLink.value.owner,
      selectedLink.value.amount,
      selectedLink.value.description,
      new Date().toISOString()
    );
    payStore.removeLink(selectedLink.value.id);
    showSnackbar('Pago realizado con éxito');
    selectedPaymentMethod.value = null;
    setTimeout(() => {
      router.push('/home');
    }, 2000);
  } else {
    showSnackbar('Fondos insuficientes', 'error');
  }
};

const payWithCard = (cardId) => {
  const card = cardStore.getCards.find(c => c.id === cardId);
  if (!card) return;

  historyStore.addTransaction(
    userStore.currentUser.username,
    selectedLink.value.owner,
    selectedLink.value.amount,
    selectedLink.value.description,
    new Date().toISOString()
  );
  
  balanceStore.addMoney(selectedLink.value.owner, selectedLink.value.amount);
  payStore.removeLink(selectedLink.value.id);
  showSnackbar(`Pago realizado con éxito usando la tarjeta ${card.number}`);
  selectedPaymentMethod.value = null;
  setTimeout(() => {
    router.push('/home');
  }, 2000);
};

const goHome = () => {
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

.payment-content {
  padding: 20px;
}

.payment-info {
  margin-bottom: 8px;
  font-size: 16px;
}

.payment-btn {
  color: #FFFBE6;
  background: #F19743;
  font-size: 19px;
  text-transform: none;
  margin-top: -4%;
  width: 80%;
}

.text-center {
  display: flex;
  justify-content: center;
  width: 100%;
}

.payment-error {
  text-align: center;
  color: #ff5252;
  font-weight: bold;
}

.balance-text {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}


.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
}

.close-button-container {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;

}
</style>
