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

      <div class="scrollable">
        <div v-if="sortedTransactions.length === 0"> 
          No hay transacciones recientes. 
        </div>
      <div v-else >  
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
    </div> 
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


const userStore = useUserStore();
const historyStore = useHistoryStore();


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


const transactions = computed(() => 
  historyStore.getTransactionsByUser(userStore.currentUser.username)
);

const filteredTransactions = computed(() => {
  let filtered = transactions.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(transaction =>
      transaction.toUser.toLowerCase().includes(query) ||
      transaction.fromUser.toLowerCase().includes(query) ||
      transaction.date.includes(query)
    );
  }

  if (filterCriteria.value === 'income') {
    filtered = filtered.filter(transaction => {
      const isReceiver = transaction.toUser === userStore.currentUser.username;
      return isReceiver;
    });
  } else if (filterCriteria.value === 'expense') {
    filtered = filtered.filter(transaction => {
      const isSender = transaction.fromUser === userStore.currentUser.username;
      return isSender; 
    });
  }

  return filtered;
});

const sortedTransactions = computed(() => {
  return [...filteredTransactions.value].map(transaction => {

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
  }).replace(',', ''); 
}


onMounted(() => {
  historyStore.loadTransactions();
});
</script>

<style scoped>
.search-row {
  margin-bottom: 15px;
}

.scrollable {
  max-height: 500px;
  overflow-y: auto;  
}
</style>
