import { useUserStore } from '@/store/userStore';
import { defineStore } from 'pinia';


export const useHistoryStore = defineStore('history', {
  state: () => ({
    transactions: JSON.parse(localStorage.getItem('transactionHistory')) || []
  }),
  actions: {
   
    addTransaction(fromUser, toUser, amount, description, date) {

  
      const transaction = {
        fromUser,
        toUser,
        amount,
        description,
        date
      };


      this.transactions.push(transaction);
      this.saveToLocalStorage();
      return true;
    },

    getTransactionsByUser(username) {
      return this.transactions.filter(tx => tx.fromUser === username || tx.toUser === username);
    },

    getAllTransactions() {
      return this.transactions;
    },
   
    saveToLocalStorage() {
      localStorage.setItem('transactionHistory', JSON.stringify(this.transactions));
    },

    loadTransactions() {
      const storedTransactions = localStorage.getItem('transactionHistory');
      if (storedTransactions) {
        this.transactions = JSON.parse(storedTransactions);
      }
    },
 
    clearHistory() {
      this.transactions = [];
      this.saveToLocalStorage();
    }
  }
});
