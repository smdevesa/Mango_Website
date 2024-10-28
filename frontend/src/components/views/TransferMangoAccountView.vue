<!-- TransferMangoAccountView.vue -->
<template>
  <TransferForm
    title="Transferir a contacto Mango"
    inputLabel="Ingrese el nombre de usuario del contacto Mango"
    :transferType="'internal'"  
    @transfer="handleTransfer"
  />
  
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    :timeout="3000"
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
const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
});

const handleTransfer = async ({ recipientUsername, amount }) => {
  // Validar que el monto no sea negativo
  if (amount <= 0) {
    snackbar.value = {
      show: true,
      message: 'El monto debe ser mayor a 0',
      color: 'error'
    };
    return;
  }

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
    frequentContactsStore.addContact(senderUsername, recipientUsername);
    snackbar.value = {
      show: true,
      message: 'Transferencia exitosa',
      color: 'success'
    };
  } else {
    snackbar.value = {
      show: true,
      message: 'No se pudo realizar la transferencia. Verifica el saldo disponible.',
      color: 'error'
    };
  }
};

const showSnackbar = (message, color = 'success') => {
  snackbar.value = {
    show: true,
    message,
    color
  };
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
