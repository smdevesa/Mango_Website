<template>
    <v-container>
      <v-dialog v-model="showPaymentOptions" max-width="400px">
        <v-card>
          <v-card-title class="headline">Selecciona un método de pago</v-card-title>
          <v-card-text v-if="selectedLink">
            <p><strong>Monto:</strong> ${{ selectedLink.amount }}</p>
            <p><strong>Descripción:</strong> {{ selectedLink.description }}</p>
            <v-btn @click="payWithAvailableBalance">Balance Disponible: ${{ availableBalance }}</v-btn>
            
            <!-- v-select para elegir la tarjeta -->
            <v-select
              v-model="selectedCard"
              :items="cardNumbers" 
              item-text="number" 
              item-value="id" 
              label="Selecciona una tarjeta"
              return-object
              outlined
            ></v-select>
            
            <v-btn @click="payWithCard" :disabled="!selectedCard">Pagar con Tarjeta</v-btn>
          </v-card-text>
          <v-card-text v-else>
            <p>ID de pago no válido o no encontrado.</p>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { usePayStore } from '@/store/payStore';
  import { useBalanceStore } from '@/store/balanceStore';
  import { useUserStore } from '@/store/userStore';
  import { useCardStore } from '@/store/cardStore'; // Importa el store de tarjetas
  import router from '@/router';
import { ro } from 'vuetify/locale';
  
  const route = useRoute();
  const payStore = usePayStore();
  const balanceStore = useBalanceStore();
  const userStore = useUserStore();
  const cardStore = useCardStore(); // Instancia el store de tarjetas
  
  const showPaymentOptions = ref(false);
  const selectedLink = ref(null);
  const selectedCard = ref(null); // Variable para almacenar la tarjeta seleccionada
  
  // Obtiene el balance disponible del usuario actual
  const availableBalance = balanceStore.availableBalance(userStore.currentUser.username);
  
  // Al montarse el componente, captura el `id` del path y obtiene el enlace correspondiente
  onMounted(() => {
    const linkId = route.params.id;
    if (linkId) {
      selectedLink.value = payStore.getLink(linkId);
      showPaymentOptions.value = !!selectedLink.value;
    }
  });
  
  // Computed para obtener solo los números de las tarjetas
  const cardNumbers = computed(() => {
    return cardStore.getCards.map(card => card.number);
  });
  
  const payWithAvailableBalance = () => {
    if (!selectedLink.value) return;
    if (balanceStore.transferMoney(userStore.currentUser.username, selectedLink.value.owner, selectedLink.value.amount)) {
      payStore.removeLink(selectedLink.value.id);
      showPaymentOptions.value = false;
      alert('Pago realizado con balance disponible.');
      router.push('/home');
    } else {
      alert('Fondos insuficientes.');
    }
  };
  
  const payWithCard = () => {
    if (!selectedCard.value) return; // Asegúrate de que se haya seleccionado una tarjeta
    // Lógica para procesar el pago con la tarjeta seleccionada
    showPaymentOptions.value = false;
    balanceStore.addMoney(selectedLink.value.owner, selectedLink.value.amount); // Añade el monto al balance del usuario
    payStore.removeLink(selectedLink.value.id);
    alert(`Pago realizado con tarjeta: ${selectedCard.value}`); // Aquí podrías agregar más lógica para el pago
    router.push('/home');
  };
  </script>
  