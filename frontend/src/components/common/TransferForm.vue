<!-- TransferView.vue -->
<template>
    <v-container>
      <!-- Fila superior con botón de volver y logo -->
      <v-row align="center" justify="space-between" class="top-row">
        <v-col cols="auto">
          <v-btn class="custom-button" @click="goBack">
            Volver
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <img src="../../assets/mangoLogo3.png" alt="Logo" class="app-logo">
        </v-col>
      </v-row>
  
      <!-- Contenido específico de la transferencia -->
      <v-row justify="center" class="content-row">
        <v-col cols="7" class="text-center">
            <ReusableCard :title="title" >
                <ReusableInput
                    v-model="inputValue"
                    :label="inputLabel"
                    placeholder="Ingrese el dato"
                />
                <v-btn @click="">Continuar</v-btn>
            </ReusableCard>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, defineEmits, defineProps } from 'vue';
  import { useRouter } from 'vue-router';
import ReusableCard from './ReusableCard.vue';
import ReusableInput from './ReusableInput.vue';
  
  const router = useRouter();
  const emit = defineEmits(['transfer']);
  
  // Propiedades del componente
  const props = defineProps({
    title: String,
    inputLabel: String,
  });
  
  // Valor del input
  const inputValue = ref('');
  
  
  // Función para volver a la página anterior
  const goBack = () => {
    router.back();
  };
  </script>
  
  <style scoped>
  .custom-button {
    border-radius: 55px;
    background-color: #3D3C37;
    color: white;
    text-align: left;
    width: 300px; /* Ajusta el tamaño según sea necesario */
    height: 50px;
    text-transform: none; /* Asegúrate de que no haya transformación de texto */
    font-size: 20px;
  }
  .app-logo {
    width: 150px;
    height: 150px;
    margin-right: 10px;
  }
  </style>
  