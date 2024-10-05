<template>
  <v-container>
    <!-- Contenedor para el logo en la esquina superior derecha -->
    
    <v-row align="center" justify="space-between">
      <!-- Welcome Banner -->
      <v-col cols="auto">
        <WelcomeBanner />
      </v-col>

      <!-- Logo -->
      <v-col cols="auto">
        <img :src="require('@/assets/logo.png')" alt="Logo" class="app-logo" />
      </v-col>
    </v-row>

    <ReusableCard title="Balance">
      <v-row style="height: 100%; align-items: center;">
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
              <ReusableIconButton icon="mdi-bank-transfer" text=" Transferir" @click ="TransferWindow" />
            </v-col>
            <v-col cols="6">
              <ReusableIconButton icon="mdi-cash-plus" text="Ingresar" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="6">
              <ReusableIconButton icon="mdi-cash-minus" text="Retirar" />
            </v-col>
            <v-col cols="6">
              <ReusableIconButton icon="mdi-credit-card-plus" text="Añadir tarjeta" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </ReusableCard>

    <v-row>
      <v-col cols="6">
        <ReusableCard title="Planificador de Gastos">
          <v-card class="planner-card">
            <v-card-text class="planner-input-container">
              <PlannerInput name="Alquiler" value="$800" iconColor="blue" />
              <PlannerInput name="Comida" value="$250" iconColor="green" />
              <PlannerInput name="Transporte" value="$150" iconColor="orange" />
              
            </v-card-text>
          </v-card>
        </ReusableCard>
      </v-col>

      <v-col cols="6">
        <ReusableCard title="Historial">
          <v-card class="historial-card">
            <v-card-subtitle>Aquí se muestra el historial de gastos</v-card-subtitle>
            <v-card-text>
              <TransactionItem
                logoUrl="https://www.shutterstock.com/image-vector/c-icon-vector-logo-sign-600nw-2242697067.jpg"
                name="Carrefour"
                date="2024-10-03 14:35"
                :amount="-50.75"
              />
              <TransactionItem
                logoUrl="https://brandemia.org/contenido/subidas/2022/10/marca-mcdonalds-logo.png"
                name="McDonalds"
                date="2024-10-01 09:00"
                :amount="-1500.00"
              />
              <TransactionItem
                logoUrl="https://blog.saleslayer.com/hubfs/mercado-libre-logo.jpg"
                name="Mercado Libre"
                date="2024-09-30 12:45"
                :amount="200.00"
              />
            </v-card-text>
          </v-card>
        </ReusableCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WelcomeBanner from '../components/common/WelcomeBanner.vue';
import ReusableCard from '../components/common/ReusableCard.vue';
import CircularBalance from '../components/wallet/CircularBalance.vue';
import ReusableIconButton from '../components/common/ReusableIconButton.vue';
import PlannerInput from '../components/wallet/PlannerInput.vue';
import TransactionItem from '../components/wallet/TransactionItem.vue'; // Importar el componente
import PillManager from '../components/wallet/PillManager.vue';

export default {
  name: 'GeneralView',
  components: {
    WelcomeBanner,
    ReusableCard,
    CircularBalance,
    ReusableIconButton,
    PlannerInput,
    TransactionItem, // Registrar el componente
    PillManager,
  },
  methods: {
    openTransferWindow() {
      // Abrimos la ruta /transfer en una nueva ventana o pestaña
      const routePath = this.$router.resolve({ path: '/transfer' }).href;
      window.open(routePath, '_blank');
    }
  }
};


</script>

<style scoped>

.app-logo {
  width: 75px;
  height: 75px;
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

/* Agregamos un margen entre el v-card-subtitle y el primer PlannerInput */
.planner-input-container > *:first-child {
  margin-top: 10px; /* Ajusta el valor según lo que necesites */
}

.planner-input-container > *:not(:last-child) {
  margin-bottom: 15px; /* Espacio entre PlannerInput */
}

.planner-card {
  background-color: #D5ED9F;
  box-shadow: none;
}

/* Estilos para el historial para quitar fondo y sombra */
.historial-card {
  background-color: transparent;
  box-shadow: none;
}
</style>

