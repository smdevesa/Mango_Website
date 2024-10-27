<!-- TransferMangoAccountView.vue -->
<template>
  <TransferForm
    title="Transferir a contacto Mango"
    inputLabel="Ingrese el nombre de usuario del contacto Mango"
    :transferType="'internal'"  
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

const handleTransfer = async ({ recipientUsername, amount }) => {
  error.value = '';
  

  const senderUsername = userStore.currentUser.username;

   // Verificar que no esté transfiriendo a sí mismo
   if (recipientUsername === senderUsername) {
    error.value = 'No puedes transferir dinero a tu propia cuenta';
    return;
  }
  
  // Verificar si el usuario destinatario existe
  if (!userStore.userExists(recipientUsername)) {
    error.value = 'El usuario destinatario no existe.';
    return;
  }

  // Intentar realizar la transferencia
  const success = balanceStore.transferMoney(senderUsername, recipientUsername, amount);

  if (success) {
    historyStore.addTransaction(senderUsername, recipientUsername, amount, 'Transferencia', new Date().toISOString());
    // Agregar a contactos frecuentes
    frequentContactsStore.addContact(senderUsername, recipientUsername);
    alert('Transferencia exitosa.');
    // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito
  } else {
    error.value = 'No se pudo realizar la transferencia. Verifica el saldo disponible.';
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
