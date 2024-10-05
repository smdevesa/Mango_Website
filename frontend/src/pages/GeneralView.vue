<template>
  <v-container>
    <WelcomeBanner />

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
              <ReusableIconButton icon="mdi-cash" text="Ahorros" />
            </v-col>
            <v-col cols="6">
              <ReusableIconButton icon="mdi-wallet" text="Gastos" />
            </v-col>
          </v-row>
          <v-row justify="center">
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
          <v-card class="planner-card">
            <v-card-subtitle>Aquí puedes planificar tus gastos</v-card-subtitle>
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
import PlannerInput from '../components/wallet/PlannerInput.vue';

export default {
  name: 'GeneralView',
  components: {
    WelcomeBanner,
    ReusableCard,
    CircularBalance,
    ReusableIconButton,
    PlannerInput,
  },
};
</script>

<style scoped>
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

.planner-card {
  background-color: #D5ED9F;
  box-shadow: none;
}

/* Aquí agregamos el margen entre cada PlannerInput */
.planner-input-container > *:not(:last-child) {
  margin-bottom: 15px; /* Ajusta el valor para mayor o menor espacio */
}
</style>
