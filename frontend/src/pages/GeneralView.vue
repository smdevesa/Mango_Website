<template>
  <v-container>
    <WelcomeBanner username="Robert Bin Udin" />

    <ReusableCard>
            <CircularBalance
        :balance="'$1,234.56'"
        :sections="[
          { label: 'Ahorros', percentage: 40, color: 'rgba(255, 99, 132, 1)' },  // Color sólido
          { label: 'Gastos', percentage: 30, color: 'rgba(54, 162, 235, 1)' },  // Color sólido
          { label: 'Inversiones', percentage: 30, color: 'rgba(75, 192, 192, 1)' } // Color sólido
        ]"
      />
    </ReusableCard>

    <v-row>
      <v-col cols="6">
        <ReusableCard title="Planificador de Gastos">
          <v-card>
            <v-card-subtitle>Aquí puedes planificar tus gastos</v-card-subtitle>
            <!-- Contenido de la tarjeta Planificador de Gastos -->
          </v-card>
        </ReusableCard>
      </v-col>
      <v-col cols="6">
        <ReusableCard title="Historial">
          <v-card>
            <v-card-subtitle>Aquí se muestra el historial de gastos</v-card-subtitle>
            <!-- Contenido de la tarjeta Historial -->
          </v-card>
        </ReusableCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WelcomeBanner from '../components/common/WelcomeBanner.vue';
import ReusableCard from '../components/common/ReusableCard.vue';
import CircularBalance from '../components/wallet/CircularBalance.vue'; // Asegúrate de importar el componente

export default {
  name: 'GeneralView',
  components: {
    WelcomeBanner,
    ReusableCard,
    CircularBalance,
  },
};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
