<template>
  <div>
    <div v-for="(pill, index) in balanceStore.sections.slice(1)" :key="index">
      <PlannerInput
        :name="pill.label"
        :value="pill.value.toFixed(2)"
        :icon-color="pill.color"
        :percentage="pill.percentage.toFixed(1)"
        @remove="removePill(index + 1)"
      />
    </div>

    <PillButton
      name="Agregar"
      icon="mdi-pencil"
      icon-color="orange"
      bg-color="#FFFBE6"
      @click="openInputDialog"
    />

    <div v-if="showInput">
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
        :rules="[rules.nonNegative, rules.notExceedingBalance]"
      />

      <div style="display: flex; justify-content: space-between; margin-top: 10px;">
        <v-btn color="secondary" @click="cancelNewPill">Cancelar</v-btn>
        <v-btn color="primary" @click="confirmNewPill">Confirmar</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBalanceStore } from '@/store/balanceStore';
import PlannerInput from './PlannerInput.vue';
import PillButton from './PillButton.vue';

const balanceStore = useBalanceStore();

const showInput = ref(false);
const newPillName = ref('');
const newPillValue = ref('');

const rules = {
  required: (v) => !!v || 'Este campo es requerido',
  nonNegative: (v) => v > 0 || 'El monto debe ser mayor a $0',
  notExceedingBalance: (v) => v <= balanceStore.availableBalance || `El monto no puede exceder el disponible ($${balanceStore.availableBalance.toFixed(2)})`
};

const openInputDialog = () => {
  showInput.value = true;
};

const confirmNewPill = () => {
  const isNameValid = rules.required(newPillName.value);
  const isValueValid = rules.nonNegative(newPillValue.value) && rules.notExceedingBalance(newPillValue.value);

  if (isNameValid === true && isValueValid === true) {
    balanceStore.addSection({
      label: newPillName.value,
      value: parseFloat(newPillValue.value),
      color: getRandomColor(),
    });
    resetForm();
  }
};

const cancelNewPill = () => {
  resetForm();
};

const resetForm = () => {
  newPillName.value = '';
  newPillValue.value = '';
  showInput.value = false;
};

const getRandomColor = () => {
  let randomColor;
  do {
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = `#${randomColor.padStart(6, '0')}`;
  } while (randomColor === '#FFFFFF');
  return randomColor;
};

const removePill = (index) => {
  balanceStore.removeSection(index);
};
</script>
  