<template>
  <v-container>
    <ReusableCard title="Historial">
      <v-row class="search-row">
        <v-col cols="12" sm="6">
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
            v-model="filterCriteria"
            :items="filterOptions"
            item-title="text"
            item-value="value"
            label="Mostrar"
            @update:model-value="filterTransactions"
          ></v-select>
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
          logo-url="https://via.placeholder.com/50"
          :name="transaction.displayName"
          :date="formatDate(transaction.date)"  
          :amount="transaction.displayAmount"
        />
      </div>
    </ReusableCard>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import TransactionItem from '../common/TransactionItem.vue';
import ReusableCard from '../common/ReusableCard.vue';
import ReusableInput from '../common/ReusableInput.vue';
import { useUserStore } from '@/store/userStore';
import { useHistoryStore } from '@/store/historyStore';

// Instancia de los stores
const userStore = useUserStore();
const historyStore = useHistoryStore();

// Datos reactivos
const searchQuery = ref('');
const sortCriteria = ref('date');
const filterCriteria = ref('all');
const sortOptions = [
  { text: 'Más reciente', value: 'date' },
  { text: 'Alfabéticamente', value: 'name' }
];
const filterOptions = [
  { text: 'Todo', value: 'all' },
  { text: 'Ingresos', value: 'income' },
  { text: 'Egresos', value: 'expense' }
];

// Obtener las transacciones del usuario actual
const transactions = computed(() => 
  historyStore.getTransactionsByUser(userStore.currentUser.username)
);

// Método para filtrar transacciones
const filteredTransactions = computed(() => {
  let filtered = transactions.value;

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(transaction =>
      transaction.toUser.toLowerCase().includes(query) ||
      transaction.fromUser.toLowerCase().includes(query) ||
      transaction.date.includes(query)
    );
  }

  // Filtrar por ingresos o egresos
  if (filterCriteria.value === 'income') {
    filtered = filtered.filter(transaction => {
      const isReceiver = transaction.toUser === userStore.currentUser.username;
      return isReceiver; // Ingreso
    });
  } else if (filterCriteria.value === 'expense') {
    filtered = filtered.filter(transaction => {
      const isSender = transaction.fromUser === userStore.currentUser.username;
      return isSender; // Egreso
    });
  }

  return filtered;
});

// Computed para obtener las transacciones ordenadas y mostrar el nombre y monto correctos
const sortedTransactions = computed(() => {
  return [...filteredTransactions.value].map(transaction => {
    // Verificar si el usuario actual es el receptor o el remitente
    const isReceiver = transaction.toUser === userStore.currentUser.username;
    return {
      ...transaction,
      displayName: isReceiver ? transaction.fromUser : transaction.toUser,
      displayAmount: isReceiver ? transaction.amount : -transaction.amount
    };
  }).sort((a, b) => {
    if (sortCriteria.value === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortCriteria.value === 'name') {
      return a.displayName.localeCompare(b.displayName);
    }
  });
});

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace(',', ''); // Eliminar la coma
}

// Montar el componente y realizar la carga de transacciones
onMounted(() => {
  historyStore.loadTransactions();
});
</script>

<style scoped>
.search-row {
  margin-bottom: 15px;
}
</style>
