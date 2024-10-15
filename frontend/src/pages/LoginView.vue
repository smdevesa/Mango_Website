<template>
  <v-container
      fluid
      class="d-flex justify-center align-center"
      style="background-color: #FFFBE6; height: 100vh;"
  >
    <v-card
        class="pa-5"
        width="400"
        style="background-color: transparent; box-shadow: none;"
    >
      <!-- Logo centrado -->
      <v-row class="d-flex justify-center mb-3">
        <v-img
            src="@/assets/logo.png"
            alt="logo"
            width="80"
        />
      </v-row>

      <!-- Formulario de registro -->
      <v-form>
        <v-text-field
            v-model="username"
            label="Usuario"
            variant="outlined"
            dense
            class="input-field"
            required
        />

        <v-text-field
            v-model="email"
            label="Email"
            variant="outlined"
            dense
            class="input-field"
            required
        />

        <v-text-field
            v-model="phone"
            label="Teléfono"
            variant="outlined"
            dense
            class="input-field"
            required
        />

        <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña"
            variant="outlined"
            dense
            class="input-field"
            required
        />

        <v-text-field
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            label="Repetir contraseña"
            variant="outlined"
            dense
            class="input-field"
            required
        />

        <!-- Ojo para mostrar/ocultar contraseña debajo y alineado a la derecha -->
        <v-row class="d-flex justify-end mb-2">
          <v-btn
              icon
              class="eye-button"
              @click="togglePasswordVisibility"
          >
            <v-icon>
              {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
            </v-icon>
          </v-btn>
        </v-row>

        <!-- Botón de registrarse más grande -->
        <v-btn
            class="mt-4"
            color="orange"
            style="color: white; width: 100%; height: 56px;"
            @click="register"
        >
          Registrarse
        </v-btn>

        <!-- Texto de iniciar sesión -->
        <v-row class="d-flex justify-center mt-3">
          <v-btn text>
            Iniciar sesión
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const register = () => {
  // Aquí iría la lógica de registro
  console.log('Registrarse', {
    username: username.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  })
}
</script>

<style scoped>
.v-text-field {
  margin-bottom: 6px; /* Reducir aún más espacio entre campos */
  border-radius: 20px;
}

.eye-button {
  padding: 0;
  min-width: 0;
}

.v-btn .v-icon {
  margin-right: 0;
}
</style>
