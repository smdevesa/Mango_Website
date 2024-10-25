<template>
  <v-container>

    <!-- ReusableCard para transferir -->
    <ReusableCard title="Transferir Fondos">
      <v-row>
        <v-col cols="6">
          <!-- Botón para contactos Mango -->
          <v-btn 
            class="transfer-button" 
            @click="goToContacts"
          >
            <div class="transfer-content">
              <v-icon 
                class="transfer-icon" 
                size="56px"
              >
                mdi-account-multiple
              </v-icon>
              <div class="transfer-text">
                Contactos Mango
              </div>
            </div>
          </v-btn>
        </v-col>
        <v-col cols="6">
          <!-- Botón para CBU, CVU o Alias -->
          <v-btn 
            class="transfer-button" 
            @click="goToBankDetails"
          >
            <div class="transfer-content">
              <v-icon 
                class="transfer-icon"
                size="56px"
              >
                mdi-bank
              </v-icon>
              <div class="transfer-text">
                CBU, CVU o Alias
              </div>
            </div>
          </v-btn>
        </v-col>
      </v-row>
    </ReusableCard>

    <!-- ReusableCard para buscar contactos frecuentes -->
    <ReusableCard title="Buscar Contactos Frecuentes">
      <v-form>
        <ReusableInput 
          v-model="searchQuery"
          prepend-inner-icon="mdi-magnify" 
          label="Buscar contactos frecuentes"
          clearable
          @input="filterContacts"
        />
      </v-form>
      <!-- Lista de contactos frecuentes -->
      <v-list class="transparent-background">
        <UserItem
          v-for="(contact, index) in filteredContacts"
          :key="index"
          :first-name="contact.firstName"
          :last-name="contact.lastName"
        />
      </v-list>
    </ReusableCard>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ReusableCard from '../common/ReusableCard.vue';
import UserItem from '../common/UserItem.vue';
import mangoLogo from '@/assets/mangoLogo.png';
import ReusableInput from '../common/ReusableInput.vue';

const router = useRouter();

const searchQuery = ref('');
const contacts = ref([
  { firstName: 'Juan', lastName: 'Pérez' },
  { firstName: 'María', lastName: 'García' },
  { firstName: 'Carlos', lastName: 'Fernández' },
  { firstName: 'Laura', lastName: 'Martínez' },
  { firstName: 'Ana', lastName: 'López' },
]);
const filteredContacts = ref([...contacts.value]); // Almacena los contactos filtrados

const goHome = () => {
  router.push('/home'); // Cambia esta ruta según sea necesario
};

const goToContacts = () => {
  // Navegar a la vista de contactos Mango
  router.push('/transfer/mango-contact');
};

const goToBankDetails = () => {
  // Navegar a la vista de ingresar CBU, CVU o Alias
  router.push('/transfer/new-account')
};

const filterContacts = () => {
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase(); // warning?
    filteredContacts.value = contacts.value.filter(contact =>
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query)
    );
  } else {
    filteredContacts.value = [...contacts.value]; // Si no hay búsqueda, muestra todos los contactos
  }
};

// Inicializa los contactos filtrados al cargar el componente
onMounted(() => {
  filteredContacts.value = [...contacts.value];
});
</script>

<style scoped>
.transparent-background {
  background-color: #D5ED9F; /* Asegúrate de que el fondo sea transparente */
}

.transfer-button {
  width: 100%;
  height: 150px;
  background-color: #F19743;
  color: #FFFBE6;
  text-transform: none;
  font-size: 16px;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.transfer-content {
  display: flex;
  flex-direction: column; /* Asegura que el icono esté arriba del texto */
  align-items: center;
}

.transfer-icon {
  font-size: 56px; /* Tamaño más grande para el icono */
  margin-bottom: 10px; /* Espacio entre el icono y el texto */
}

.transfer-text {
  font-size: 24px;
}

.custom-button {
  border-radius: 55px;
  background-color: #3D3C37;
  color: white;
  text-align: left;
  width: 300px; /* Ajusta el tamaño según sea necesario */
  height: 50px;
  text-transform: none; /* Asegúrate de que no haya transformación de texto */
  font-size: 20px;
}

.app-logo {
  width: 150px;
  height: 150px;
  margin-right: 10px;
}

.top-row {
  margin-bottom: 20px;
}
</style>
