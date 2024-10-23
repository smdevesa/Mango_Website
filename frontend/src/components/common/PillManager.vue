<template> 
  <div>
    <!-- Lista de píldoras existentes -->
    <div v-for="(pill, index) in balanceStore.sections.slice(1)" :key="index">
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
          <v-text-field
            v-model="newPillName"
            label="Nombre" 
            placeholder="Ingrese el nombre de una categoría." 
            :rules="[rules.required]" 
          />
          <v-text-field
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
import PlannerInput from './PlannerInput.vue';
import PillButton from './PillButton.vue';

const balanceStore = useBalanceStore();

// Control de dialogo
const showDialog = ref(false);
const newPillName = ref('');
const newPillValue = ref(null);

// Reglas de validación
const rules = {
  required: (v) => !!v || 'Este campo es requerido',
  nonNegative: (v) => (v !== null && !isNaN(v) && v > 0) || 'El monto debe ser mayor a $0',
  notExceedingBalance: (v) => (v !== null && v <= balanceStore.availableBalance) || `El monto no puede exceder el disponible ($${balanceStore.availableBalance.toFixed(2)})`
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
    balanceStore.addSection({
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
  balanceStore.removeSection(index);
};
</script>

<style scoped>

.add-pill-button {
  height: 56.8px;
  cursor: pointer;
}


.custom-input :deep(.v-input__control) {
    border: 1px solid black;
    border-radius: 20px;
    padding: 0;
    overflow: hidden;
}
  
/* Eliminar el subrayado */
.custom-input :deep(.v-input__control::after) {
    content: none;
}
  
/* Eliminar borde inferior interno */
.custom-input :deep(.v-input__control .v-input__outline) {
    border-bottom: none;
}
  
/* Eliminar sombra interna que sobresale */
.custom-input :deep(.v-input__control .v-input__outline) {
    box-shadow: none;
}
  
.custom-input :deep(.v-input__control .v-input__slot) {
    padding-bottom: 0 !important;
}


</style>