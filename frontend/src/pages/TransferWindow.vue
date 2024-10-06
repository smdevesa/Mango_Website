<template>
  <v-container>
    <!-- Fila superior con botón de volver y logo -->
    <v-row align="center" justify="space-between" class="top-row">
      <v-col cols="auto">
        <v-btn class="custom-button" @click="goHome">
          Volver al inicio
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <img :src="require('@/assets/logo.png')" alt="Logo" class="app-logo" />
      </v-col>
    </v-row>

    <!-- ReusableCard para transferir -->
    <ReusableCard title="Transferir Fondos">
      <v-row>
        <v-col cols="6">
          <!-- Botón para contactos Mango -->
          <v-btn class="transfer-button" @click="goToContacts">
            <div class="transfer-content">
              <v-icon class="transfer-icon" size="56px">mdi-account-multiple</v-icon>
              <div class="transfer-text">Contactos Mango</div>
            </div>
          </v-btn>
        </v-col>
        <v-col cols="6">
          <!-- Botón para CBU, CVU o Alias -->
          <v-btn class="transfer-button" @click="goToBankDetails">
            <div class="transfer-content">
              <v-icon class="transfer-icon" size="56px">mdi-bank</v-icon>
              <div class="transfer-text">CBU, CVU o Alias</div>
            </div>
          </v-btn>
        </v-col>
      </v-row>
    </ReusableCard>

    <!-- ReusableCard para buscar contactos frecuentes -->
    <ReusableCard title="Buscar Contactos Frecuentes">
      <v-form>
        <v-text-field 
          v-model="searchQuery"
          prepend-inner-icon="mdi-magnify" 
          label="Buscar contactos frecuentes"
          @input="filterContacts"
          clearable
        ></v-text-field>
      </v-form>
      <!-- Lista de contactos frecuentes -->
      <v-list class="transparent-background">
        <UserItem
          v-for="(contact, index) in filteredContacts"
          :key="index"
          :firstName="contact.firstName"
          :lastName="contact.lastName"
        />
      </v-list>
    </ReusableCard>
  </v-container>
</template>

<script>
import ReusableCard from '../components/common/ReusableCard.vue';
import UserItem from '../components/common/UserItem.vue'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'vue-router';

export default {
  components: {
    ReusableCard,
    UserItem, // Agregamos el componente UserItem
  },
  setup() {
    const router = useRouter();

    const goHome = () => {
      router.push('/'); // Cambia esta ruta según sea necesario
    };

    const goToContacts = () => {
      // Navegar a la vista de contactos Mango
      console.log("Ir a Contactos Mango");
    };

    const goToBankDetails = () => {
      // Navegar a la vista de ingresar CBU, CVU o Alias
      console.log("Ir a CBU, CVU o Alias");
    };

    return {
      goHome,
      goToContacts,
      goToBankDetails,
    };
  },
  data() {
    return {
      searchQuery: '',
      contacts: [
        { firstName: 'Juan', lastName: 'Pérez' },
        { firstName: 'María', lastName: 'García' },
        { firstName: 'Carlos', lastName: 'Fernández' },
        { firstName: 'Laura', lastName: 'Martínez' },
        { firstName: 'Ana', lastName: 'López' },
      ],
      filteredContacts: [], // Almacena los contactos filtrados
    };
  },
  methods: {
    filterContacts() {
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        this.filteredContacts = this.contacts.filter(contact =>
          contact.firstName.toLowerCase().includes(query) ||
          contact.lastName.toLowerCase().includes(query)
        );
      } else {
        this.filteredContacts = this.contacts; // Si no hay búsqueda, muestra todos los contactos
      }
    },
  },
  mounted() {
    // Inicializa los contactos filtrados al cargar el componente
    this.filteredContacts = this.contacts;
  },
};
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
  width: 75px;
  height: 75px;
}

.top-row {
  margin-bottom: 20px;
}
</style>
