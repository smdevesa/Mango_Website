import { defineStore } from 'pinia'

export const useBalanceStore = defineStore('balance', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('userBalances')) || {} 
  }),
  actions: {
   
    initUserBalance(username) {
      if (!this.users[username]) {
        this.users[username] = {
          totalBalance: 1000, 
          sections: [{ label: 'Disponible', value: 1000, percentage: 100, color: 'green' }]

        };
        this.saveToLocalStorage();
      }
    },
    
    updateBalance(username, newBalance) {
      if (this.users[username]) {
        this.users[username].totalBalance = newBalance;
        this.recalculatePercentages(username);
        this.saveToLocalStorage(); 
      }
    },

    addSection(username, newSection) {
      if (this.users[username] && newSection.value <= this.availableBalance(username)) {
        this.users[username].sections.push(newSection);
        this.users[username].sections[0].value -= newSection.value;
        this.recalculatePercentages(username);
        this.saveToLocalStorage(); 
      }
    },

    removeSection(username, index) {
      if (this.users[username]) {
        const removedValue = this.users[username].sections[index].value;
        this.users[username].sections.splice(index, 1);
        this.users[username].sections[0].value += removedValue; 
        this.recalculatePercentages(username);
        this.saveToLocalStorage(); 
      }
    },

    recalculatePercentages(username) {
      if (this.users[username]) {
        const totalBalance = this.users[username].totalBalance;
        this.users[username].sections.forEach(section => {
          section.percentage = ((section.value / totalBalance) * 100);
        });
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('userBalances', JSON.stringify(this.users));
    },
    addMoney(username, amount) {
      if (this.users[username]) {
        this.users[username].totalBalance += amount;
        this.users[username].sections[0].value += amount;
        this.recalculatePercentages(username);
        this.saveToLocalStorage();
      }
    },
    transferMoney(fromUser, toUser, amount) {
      if (this.users[fromUser] && this.users[toUser]) {
        if (amount <= this.availableBalance(fromUser)) {
          this.users[fromUser].totalBalance -= amount;
          this.users[fromUser].sections[0].value -= amount;
          this.users[toUser].totalBalance += amount;
          this.users[toUser].sections[0].value += amount;
          this.recalculatePercentages(fromUser);
          this.recalculatePercentages(toUser);
          this.saveToLocalStorage();
          return true;
        }
      }
      return false;
    }
  },
  getters: {

    formattedBalance: (state) => (username) => {
      return username in state.users 
        ? `${state.users[username].totalBalance.toFixed(2)}` 
        : '$0.00';
    },
    
    availableBalance: (state) => (username) => {
      return username in state.users 
        ? state.users[username].sections[0].value 
        : 0;
    },
  }
});
