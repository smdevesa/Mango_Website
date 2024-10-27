<template>
  <v-container>
    <!-- Fila superior con botón de volver y logo -->
    <v-row align="center" justify="space-between" class="top-row">
      <v-col cols="auto">
        <v-btn class="custom-button" @click="goBack">
          Volver
        </v-btn>
      </v-col>
    </v-row>

    <!-- Contenido específico de la transferencia -->
    <v-row justify="center" class="content-row">
      <v-col cols="7" class="text-center">
        <ReusableCard :title="title">
          <ReusableInput
            v-model="recipientUsername"
            :label="inputLabel"
            placeholder="Ingrese el dato"
          />
          <ReusableInput
            v-model="amount"
            label="Monto a transferir"
            placeholder="Ingrese el monto"
            type="number"
          />
          <p>Saldo disponible: ${{ balanceStore.formattedBalance(userStore.currentUser.username) }}</p>
          <v-btn class="continue-button" @click="handleContinue">Continuar</v-btn>
        </ReusableCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import ReusableCard from './ReusableCard.vue';
import ReusableInput from './ReusableInput.vue';
import { useUserStore } from '@/store/userStore';
import { useBalanceStore } from '@/store/balanceStore';

const router = useRouter();
const emit = defineEmits(['transfer']);
const userStore = useUserStore();
const balanceStore = useBalanceStore();

// Propiedades del componente
const props = defineProps({
  title: String,
  inputLabel: String,
  transferType: {
    type: String,
    default: 'internal'
  }
});

// Valor del input
const recipientUsername = ref('');
const amount = ref('');

// Función para volver a la página anterior
const goBack = () => {
  router.back();
};

const handleContinue = () => {
  if (recipientUsername.value && amount.value) {
    if (props.transferType === 'internal') {
      // Para transferencias entre usuarios Mango
      emit('transfer', {
        recipientUsername: recipientUsername.value,
        amount: Number(amount.value)
      });
    } else {
      // Para transferencias por CVU o alias
      emit('transfer', {
        recipientId: recipientUsername.value,
        amount: Number(amount.value)
      });
    }
  }
};
</script>

<style scoped>
.custom-button {
  border-radius: 55px;
  background-color: #3D3C37;
  color: white;
  text-align: left;
  width: 300px; /* Ajusta el tamaño según sea necesario */
  height: 50px;
  text-transform: none; /* Asegúrate de que no haya transformación de texto */
  font-size: 20px;
}

.continue-button {
  background-color: #F19743; /* Color de fondo del botón */
  color: white; /* Color del texto */
  text-transform: none; /* Para que el texto no esté en mayúsculas */
  font-size: 19px; /* Ajusta el tamaño de fuente si es necesario */
  margin-top: 10px; /* Espacio superior para separar del input */
}
</style>
