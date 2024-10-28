<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <div class="logo">
          <img :src="mangoLogo" alt="Mango$ Logo">
        </div>
        <v-form @submit.prevent="submitForm" class="text-center">
          <ReusableInput
            v-model="username"
            label="Nombre de usuario"
            outlined
            :rules="[rules.required]"
            class="custom-input"
            prepend-inner-icon="mdi-account"
          />
          <ReusableInput
            v-model="email"
            label="Correo electrónico"
            outlined
            :rules="[rules.required, rules.email]"
            type="email"
            class="custom-input"
            prepend-inner-icon="mdi-email"
          />
          <ReusableInput
            v-model="telephone"
            label="Teléfono"
            outlined
            :rules="[rules.required, rules.telephone]"
            type="tel"
            class="custom-input"
            prepend-inner-icon="mdi-phone"
          />
          <ReusableInput
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
          <ReusableInput
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
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore'; 
import { useBalanceStore } from '@/store/balanceStore';
import mangoLogo from '@/assets/mangoLogo.png';
import { useRouter } from 'vue-router';
import ReusableInput from '../common/ReusableInput.vue';

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


const submitForm = () => {
  store.logout(); 
  if (username.value && email.value && telephone.value && password.value && confirmPassword.value) {
    store.register(username.value, password.value, email.value);

    if (!store.error) {
      balanceStore.initUserBalance(username.value); 
      snackbarMessage.value = 'Registrado con éxito';
      snackbarColor.value = 'success';
      snackbar.value = true;
      setTimeout(() => {
        router.push('/login'); 
      }, 1500);
    }
  }
};


const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');
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

.actions {
  display: flex;
  flex-direction: column; 
  align-items: flex-end; 
  width: 100%;
  margin-top: 9px;
  position: relative;
}

.buttonRegister {
  background-color: #FF9500;
  color: #333;
  width: 100%; 
  max-width: 700px;
  height: 50px;
  border-radius: 20px;
  margin-bottom: 5px;
  font-size: 18px;
  text-transform: none;
}

.login a {
  color: #000;
  text-decoration: underline;
  font-size: 15px;
}

.error-message {
  color: red; 
  margin-bottom: 10px; 
  font-size: 14px; 
}
</style>
