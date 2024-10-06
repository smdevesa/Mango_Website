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
      <v-text-field v-model="newPillName" label="Nombre" placeholder="Ingrese el nombre de una categoría." />
      <v-text-field v-model.number="newPillValue" label="Monto" placeholder="Ingrese el monto destinado para dicha categoría." type="number"/>

      <!-- Contenedor flexible para los botones -->
      <div style="display: flex; justify-content: space-between; margin-top: 10px;">
        <v-btn color="secondary" @click="cancelNewPill">Cancelar</v-btn>
        <v-btn color="primary" @click="confirmNewPill">Confirmar</v-btn>
      </div>
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
          iconColor: this.getRandomColor(), // Genera un color aleatorio al agregar
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
    getRandomColor() {
      let randomColor;

      do {
      // Genera un color hexadecimal aleatorio
      randomColor = Math.floor(Math.random() * 16777215).toString(16);
      randomColor = `#${randomColor.padStart(6, '0')}`; // Asegura que tenga 6 caracteres
      } while (randomColor === '#FFFFFF'); // Repite si es blanco

      return randomColor;
    }
  },
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
