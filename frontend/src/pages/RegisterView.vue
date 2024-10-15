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
        <v-form @submit.prevent="submitForm" class="text-center">
          <v-text-field
            v-model="username"
            label="Nombre de usuario"
            outlined
          />
          <v-text-field
            v-model="email"
            label="Correo electrónico"
            outlined
            type="email"
          />
          <v-text-field
            v-model="telephone"
            label="Teléfono"
            outlined
            type="tel"
          />
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña"
            outlined
          />
          <v-text-field
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            label="Confirmar contraseña"
            outlined
          />
          <div icon @click="togglePassword" class="eye">
            <v-icon>{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
          </div>

          <v-btn 
            type="submit"
            class="buttonRegister"
          >
            Registrarse
          </v-btn>
          <div class="login">
            <a href="/login">Iniciar sesión</a>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const email = ref('');
const telephone = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);

const submitForm = () => {
  console.log('Form submitted');
};

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
}

.v-text-field {
  width: 100%;
  max-width: 700px;
  margin-bottom: 2px;
}

.eye{
    position: absolute;
    right: 37%;
    top: 80%;
    margin-top: 30px;
    margin-bottom: 40px;
    background-color: transparent;
    border : transparent;
}

.buttonRegister {
  width: 100%;
  max-width: 700px;
  background-color: #FF9500;
  color: white;
  margin-top: 9px;
  margin-bottom: 10px;
  height : 40px;
}
.login{
  position: absolute;
  top: 93%;
  right: 37%;
}
</style>