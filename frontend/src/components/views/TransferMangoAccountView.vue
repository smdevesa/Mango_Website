<!-- TransferMangoAccountView.vue -->
<template>
  <TransferForm
    title="Transferir a contacto Mango"
    inputLabel="Ingrese el nombre de usuario del contacto Mango"
    @transfer="handleTransfer"
  />
  <p v-if="error" class="error-message">{{ error }}</p>
</template>

<script setup>
import TransferForm from '../common/TransferForm.vue';
import { useUserStore } from '@/store/userStore';
import { useBalanceStore } from '@/store/balanceStore';
import { ref } from 'vue';

const userStore = useUserStore();
const balanceStore = useBalanceStore();

const error = ref('');

const handleTransfer = async ({ recipientUsername, amount }) => {
  error.value = '';
  
  if (!userStore.currentUser) {
    error.value = 'Debes iniciar sesión para realizar una transferencia.';
    return;
  }

  const senderUsername = userStore.currentUser.username;
  
  // Verificar si el usuario destinatario existe
  if (!userStore.userExists(recipientUsername)) {
    error.value = 'El usuario destinatario no existe.';
    return;
  }

  // Intentar realizar la transferencia
  const success = balanceStore.transferMoney(senderUsername, recipientUsername, amount);

  if (success) {
    console.log(`Transferencia exitosa: ${amount} de ${senderUsername} a ${recipientUsername}`);
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
