<template>
  <div class="invest-rescue-container">
    <!-- Píldoras existentes -->
    <PillButton
      name="Dinero disponible"
      :value="availableBalance"
      icon="mdi-cash"
      icon-color="#4CAF50"
      prefix="$"
    />
    <PillButton
      name="Invertido"
      :value="investedBalance"
      icon="mdi-chart-line"
      icon-color="#2196F3"
      prefix="$"
    />

    <!-- Botones de acción -->
    <div class="action-buttons">
      <v-btn color="secondary" @click="openRedeemDialog">Rescatar</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="openSubscribeDialog">Invertir</v-btn>
    </div>

    <!-- Diálogo de SUSCRIPCION -->
    <v-dialog v-model="subscribeDialog" max-width="400px">
      <v-card>
        <v-card-title>Suscribir Inversión</v-card-title>
        <v-card-text>
          <ReusableInput
            v-model="subscribeAmount"
            label="Monto a invertir"
            prefix="$"
            type="number"
          ></ReusableInput>
          <p v-if="subscribeError" class="error-message">{{ subscribeError }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="subscribeDialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="submitSubscription">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo de RESCATE -->
    <v-dialog v-model="redeemDialog" max-width="400px">
      <v-card>
        <v-card-title>Rescatar Inversión</v-card-title>
        <v-card-text>
          <ReusableInput
            v-model="redeemAmount"
            label="Monto a rescatar"
            prefix="$"
            type="number"
          ></ReusableInput>
          <p v-if="redeemError" class="error-message">{{ redeemError }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="redeemDialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="submitRedemption">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBalanceStore } from '@/store/balanceStore';
import { useUserStore } from '@/store/userStore';
import PillButton from './PillButton.vue';
import ReusableInput from './ReusableInput.vue';

const balanceStore = useBalanceStore();
const userStore = useUserStore();

const subscribeDialog = ref(false);
const redeemDialog = ref(false);
const subscribeAmount = ref(0);
const redeemAmount = ref(0);
const subscribeError = ref('');
const redeemError = ref('');

const openSubscribeDialog = () => {
  subscribeDialog.value = true;
  subscribeError.value = '';
};

const openRedeemDialog = () => {
  redeemDialog.value = true;
  redeemError.value = '';
};

const submitSubscription = () => {
  const amount = parseFloat(subscribeAmount.value);
  if (isNaN(amount) || amount <= 0) {
    subscribeError.value = 'Por favor, ingrese un monto válido.';
    return;
  }
  if (amount > balanceStore.availableBalance(userStore.currentUser.username)) {
    subscribeError.value = 'Saldo insuficiente.';
    return;
  }
  
  balanceStore.addSection(userStore.currentUser.username, {
    label: 'Invertido',
    value: amount,
    color: '#2196F3'
  });
  
  subscribeDialog.value = false;
  subscribeAmount.value = 0;
};

const submitRedemption = () => {
  const amount = parseFloat(redeemAmount.value);
  if (isNaN(amount) || amount <= 0) {
    redeemError.value = 'Por favor, ingrese un monto válido.';
    return;
  }
  const investedSection = balanceStore.users[userStore.currentUser.username].sections.find(s => s.label === 'Invertido');
  if (!investedSection || amount > investedSection.value) {
    redeemError.value = 'Monto a rescatar excede la inversión actual.';
    return;
  }
  
  balanceStore.removeSection(userStore.currentUser.username, balanceStore.users[userStore.currentUser.username].sections.findIndex(s => s.label === 'Invertido'));
  if (investedSection.value > amount) {
    balanceStore.addSection(userStore.currentUser.username, {
      label: 'Invertido',
      value: investedSection.value - amount,
      color: '#2196F3'
    });
  }
  
  redeemDialog.value = false;
  redeemAmount.value = 0;
};

const availableBalance = computed(() => {
  return balanceStore.availableBalance(userStore.currentUser.username).toFixed(2);
});

const investedBalance = computed(() => {
  const investedSection = balanceStore.users[userStore.currentUser.username].sections.find(s => s.label === 'Invertido');
  return investedSection ? investedSection.value.toFixed(2) : '0.00';
});
</script>

<style scoped>
.invest-rescue-container {
  padding: 1rem;
}

.action-buttons {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-transform: none;
}

.action-buttons .v-btn {
  text-transform: none; /* Quita las mayúsculas de Vuetify */
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: 0.5em;
}
</style>
