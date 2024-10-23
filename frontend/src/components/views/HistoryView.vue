<template>
    <v-container>
      <v-row 
        align="center" 
        justify="space-between"
        class="top-row"
      >
        <v-col cols="auto">
          <v-btn
            class="custom-button"
            @click="goHome"
          >
            Volver al inicio
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <img
            src="../../assets/mangoLogo3.png"
            alt="Logo"
            class="app-logo"
          >
        </v-col>
      </v-row>
      
      <!-- Utilizando el componente ReusableCard -->
      <ReusableCard title="Historial">
        <v-row class="search-row">
          <v-col cols="12">
            <ReusableInput
              v-model="searchQuery"
              label="Buscar transacciones"
              prepend-inner-icon="mdi-magnify"
              clearable
              @input="filterTransactions"
            />
          </v-col>
        </v-row>
  
        <div
          v-for="(transaction, index) in filteredTransactions"
          :key="index"
        >
          <TransactionItem
            :logo-url="transaction.logoUrl"
            :name="transaction.name"
            :date="transaction.date"
            :amount="transaction.amount"
          />
        </div>
      </ReusableCard>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import TransactionItem from '../common/TransactionItem.vue';
  import ReusableCard from '../common/ReusableCard.vue';
  import mangoLogo from '@/assets/mangoLogo.png';
  
  const router = useRouter();
  
  // Función para redirigir al inicio
  const goHome = () => {
    router.push('/home'); // Cambia la ruta según sea necesario
  };
  
  // Datos reactivos
  const searchQuery = ref('');
  const transactions = ref([
    {
      logoUrl: "https://www.shutterstock.com/image-vector/c-icon-vector-logo-sign-600nw-2242697067.jpg",
      name: "Carrefour",
      date: "2024-10-03 14:35",
      amount: -50.75,
    },
    {
      logoUrl: "https://brandemia.org/contenido/subidas/2022/10/marca-mcdonalds-logo.png",
      name: "McDonalds",
      date: "2024-10-01 09:00",
      amount: -1500.00,
    },
    {
      logoUrl: "https://blog.saleslayer.com/hubfs/mercado-libre-logo.jpg",
      name: "Mercado Libre",
      date: "2024-09-30 12:45",
      amount: 200.00,
    },
    {
      logoUrl: "https://media.informabtl.com/wp-content/uploads/2016/02/Logo-Starbucks--768x740.jpg",
      name: "Starbucks",
      date: "2024-10-02 10:30",
      amount: -15.50,
    },
    {
      logoUrl: "https://abellagraphicdesign.com/wp-content/uploads/2023/02/DESTACADA_0014_Fondo-copia-6.jpg",
      name: "Amazon",
      date: "2024-09-29 16:00",
      amount: -75.00,
    },
  ]);
  
  const filteredTransactions = ref([]);
  
  // Método para filtrar transacciones
  const filterTransactions = () => {
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase(); // warning?
      filteredTransactions.value = transactions.value.filter(transaction =>
        transaction.name.toLowerCase().includes(query) || 
        transaction.date.includes(query)
      );
    } else {
      filteredTransactions.value = transactions.value;
    }
  };
  
  // Al montar el componente, inicializa las transacciones filtradas
  onMounted(() => {
    filteredTransactions.value = transactions.value;
  });
  </script>
  
  <style scoped>
  
  .app-logo {
    width: 150px; /* Ajusta el tamaño según sea necesario */
    height: 150px; /* Ajusta el tamaño según sea necesario */
  }
  
  .top-row {
    margin-bottom: 20px; /* Espacio entre el encabezado y el contenido */
  }
  
  .custom-button {
    border-radius: 55px;
    background-color: #3D3C37;
    color: white;
    text-align: left;
    width: 300px; /* Ajusta el tamaño según sea necesario */
    height: 50px;
    text-transform: none; 
    font-size: 20px;
  }
  
  .search-row {
    margin-bottom: 15px; /* Espacio entre el campo de búsqueda y las transacciones */
  }
  </style>
  