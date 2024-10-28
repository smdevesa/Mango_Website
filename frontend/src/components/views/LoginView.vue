<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <div class="logo">
          <img :src="mangoLogo" alt="Mango$ Logo">
        </div>

        <v-form @submit.prevent="submitLoginForm" class="text-center">
          <ReusableInput
            v-model="username"
            label="Nombre de usuario"
            outlined
            :rules="[rules.required]"
            prepend-inner-icon="mdi-account"
          />

          <div class="clase-campo">
            <ReusableInput
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              label="Contraseña"
              outlined
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="togglePassword"
            />
            <div class="olvide-mi-contra">
              <a @click="dialog = true">Olvidé mi contraseña</a>
            </div>
          </div>

          <!-- Mostrar mensaje de error si hay uno -->
          <p v-if="userStore.error" class="error-message">{{ userStore.error }}</p>

          <div class="clase-boton">
            <v-btn type="submit" class="buttonLogin" :loading="userStore.loading">
              Iniciar sesión
            </v-btn>
            <div class="register">
              <a href="/register">Registrarse</a>
            </div>
          </div>
        </v-form>

        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title class="headline">Reestablecer Contraseña</v-card-title>
            <v-card-text>
              <p>¿Está seguro que quiere reestablecer la contraseña? Indique el correo de la cuenta que desea reestablecer.</p>
              <ReusableInput
                v-model="email"
                label="Correo Electrónico"
                outlined
                class="custom-input reestab-email-field"
                :rules="[rules.required, rules.email]"
                prepend-inner-icon="mdi-email"
              />
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="handleResetPassword">Continuar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Modificar el snackbar -->
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import mangoLogo from '@/assets/mangoLogo.png';

const username = ref('');
const password = ref('');
const email = ref('');
const showPassword = ref(false);
const dialog = ref(false);
const errorMessage = ref('');
const userStore = useUserStore();
const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');

// Validaciones
const rules = {
  required: (value) => !!value || 'Campo requerido',
  email: (value) => /.+@.+\..+/.test(value) || 'Correo inválido',
};

// Envío del formulario de login
const submitLoginForm = () => {
  userStore.logout();
  if (username.value && password.value) {
    userStore.login(username.value, password.value);

    if (userStore.isLoggedIn()) {
      router.push('/home');
    }
  } else {
    snackbarMessage.value = 'Por favor, complete todos los campos';
    snackbarColor.value = 'error';
    snackbar.value = true;
  }
};

// Función para alternar la visibilidad de la contraseña
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Función para manejar el envío de restablecimiento de contraseña
const handleResetPassword = () => {
  if (rules.required(email.value) === true && rules.email(email.value) === true) {
    snackbarMessage.value = `Correo enviado a ${email.value} para reestablecer la contraseña.`;
    snackbarColor.value = 'success';
    snackbar.value = true;
    dialog.value = false;
    errorMessage.value = '';
  } else {
    errorMessage.value = 'Por favor, ingrese un correo válido.';
  }
};
</script>

<style scoped>
.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 1px;
  margin-top: -230px;
}

.logo img {
  width: 400px;
  height: 400px;
}

.v-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -10px;
  margin-top: -30px;
}

.v-text-field {
  width: 100%;
  max-width: 700px;
}


.clase-boton {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  margin-top: 9px;
  position: relative;
}

.clase-campo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 4px;
  position: relative;
}

.olvide-mi-contra {
  margin-top: -18px;
  margin-left: 15px;
  font-size: 15px;
  cursor: pointer;
  text-decoration: underline;
  color:"red";
}

.reestab-email-field {
  margin-top: 15px;
}

.buttonLogin {
  background-color: #FF9500;
  color: white;
  width: 100%;
  max-width: 700px;
  height: 50px;
  border-radius: 20px;
  margin-bottom: 5px;
  font-size: 18px;
  margin-top: 10px;
  text-transform: none;
}

.register a {
  color: #000;
  text-decoration: underline;
  font-size: 15px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
