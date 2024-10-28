<!-- TransferNewAccountView.vue -->
<template>
  <TransferForm
    title="Transferir por CVU o Alias"
    inputLabel="Ingrese CVU o Alias"
    :transferType="'external'" 
    @transfer="handleTransfer"
  />

  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    location="top"
  >
    {{ snackbarMessage }}
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import TransferForm from '../common/TransferForm.vue';
import { useUserStore } from '@/store/userStore';
import { useBalanceStore } from '@/store/balanceStore';
import { useHistoryStore } from '@/store/historyStore';
import { useFrequentContactsStore } from '@/store/frequentContactsStore';
import { ref } from 'vue';

const userStore = useUserStore();
const balanceStore = useBalanceStore();
const historyStore = useHistoryStore();
const frequentContactsStore = useFrequentContactsStore();
const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');

const handleTransfer = async ({ recipientId, amount }) => {
  // Validar que el monto no sea negativo
  if (amount <= 0) {
    snackbarMessage.value = 'El monto debe ser mayor a 0';
    snackbarColor.value = 'error';
    snackbar.value = true;
    return;
  }

  // Validar el formato de CVU (18 dígitos) o un alias (formato: palabra.palabra.mango)
  const isCVU = /^\d{18}$/.test(recipientId);
  const isAlias = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.mango$/.test(recipientId);

  if (!isCVU && !isAlias) {
    snackbarMessage.value = 'El formato del CVU o alias no es válido';
    snackbarColor.value = 'error';
    snackbar.value = true;
    return;
  }

  // Verificar si existe un usuario con ese CVU o alias
  const recipientUser = userStore.findUserByCBUCVUOrAlias(recipientId);
  if (!recipientUser) {
    snackbarMessage.value = 'No se encontró ninguna cuenta asociada a este CVU o alias';
    snackbarColor.value = 'error';
    snackbar.value = true;
    return;
  }

  // Verificar que no esté transfiriendo a sí mismo
  const senderUsername = userStore.currentUser.username;
  if (recipientUser.username === senderUsername) {
    snackbarMessage.value = 'No puedes transferir dinero a tu propia cuenta';
    snackbarColor.value = 'error';
    snackbar.value = true;
    return;
  }

  // Verificar que el usuario tiene saldo suficiente
  if (amount > balanceStore.availableBalance(senderUsername)) {
    snackbarMessage.value = 'No tienes saldo suficiente para realizar esta transferencia';
    snackbarColor.value = 'error';
    snackbar.value = true;
    return;
  }

  // Realizar la transferencia
  const success = balanceStore.transferMoney(senderUsername, recipientUser.username, amount);

  if (success) {
    historyStore.addTransaction(senderUsername, recipientUser.username, amount, 'Transferencia', new Date().toISOString());
    frequentContactsStore.addContact(senderUsername, recipientUser.username);
    snackbarMessage.value = 'Transferencia exitosa';
    snackbarColor.value = 'success';
    snackbar.value = true;
  } else {
    snackbarMessage.value = 'No se pudo realizar la transferencia. Por favor, intente nuevamente.';
    snackbarColor.value = 'error';
    snackbar.value = true;
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
