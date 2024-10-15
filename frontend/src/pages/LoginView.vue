<template>
  <div class="login-page">
    <div class="logo">
      <img
        :src="require('@/assets/logo.png')"
        alt="Mango$ Logo"
      />
    </div>

    <v-form class="login-form" v-model="valid" lazy-validation>
      <!-- Campo de usuario con ícono dentro -->
      <v-text-field class="input-group"
        v-model="user.username"
        label="Usuario"
        :rules="[rules.required]"
        prepend-inner-icon="mdi-account"
        dense
        outlined
        required
        hide-details="auto"
      />

      <!-- Campo de contraseña con ícono dentro -->
      <v-text-field class="input-group"
        v-model="user.password"
        :type="passwordVisible ? 'text' : 'password'"
        label="Contraseña"
        :rules="[rules.required, rules.password]"
        prepend-inner-icon="mdi-lock"
        append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="togglePasswordVisibility"
        dense
        outlined
        required
        hide-details="auto"
      />

      <!-- Botón de iniciar sesión -->
      <v-btn class="login-button"
        :disabled="!valid"
        block        
        @click.prevent="login"
      >
        Iniciar sesión
      </v-btn>

      <!-- Texto de registrarse -->
      <p class="register-text">
        <a href="/register">Registrarse</a>
      </p>
    </v-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import '@mdi/font/css/materialdesignicons.min.css'

// Estado del usuario
const user = reactive({
  username: '',
  password: ''
})

// Controlar visibilidad de la contraseña
const passwordVisible = ref(false)
const valid = ref(false)

const rules = {
  required: v => !!v || 'Este campo es requerido',
  password: v => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres'
}

// Alternar visibilidad de la contraseña
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

// Lógica de login
const login = () => {
  if (valid.value) {
    console.log('Iniciando sesión con:', user)
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fff7e6;
}

.logo img {
  width: 150px;
  height: 150px;
}

.login-form {
  width: 400px;
}
.input-group {
  position: relative; /* Para posicionar el ícono dentro del input */
  margin: 10px 0;
}

.input-group i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: #888; /* Color gris */
}

.input-group input {
  padding: 15px 15px 15px 45px; /* Espacio para el ícono */
  width: 100%;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 16px;
}

.eye-icon-container {
  display: flex;
  justify-content: flex-end;
  margin-top: -10px;
  margin-bottom: 20px;
}

.login-button {
  background-color: #ff8c00;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 22px;
  margin-top: 0px;
}

.login-button:hover {
  background-color: #ff7300;
}


.register-text {
  text-align: center;
  margin-top: 10px;
  text-decoration: underline;
}

.register-text a {
  color: black;
  text-decoration: none;
}
</style>
