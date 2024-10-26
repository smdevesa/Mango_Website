<!-- TransferMangoAccountView.vue -->
<template>
  <TransferForm
    title="Transferir a contacto Mango"
    inputLabel="Ingrese el nombre de su contacto Mango"
    @transfer="handleTransfer"
  />
</template>

<script setup>
import TransferForm from '../common/TransferForm.vue';

const handleTransfer = (contactName) => {
  // Lógica para manejar la transferencia a contacto Mango
  console.log(`Transferir a contacto: ${contactName}`);
  // Aquí puedes hacer la llamada a la API o lo que necesites
};
</script>

<style scoped>
/* Estilos adicionales, si es necesario */
</style>
