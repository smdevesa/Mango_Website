<template>
  <v-container>
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
    
    <!-- Utilizando el componente ReusableCard -->
    <ReusableCard title="Historial">
      <v-row class="search-row">
        <v-col cols="12">
          <v-text-field
            v-model="searchQuery"
            label= "Buscar transacciones"
            append-icon="mdi-magnify"
            @input="filterTransactions"
            clearable
          />
        </v-col>
      </v-row>

      <div v-for="(transaction, index) in filteredTransactions" :key="index">
        <TransactionItem
          :logoUrl="transaction.logoUrl"
          :name="transaction.name"
          :date="transaction.date"
          :amount="transaction.amount"
        />
      </div>
    </ReusableCard>
  </v-container>
</template>

<script>
import TransactionItem from '../components/wallet/TransactionItem.vue';
import ReusableCard from '../components/common/ReusableCard.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'HistoryView',
  components: {
    TransactionItem,
    ReusableCard,
  },
  setup() {
    const router = useRouter();

    const goHome = () => {
      router.push('/'); // Cambia esta ruta según sea necesario
    };

    return {
      goHome,
    };
  },
  data() {
    return {
      searchQuery: '',
      transactions: [
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
      ],
      filteredTransactions: [], // Almacena las transacciones filtradas
    };
  },
  methods: {
    filterTransactions() {
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        this.filteredTransactions = this.transactions.filter(transaction =>
          transaction.name.toLowerCase().includes(query) || 
          transaction.date.includes(query)
        );
      } else {
        this.filteredTransactions = this.transactions; // Si no hay búsqueda, muestra todas las transacciones
      }
    },
  },
  mounted() {
    // Inicializa las transacciones filtradas al cargar el componente
    this.filteredTransactions = this.transactions;
  },
};
</script>

<style scoped>
.transaction-card {
  margin-bottom: 15px;
}

.app-logo {
  width: 75px; /* Ajusta el tamaño según sea necesario */
  height: 75px; /* Ajusta el tamaño según sea necesario */
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
