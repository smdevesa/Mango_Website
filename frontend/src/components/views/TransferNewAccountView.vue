<!-- TransferNewAccountView.vue -->
<template>
  <TransferForm
    title="Transferir por CVU o Alias"
    inputLabel="Ingrese CVU o Alias"
    :transferType="'external'" 
    @transfer="handleTransfer"
  />
  <p v-if="error" class="error-message">{{ error }}</p>
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
const error = ref('');

const handleTransfer = async ({ recipientId, amount }) => {
  error.value = '';
  

  const senderUsername = userStore.currentUser.username;

  // Validar el formato de CVU (18 dígitos) o un alias (formato: palabra.palabra.mango)
  const isCVU = /^\d{18}$/.test(recipientId);
  const isAlias = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.mango$/.test(recipientId);

  if (!isCVU && !isAlias) {
    error.value = 'El formato del CVU o alias no es válido';
    return;
  }

  // Verificar si existe un usuario con ese CVU o alias
  const recipientUser = userStore.findUserByCBUCVUOrAlias(recipientId);
  if (!recipientUser) {
    error.value = 'No se encontró ninguna cuenta asociada a este CVU o alias';
    return;
  }

  // Verificar que no esté transfiriendo a sí mismo
  if (recipientUser.username === senderUsername) {
    error.value = 'No puedes transferir dinero a tu propia cuenta';
    return;
  }

  // Verificar que el usuario tiene saldo suficiente
  if (amount > balanceStore.availableBalance(senderUsername)) {
    error.value = 'No tienes saldo suficiente para realizar esta transferencia';
    return;
  }

  // Realizar la transferencia
  const success = balanceStore.transferMoney(senderUsername, recipientUser.username, amount);

  if (success) {
    historyStore.addTransaction(senderUsername, recipientUser.username, amount, 'Transferencia', new Date().toISOString());
    // Agregar a contactos frecuentes
    frequentContactsStore.addContact(senderUsername, recipientUser.username);
    alert('Transferencia exitosa');
  } else {
    error.value = 'No se pudo realizar la transferencia. Por favor, intente nuevamente.';
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
