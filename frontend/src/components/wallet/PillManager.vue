<template>
    <div>
      <!-- Renderizamos las píldoras actuales -->
      <div v-for="(pill, index) in pills" :key="index">
        <PlannerInput :name="pill.name" :value="pill.value" iconColor="blue" />
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
        <v-text-field v-model="newPillName" label="Nombre" placeholder="Nombre" />
        <v-text-field v-model.number="newPillValue" label="Monto" placeholder="Monto" type="number"/>
        
        <!-- Botones de confirmar y cancelar -->
        <v-btn color="primary" @click="confirmNewPill">Confirmar</v-btn>
        <v-btn color="secondary" @click="cancelNewPill">Cancelar</v-btn>
      </div>
    </div>
  </template>
  
  <script>
  import PlannerInput from './PlannerInput.vue'; // Asegúrate de que la ruta sea correcta
  import PillButton from './PillButton.vue'; // Componente para la nueva píldora
  
  export default {
    components: {
      PlannerInput,
      PillButton
    },
    data() {
      return {
        pills: [], // Arreglo de píldoras
        showInput: false, // Controla si se muestra el formulario
        newPillName: '', // Nombre de la nueva píldora
        newPillValue: '', // Valor de la nueva píldora
      };
    },
    methods: {
      openInputDialog() {
        // Mostrar el formulario al hacer clic en "Agregar"
        this.showInput = true;
      },
      confirmNewPill() {
        // Confirma la nueva píldora si los campos están completos
        if (this.newPillName && this.newPillValue) {
          this.pills.push({
            name: this.newPillName,
            value: this.newPillValue,
          });
          this.resetForm(); // Limpiar el formulario y ocultarlo
        }
      },
      cancelNewPill() {
        // Cancela la entrada y oculta el formulario
        this.resetForm();
      },
      resetForm() {
        // Restablece el formulario y lo oculta
        this.newPillName = '';
        this.newPillValue = '';
        this.showInput = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados aquí */
  </style>
  