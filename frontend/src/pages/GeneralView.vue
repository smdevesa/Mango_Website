<template>
  <v-container>
    <WelcomeBanner />

    <ReusableCard title="Balance">
      <v-row rows>
        <!-- Columna para el gráfico circular -->
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

        <!-- Columna para los botones 2x2 -->
        <v-col cols="7">
          <v-row>
            <!-- Primera fila de botones -->
            <v-col cols="6">
              <ReusableIconButton icon="mdi-cash" text="Ahorros" />
            </v-col>
            <v-col cols="6">
              <ReusableIconButton icon="mdi-wallet" text="Gastos" />
            </v-col>
          </v-row>
          <v-row>
            <!-- Segunda fila de botones -->
            <v-col cols="6">
              <ReusableIconButton icon="mdi-chart-line" text="Inversiones" />
            </v-col>
            <v-col cols="6">
              <ReusableIconButton icon="mdi-account" text="Cuentas" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </ReusableCard>

    <v-row>
      <v-col cols="6">
        <ReusableCard title="Planificador de Gastos">
          <v-card>
            <v-card-subtitle>Aquí puedes planificar tus gastos</v-card-subtitle>
          </v-card>
        </ReusableCard>
      </v-col>
      <v-col cols="6">
        <ReusableCard title="Historial">
          <v-card>
            <v-card-subtitle>Aquí se muestra el historial de gastos</v-card-subtitle>
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

export default {
  name: 'GeneralView',
  components: {
    WelcomeBanner,
    ReusableCard,
    CircularBalance,
    ReusableIconButton
  },
};
</script>

<style scoped>
/* Ajustes adicionales en caso de ser necesario */
</style>
