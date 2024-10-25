<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <div class="logo">
          <img :src="mangoLogo" alt="Mango$ Logo">
        </div>
        <v-form @submit.prevent="submitForm" class="text-center">
          <v-text-field
            v-model="username"
            label="Nombre de usuario"
            outlined
            :rules="[rules.required]"
            class="custom-input"
            prepend-inner-icon="mdi-account"
          />
          <v-text-field
            v-model="email"
            label="Correo electrónico"
            outlined
            :rules="[rules.required, rules.email]"
            type="email"
            class="custom-input"
            prepend-inner-icon="mdi-email"
          />
          <v-text-field
            v-model="telephone"
            label="Teléfono"
            outlined
            :rules="[rules.required, rules.telephone]"
            type="tel"
            class="custom-input"
            prepend-inner-icon="mdi-phone"
          />
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña"
            outlined
            :rules="[rules.required, rules.passwordMatch]"
            class="custom-input"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="togglePassword"
          />
          <v-text-field
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            label="Confirmar contraseña"
            outlined
            :rules="[rules.required, rules.passwordMatch]"
            class="custom-input"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="toggleConfirmPassword"
          />
          
          <!-- Mostrar errores si existen -->
          <div v-if="store.error" class="error-message">{{ store.error }}</div>

          <div class="actions">
            <v-btn type="submit" class="buttonRegister">
              Registrarse
            </v-btn>
            <div class="login">
              <a href="/login">Iniciar sesión</a>
            </div>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore'; // Importa tu store de Pinia
import { useBalanceStore } from '@/store/balanceStore';
import mangoLogo from '@/assets/mangoLogo.png';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useUserStore();
const balanceStore = useBalanceStore();

const username = ref('');
const email = ref('');
const telephone = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Regla de validación de campos
const rules = {
  required: (value) => !!value || 'Campo requerido',
  email: (value) => {
    const valid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return valid.test(value) || 'Correo inválido';
  },
  telephone: (value) => {
    const valid = /^\d{10}$/;
    return valid.test(value) || 'Teléfono inválido';
  },
  passwordMatch: () => {
    return password.value === confirmPassword.value || 'Las contraseñas no coinciden';
  }
};

// Función de envío de registro
const submitForm = () => {
  store.logout(); // Cerrar sesión antes de registrar un nuevo usuario
  if (username.value && email.value && telephone.value && password.value && confirmPassword.value) {
    store.register(username.value, password.value, email.value);

    if (!store.error) {
      balanceStore.initUserBalance(username.value); // Crea un balance para el nuevo usuario
      router.push('/home'); // Redirige al usuario a la página de inicio
    }
  } else {
    alert('Por favor, llene todos los campos');
  }
};

// Funciones de visibilidad de contraseña
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
</script>

<style scoped>
.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 1px;
  margin-top: -70px;
}

.logo img {
  width: 400px;
  height: 400px;
}

.v-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -30px;
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

.buttonRegister {
  background-color: #FF9500;
  color: white;
  width: 100%; /* El botón ocupa todo el ancho */
  max-width: 700px;
  height: 50px;
  border-radius: 20px;
  margin-bottom: 5px;
  font-size: 18px;
}

.login a {
  color: #000;
  text-decoration: underline;
  font-size: 15px;
}

.error-message {
  color: red; /* Texto en rojo para el mensaje de error */
  margin-bottom: 10px; /* Espacio entre el mensaje de error y el botón */
  font-size: 14px; /* Tamaño de fuente del mensaje de error */
}
</style>
