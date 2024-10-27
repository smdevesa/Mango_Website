import { useUserStore } from '@/store/userStore';
import { defineStore } from 'pinia';


export const useHistoryStore = defineStore('history', {
  state: () => ({
    transactions: JSON.parse(localStorage.getItem('transactionHistory')) || []
  }),
  actions: {
    // Agregar una nueva transacción al historial con datos individuales
    addTransaction(fromUser, toUser, amount, description, date) {
      const userStore = useUserStore();

      // Crea la transacción con los datos proporcionados
      const transaction = {
        fromUser,
        toUser,
        amount,
        description,
        date
      };

      // Agrega la transacción al historial
      this.transactions.push(transaction);
      this.saveToLocalStorage();
      return true;
    },
    // Obtener las transacciones de un usuario específico
    getTransactionsByUser(username) {
      return this.transactions.filter(tx => tx.fromUser === username || tx.toUser === username);
    },
    // Obtener todas las transacciones
    getAllTransactions() {
      return this.transactions;
    },
    // Guardar el historial en localStorage
    saveToLocalStorage() {
      localStorage.setItem('transactionHistory', JSON.stringify(this.transactions));
    },
    // Cargar el historial desde localStorage
    loadTransactions() {
      const storedTransactions = localStorage.getItem('transactionHistory');
      if (storedTransactions) {
        this.transactions = JSON.parse(storedTransactions);
      }
    },
    // Limpiar todo el historial
    clearHistory() {
      this.transactions = [];
      this.saveToLocalStorage();
    }
  }
});
