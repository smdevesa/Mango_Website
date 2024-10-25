<template> 
  <div>
    <!-- Lista de píldoras existentes -->
    <div v-for="(pill, index) in balanceStore.users[userStore.currentUser.username].sections.slice(1)" :key="index">
      <PlannerInput
        :name="pill.label"
        :value="pill.value.toFixed(2)"
        :icon-color="pill.color"
        :percentage="pill.percentage.toFixed(1)"
        @remove="removePill(index + 1)" 
      />
    </div>

    <!-- Botón para agregar nueva píldora -->
    <PillButton
      name="Agregar"
      icon="mdi-pencil"
      icon-color="transparent"
      bg-color="#FFFBE6"
      @click="openInputDialog"
      class="add-pill-button"
    />

    <!-- Dialogo emergente -->
    <v-dialog
      v-model="showDialog"
      max-width="600px"
      max-height="400px"
    >
      <v-card>
        <v-card-title class="headline">Agregar nueva categoría</v-card-title>
        <v-card-text class="custom-input">
          <ReusableInput
            v-model="newPillName"
            label="Nombre" 
            placeholder="Ingrese el nombre de una categoría." 
            :rules="[rules.required]" 
          />
          <ReusableInput
            v-model.number="newPillValue"
            label="Monto"
            placeholder="Ingrese el monto destinado para dicha categoría."
            type="number" 
            :rules="[rules.required, rules.nonNegative, rules.notExceedingBalance]"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="cancelNewPill">Cancelar</v-btn>
          <v-btn color="blue darken-1" @click="confirmNewPill">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBalanceStore } from '@/store/balanceStore';
import { useUserStore } from '@/store/userStore'; // Importa el store de usuario
import PlannerInput from './PlannerInput.vue';
import PillButton from './PillButton.vue';
import ReusableInput from './ReusableInput.vue';

const balanceStore = useBalanceStore();
const userStore = useUserStore(); // Obtén el store de usuario

// Control de dialogo
const showDialog = ref(false);
const newPillName = ref('');
const newPillValue = ref(null);

// Reglas de validación
const rules = {
  required: (v) => !!v || 'Este campo es requerido',
  nonNegative: (v) => (v !== null && !isNaN(v) && v > 0) || 'El monto debe ser mayor a $0',
  notExceedingBalance: (v) => (v !== null && v <= balanceStore.availableBalance(userStore.currentUser.username)) || `El monto no puede exceder el disponible ($${balanceStore.availableBalance(userStore.currentUser.username).toFixed(2)})`
};

// Función para abrir el dialogo de entrada
const openInputDialog = () => {
  showDialog.value = true;
};

// Confirmar nueva píldora
const confirmNewPill = () => {
  const isNameValid = rules.required(newPillName.value) === true;
  const isValueValid = rules.nonNegative(newPillValue.value) === true && rules.notExceedingBalance(newPillValue.value) === true;

  if (isNameValid && isValueValid) {
    balanceStore.addSection(userStore.currentUser.username, { // Asegúrate de pasar el username
      label: newPillName.value,
      value: parseFloat(newPillValue.value),
      color: getRandomColor(),
    });
    resetForm();
  }
};

// Cancelar el ingreso de una nueva píldora
const cancelNewPill = () => {
  resetForm();
};

// Resetea los valores del formulario y cierra el dialogo
const resetForm = () => {
  newPillName.value = '';
  newPillValue.value = null;
  showDialog.value = false;
};

// Obtener color aleatorio para la nueva píldora
const getRandomColor = () => {
  let randomColor;
  do {
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = `#${randomColor.padStart(6, '0')}`;
  } while (randomColor === '#FFFFFF');
  return randomColor;
};

// Elimina una píldora
const removePill = (index) => {
  balanceStore.removeSection(userStore.currentUser.username, index); // Asegúrate de que esta función esté bien implementada en tu store
};
</script>

<style scoped>
.add-pill-button {
  height: 56.8px;
  cursor: pointer;
}
</style>
