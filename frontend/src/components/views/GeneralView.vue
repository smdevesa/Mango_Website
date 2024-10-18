<template>
    <v-container>
      <v-row align="center" justify="space-between">
        <v-col cols="auto">
          <WelcomeBanner />
        </v-col>
        <v-col cols="auto">
          <img :src="mangoLogo"
          alt="Logo"
          class="app-logo"
            >
        </v-col>
      </v-row>
  
      <ReusableCard title="Balance">
        <v-row class="balance-layout">
          <v-col cols="5">
            <CircularBalance
                :balance="'$1,234.56'"
                :sections="[
                { label: 'Ahorros', percentage: 70, color: 'purple' },
                { label: 'Gastos', percentage: 10, color: 'red' },
                { label: 'Inversiones', percentage: 20, color: 'cyan' }
              ]"
            />
          </v-col>
  
          <v-col cols="7" class="button-column">
            <v-row justify="center">
              <v-col cols="6">
                <ReusableIconButton
                    icon="mdi-bank-transfer"
                    text="Transferir"
                    @click="goToTransfer"
                />
              </v-col>
              <v-col cols="6">
                <ReusableIconButton
                    icon="mdi-cash-plus"
                    text="Ingresar"
                    @click="handleShowCvu"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="6">
                <ReusableIconButton
                    icon="mdi-cash-minus"
                    text="Retirar"
                />
              </v-col>
              <v-col cols="6">
                <ReusableIconButton
                    icon="mdi-credit-card-plus"
                    text="Añadir tarjeta"
                    @click="goToAddCard"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </ReusableCard>
  
      <v-row>
        <v-col cols="6">
          <ReusableCard title="Planificador de Gastos">
            <v-card class="planner-card">
              <v-card-text class="planner-input-container scrollable-pills">
                <PillManager
                    @add-pill="addPill"
                />
              </v-card-text>
            </v-card>
          </ReusableCard>
        </v-col>
  
        <v-col cols="6">
          <ReusableCard title="Historial">
            <v-card class="historial-card">
              <v-card-text>
                <TransactionItem
                    logo-url="https://www.shutterstock.com/image-vector/c-icon-vector-logo-sign-600nw-2242697067.jpg"
                    name="Carrefour"
                    date="2024-10-03 14:35"
                    :amount="-50.75"
                />
                <TransactionItem
                    logo-url="https://brandemia.org/contenido/subidas/2022/10/marca-mcdonalds-logo.png"
                    name="McDonalds"
                    date="2024-10-01 09:00"
                    :amount="-1500.00"
                />
                <TransactionItem
                    logo-url="https://blog.saleslayer.com/hubfs/mercado-libre-logo.jpg"
                    name="Mercado Libre"
                    date="2024-09-30 12:45"
                    :amount="200.00"
                />
                <div class="historial-button" @click="goToHistory">
                  Ver historial completo
                </div>
              </v-card-text>
            </v-card>
          </ReusableCard>
        </v-col>
      </v-row>
  
      <!-- Diálogo para mostrar CVU y Alias -->
      <v-dialog v-model="showCvuDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Recibir Dinero</v-card-title>
          <v-card-text>
            <div class="cvu-info">
              <p><strong>CVU:</strong> {{ cvu }}</p>
              <p><strong>Alias:</strong> {{ alias }}</p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="showCvuDialog = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import WelcomeBanner from '../common/WelcomeBanner.vue';
  import ReusableCard from '../common/ReusableCard.vue';
  import CircularBalance from '../common/CircularBalance.vue';
  import ReusableIconButton from '../common/ReusableIconButton.vue';
  import TransactionItem from '../common/TransactionItem.vue';
  import PillManager from '../common/PillManager.vue';
  import mangoLogo from '@/assets/mangoLogo.png';
  
  const router = useRouter();
  
  // Definimos el estado para mostrar el diálogo
  const showCvuDialog = ref(false);
  
  // CVU y alias que traerá la API
  const cvu = ref('');
  const alias = ref('');
  
  // Funciones de navegación
  const goToTransfer = () => {
    router.push('/transfer');
  };
  
  const goToAddCard = () => {
    router.push('/add-card');
  };
  
  const goToHistory = () => {
    router.push('/history');
  };
  
  // Función para manejar el click en "Ingresar"
  const handleShowCvu = () => {
    // Simulación de llamada a la API para obtener el CVU y alias
    fetchCvuAndAlias().then(data => {
      cvu.value = data.cvu;
      alias.value = data.alias;
      showCvuDialog.value = true; // Mostrar el modal
    });
  };
  
  // Llamada simulada a la API (esta sería tu lógica real)
  const fetchCvuAndAlias = () => {
    return new Promise(resolve => {
      // Simulación de respuesta de la API (en tu caso harás una llamada real)
      setTimeout(() => {
        resolve({
          cvu: '260611260611260611',
          alias: 'cobayo.platudo.arg'
        });
      }, 1000);
    });
  };
  
  const addPill = (newPill) => {
    // Aquí debes manejar cómo agregar la nueva píldora
    console.log('Píldora agregada:', newPill);
  };
  </script>
  
  <style scoped>
  .app-logo {
    width: 150px;
    height: 150px;
    margin-right: 10px;
  }
  
  .button-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
  
  .planner-input-container {
    padding: 0;
    margin: 0;
  }
  
  .planner-input-container > *:first-child {
    margin-top: 10px;
  }
  
  .planner-input-container > *:not(:last-child) {
    margin-bottom: 15px;
  }
  
  .planner-card {
    background-color: #D5ED9F;
    box-shadow: none;
  }
  
  .historial-card {
    background-color: transparent;
    box-shadow: none;
  }
  
  .historial-button {
    text-align: center;
    color: #000;
    font-weight: 600;
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .balance-layout {
    height: 100%;
    align-items: center;
  }
  
  /* Estilo para el scroll de las pills */
  .scrollable-pills {
    max-height: 287px;
    overflow-y: auto;
  }
  
  /* Estilo del CVU */
  .cvu-info {
    text-align: center;
    font-size: 19px;
    margin-bottom: 20px;
  }
  </style>
  