<template>
  <v-container>
    <ReusableCard title="Historial">
      <v-row class="search-row">
        <v-col cols="12" sm="9">
          <ReusableInput
            v-model="searchQuery"
            label="Buscar transacciones"
            prepend-inner-icon="mdi-magnify"
            clearable
            @input="filterTransactions"
          />
        </v-col>
        <v-col cols="12" sm="3">
          <v-select
            v-model="sortCriteria"
            :items="sortOptions"
            item-title="text"
            item-value="value"
            label="Ordenar por"
            @update:model-value="sortTransactions"
          ></v-select>
        </v-col>
      </v-row>

      <div
        v-for="(transaction, index) in sortedTransactions"
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
import { ref, computed } from 'vue';
import TransactionItem from '../common/TransactionItem.vue';
import ReusableCard from '../common/ReusableCard.vue';
import ReusableInput from '../common/ReusableInput.vue';

// Datos reactivos
const searchQuery = ref('');
const sortCriteria = ref('date');
const sortOptions = [
  { text: 'Más reciente', value: 'date' },
  { text: 'Alfabéticamente', value: 'name' }
];

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
    const query = searchQuery.value.toLowerCase();
    filteredTransactions.value = transactions.value.filter(transaction =>
      transaction.name.toLowerCase().includes(query) || 
      transaction.date.includes(query)
    );
  } else {
    filteredTransactions.value = transactions.value;
  }
};

// Método para ordenar transacciones
const sortTransactions = () => {
  filteredTransactions.value.sort((a, b) => {
    if (sortCriteria.value === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortCriteria.value === 'name') {
      return a.name.localeCompare(b.name);
    }
  });
};

// Computed property para obtener las transacciones ordenadas
const sortedTransactions = computed(() => {
  sortTransactions();
  return filteredTransactions.value;
});

// Al montar el componente, inicializa las transacciones filtradas y ordenadas
filterTransactions();
sortTransactions();
</script>

<style scoped>
.search-row {
  margin-bottom: 15px;
}

</style>