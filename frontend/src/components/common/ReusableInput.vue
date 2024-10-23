<template>
    <v-text-field
      v-model="modelValue"
      :rules="rules"
      :label="label"
      class="custom-input"
      @input="$emit('update:modelValue', modelValue)"
      :append-icon="appendIcon" 
      clearable
    />
  </template>
  
  <script setup>
  import { defineProps, ref, watch } from 'vue';
  
  // Definimos las propiedades del componente
  const props = defineProps({
    modelValue: String,
    rules: Array,
    label: String,
    appendIcon: String, // Agregamos la propiedad para el icono
  });
  
  // Usamos ref para manejar el valor del input
  const modelValue = ref(props.modelValue);
  
  // Observamos cambios en modelValue para emitir el nuevo valor
  watch(() => props.modelValue, (newValue) => {
    modelValue.value = newValue;
  });
  </script>
  
  <style scoped>
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
  