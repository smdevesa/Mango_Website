<template>
  <div>
    <!-- Renderizamos las píldoras actuales -->
    <div v-for="(pill, index) in pills" :key="index">
      <PlannerInput
        :name="pill.name"
        :value="pill.value"
        :iconColor="pill.iconColor" 
      />
    </div>

    <!-- Píldora de agregar -->
    <PillButton
      name="Agregar"
      icon="mdi-pencil"
      @click="openInputDialog"
      iconColor="orange"
      bgColor="#FFFBE6"
    />

    <!-- Formulario de entrada solo se muestra cuando showInput es true -->
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
        :rules="[rules.nonNegative]"
      />

      <!-- Contenedor flexible para los botones -->
      <div style="display: flex; justify-content: space-between; margin-top: 10px;">
        <v-btn color="secondary" @click="cancelNewPill">Cancelar</v-btn>
        <v-btn color="primary" @click="confirmNewPill">Confirmar</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PlannerInput from './PlannerInput.vue'; // Asegúrate de que la ruta sea correcta
import PillButton from './PillButton.vue'; // Componente para la nueva píldora

const pills = ref([]); // Arreglo de píldoras
const showInput = ref(false); // Controla si se muestra el formulario
const newPillName = ref(''); // Nombre de la nueva píldora
const newPillValue = ref(''); // Valor de la nueva píldora

const rules = {
  required: (v) => !!v || 'Este campo es requerido',
  nonNegative: (v) => v > 0 || 'El monto debe ser mayor a $0',
};

const openInputDialog = () => {
  // Mostrar el formulario al hacer clic en "Agregar"
  showInput.value = true;
};

const confirmNewPill = () => {
  // Verificar las reglas antes de confirmar
  const isNameValid = rules.required(newPillName.value);
  const isValueValid = rules.nonNegative(newPillValue.value);

  if (isNameValid === true && isValueValid === true) {
    pills.value.push({
      name: newPillName.value,
      value: newPillValue.value,
      iconColor: getRandomColor(), // Genera un color aleatorio al agregar
    });
    resetForm(); // Limpiar el formulario y ocultarlo
  }
};

const cancelNewPill = () => {
  // Cancela la entrada y oculta el formulario
  resetForm();
};

const resetForm = () => {
  // Restablece el formulario y lo oculta
  newPillName.value = '';
  newPillValue.value = '';
  showInput.value = false;
};

const getRandomColor = () => {
  let randomColor;

  do {
    // Genera un color hexadecimal aleatorio
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = `#${randomColor.padStart(6, '0')}`; // Asegura que tenga 6 caracteres
  } while (randomColor === '#FFFFFF'); // Repite si es blanco

  return randomColor;
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
