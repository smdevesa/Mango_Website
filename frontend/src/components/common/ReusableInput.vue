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
  import { ref, watch } from 'vue';
  

  const props = defineProps({
    modelValue: String,
    rules: Array,
    label: String,
    appendIcon: String, 
  });
  
  
  const modelValue = ref(props.modelValue);
  
 
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
  

  .custom-input :deep(.v-input__control::after) {
    content: none;
  }
  
  
  .custom-input :deep(.v-input__control .v-input__outline) {
    border-bottom: none;
  }
  

  .custom-input :deep(.v-input__control .v-input__outline) {
    box-shadow: none;
  }
  
  .custom-input :deep(.v-input__control .v-input__slot) {
    padding-bottom: 0 !important;
  }
  </style>
  