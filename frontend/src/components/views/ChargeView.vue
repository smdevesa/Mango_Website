<template>
  <v-container>
    <ReusableCard title="Cobrar">
      <v-form @submit.prevent="generarEnlace">
        <ReusableInput
          v-model="monto"
          label="Monto a cobrar"
          type="number"
          prefix="$"
          required
        ></ReusableInput>
        <ReusableInput
          v-model="descripcion"
          label="Descripción del cobro"
          required
          style="height: 250px;"
        ></ReusableInput>
        <div class="button-container">
          <v-btn @click="generarEnlace">
            Generar enlace de pago
          </v-btn>
        </div>
      </v-form>
      
      <!-- Alerta modificada con botón de copiar -->
      <v-alert
        v-if="enlaceGenerado"
        type="success"
        class="mt-4"
      >
        <div class="d-flex align-center">
          <span class="mr-2">Enlace de pago generado:</span>
          <a :href="enlaceGenerado" target="_blank" class="mr-2">{{ enlaceGenerado }}</a>
          <v-icon
            size="16"
            color="white"
            class="ml-2 copy-icon"
            @click="copiarEnlace"
          
          >
            mdi-content-copy
          </v-icon>
        </div>
        <v-snackbar
          v-model="mostrarSnackbar"
          :timeout="2000"
          color="success"
        >
          Enlace copiado al portapapeles
        </v-snackbar>
      </v-alert>

      <v-alert
        v-if="mostrarAlertaMonto"
        type="error"
        class="mt-4"
      >
        Debe ingresar un monto para generar un enlace
      </v-alert>

      <!-- Agregar el snackbar -->
      <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        location="top"
      >
        {{ snackbarMessage }}
        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="snackbar = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
    </ReusableCard>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { usePayStore } from '@/store/payStore'; // Importa el store de pagos
import { useUserStore } from '@/store/userStore';

const domain = 'https://localhost:3000';
const monto = ref('');
const descripcion = ref('');
const enlaceGenerado = ref('');
const mostrarAlertaMonto = ref(false);
const mostrarSnackbar = ref(false);
const payStore = usePayStore(); // Inicializa el store de pagos
const userStore = useUserStore();
const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');

const generarEnlace = () => {
  if (!monto.value || parseFloat(monto.value) <= 0) {
    snackbarMessage.value = 'El monto debe ser mayor a 0';
    snackbarColor.value = 'error';
    snackbar.value = true;
    return;
  }

  mostrarAlertaMonto.value = false;

  // Genera un ID único para el enlace (esto es solo un ejemplo; reemplázalo con tu lógica)
  const linkId = `${Date.now()}`;
  const baseUrl = `http://` + domain.replace(/^https?:\/\//, '') + '/payment/';
  enlaceGenerado.value = `${baseUrl}${linkId}`;

  // Guarda el enlace en el store
  payStore.addLink(userStore.currentUser.username, linkId, parseFloat(monto.value), descripcion.value);
};

const copiarEnlace = async () => {
  try {
    await navigator.clipboard.writeText(enlaceGenerado.value);
    mostrarSnackbar.value = true;
  } catch (err) {
    console.error('Error al copiar el enlace:', err);
  }
};
</script>

<style scoped>
.button-container {
  display: flex; /* Cambiado a flexbox para centrar el botón */
  justify-content: center; /* Centrar el contenido horizontalmente */
}

.button-container .v-btn {
  color: #FFFBE6;
  background: #F19743;
  font-size: 19px;
  text-transform: none;
  margin-top: -4%;
}

/* Estilos para el enlace y el botón de copiar */
.d-flex {
  display: flex;
  align-items: center;
  word-break: break-all;
}

.mr-2 {
  margin-right: 8px;
}

.ml-2 {
  margin-left: 8px;
}

.copy-icon {
  opacity: 0.8;
  transition: opacity 0.2s;
}

.copy-icon:hover {
  opacity: 1;
}
</style>
