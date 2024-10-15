<template>
  <div class="register-page">
    <div class="logo">
      <img
        :src="require('@/assets/logo.png')"
        alt="Mango$ Logo"
      >
    </div>
    <form class="register-form">
      <!-- Campo de usuario con ícono dentro -->
      <div class="input-group">
        <i class="mdi mdi-account" />
        <input
          v-model="user.username"
          type="text"
          placeholder="Usuario"
/>
      </div>

      <!-- Campo de email con validación -->
      <div class="input-group">
        <i class="mdi mdi-email"></i>
        <input type="email" v-model="user.email" placeholder="Email" @blur="validateEmail" />
      </div>
      <p v-if="emailError" class="error-message">{{ emailError }}</p>

      <!-- Campo de teléfono con validación -->
      <div class="input-group">
        <i class="mdi mdi-phone"></i>
        <input type="tel" v-model="user.phone" placeholder="Teléfono" @blur="validatePhone" />
      </div>
      <p v-if="phoneError" class="error-message">{{ phoneError }}</p>

      <!-- Campo de contraseña con ícono dentro -->
      <div class="input-group">
        <i class="mdi mdi-lock"></i>
        <input
            :type="passwordVisible ? 'text' : 'password'"
            v-model="user.password"
            placeholder="Contraseña"
            @blur="validatePassword"
        />
      </div>

      <!-- Campo de repetir contraseña con ícono dentro -->
      <div class="input-group">
        <i class="mdi mdi-lock-check"></i>
        <input
            :type="passwordVisible ? 'text' : 'password'"
            v-model="user.confirmPassword"
            placeholder="Repetir contraseña"
            @blur="validatePassword"
        />
      </div>
      <p v-if="passwordError" class="error-message">{{ passwordError }}</p>

      <!-- Icono del ojo debajo de repetir contraseña -->
      <div class="eye-icon-container">
        <i class="mdi" :class="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'" @click="togglePasswordVisibility"></i>
      </div>

      <button type="submit" @click.prevent="register">Registrarse</button>

      <p class="login-text">
        <a href="/login">Iniciar sesión</a>
      </p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import '@mdi/font/css/materialdesignicons.min.css'

// Estado reactivo para almacenar los datos del usuario
const user = reactive({
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

// Estado para controlar la visibilidad de la contraseña
const passwordVisible = ref(false)

// Variables para almacenar errores de validación
const emailError = ref('')
const phoneError = ref('')
const passwordError = ref('')

// Función para alternar la visibilidad de la contraseña
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

// Validar el correo electrónico
const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  if (!emailPattern.test(user.email)) {
    emailError.value = 'El correo electrónico no es válido'
  } else {
    emailError.value = ''
  }
}

// Validar el número de teléfono (Ejemplo: 10 dígitos, solo números)
const validatePhone = () => {
  const phonePattern = /^[0-9]{10}$/
  if (!phonePattern.test(user.phone)) {
    phoneError.value = 'El número de teléfono debe contener 10 dígitos'
  } else {
    phoneError.value = ''
  }
}

// Validar que las contraseñas coincidan
const validatePassword = () => {
  if (user.password !== user.confirmPassword) {
    passwordError.value = 'Las contraseñas no coinciden'
  } else if (user.password.length < 8) {
    passwordError.value = 'La contraseña debe tener al menos 8 caracteres'
  } else {
    passwordError.value = ''
  }
}

// Lógica para el registro (lógica personalizada aquí)
const register = () => {
  validateEmail()
  validatePhone()
  validatePassword()

  if (!emailError.value && !phoneError.value && !passwordError.value) {
    console.log(user)
  } else {
    console.error('Por favor, corrige los errores antes de enviar.')
  }
}
</script>

<style scoped>
.register-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fff7e6;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.logo img {
  width: 200px;
  height: 200px;
}

.register-form {
  display: flex;
  flex-direction: column;
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

.mdi {
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.register-form button {
  background-color: #ff8c00;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 22px;
  margin-top: 0px;
}

.register-form button:hover {
  background-color: #ff7300;
}

.login-text {
  text-align: right;
  margin-top: 10px;
  text-decoration: underline;
}

.login-text a {
  color: black;
  text-decoration: none;
}

.error-message {
  color: red;
  font-size: 14px;
  margin: -10px 0 10px 0;
}
</style>
