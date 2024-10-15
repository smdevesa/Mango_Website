<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        
        <div class="logo">
          <img
            :src="require('@/assets/logo.png')"
            alt="Mango$ Logo"
          >
        </div>
        <v-form @submit.prevent="submitLoginForm" class="text-center">
          <v-text-field
            v-model="username"
            label="Nombre de usuario"
            outlined
            :rules="[rules.required]"
            class="custom-input"
            prepend-inner-icon="mdi-account"
          />
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña"
            outlined
            class="custom-input"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="togglePassword"
          />

          <!-- Contenedor del botón y enlace -->
          <div class="actions">
            <v-btn type="submit" class="buttonLogin">
              Iniciar sesión
            </v-btn>
            <div class="register">
              <a href="/register">Registrarse</a>
            </div>
          </div>

        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const showPassword = ref(false);

//REGEX PARA VALIDACION DE CAMPOS 
const rules = {
  required: (value) => !!value || 'Campo requerido',
};

//FUNCION DE ENVIO DE LOGIN Y VALIDACION DE COMPLETITUD DE CAMPOS
const submitLoginForm = () => {
  
  if (username.value && password.value) {
    router.push('/home'); // Redirigir al usuario a la página de inicio (o la ruta correspondiente)
  } else {
    alert('Por favor, llene todos los campos');
  }
};

//FUNCION PARA TOGGLE DE CONTRASEÑA
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo img {
  width: 200px;
  height: 200px;
}

.v-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
}

.v-text-field {
  width: 100%;
  max-width: 700px;
}

/* Estilos de borde */
.custom-input >>> .v-input__control {
  border: 1px solid black;
  border-radius: 20px;
  padding: 0;
  overflow: hidden;
}

/* Eliminar el subrayado */
.custom-input >>> .v-input__control::after {
  content: none;
}

/* Eliminar borde inferior interno */
.custom-input >>> .v-input__control .v-input__outline {
  border-bottom: none;
}

/* Eliminar sombra interna que sobresale */
.custom-input >>> .v-input__control .v-input__outline {
  box-shadow: none;
}

.custom-input >>> .v-input__control .v-input__slot {
  padding-bottom: 0 !important;
}

.actions {
  display: flex;
  flex-direction: column; /* Colocar los elementos en columnas */
  align-items: flex-end; /* Alinear el enlace a la derecha */
  width: 100%;
  margin-top: 9px;
  position: relative;
}

.buttonLogin {
  background-color: #FF9500;
  color: white;
  width: 100%; /* El botón ocupa todo el ancho */
  max-width: 700px;
  height: 50px;
  border-radius: 20px;
  margin-bottom: 5px;
}

.register a {
  color: #000;
  text-decoration: underline;
  font-size: 0.9rem;
}
</style>
