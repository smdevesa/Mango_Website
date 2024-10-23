<!-- TransferNewAccountView.vue -->
<template>
      <TransferForm
        title="Transferir por CVU o Alias"
        inputLabel="Ingrese CVU, CBU o Alias"
        @transfer="handleTransfer"
      />
  </template>
  
  <script setup>
import TransferForm from '../common/TransferForm.vue';

  const handleTransfer = (cvuOrAlias) => {
    // Lógica para manejar la transferencia por CVU o Alias
    console.log(`Transferir a CVU/CBU/Alias: ${cvuOrAlias}`);
    // Aquí puedes hacer la llamada a la API o lo que necesites
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales, si es necesario */
  </style>
  