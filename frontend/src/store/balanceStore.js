import { defineStore } from 'pinia'

export const useBalanceStore = defineStore('balance', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('userBalances')) || {} // Carga los balances del localStorage
  }),
  actions: {
    // Inicializa el balance para un nuevo usuario
    initUserBalance(username) {
      if (!this.users[username]) {
        this.users[username] = {
          totalBalance: 1000, // Balance inicial
          sections: [{ label: 'Disponible', value: 1000, percentage: 100, color: 'green' }]

        };
        this.saveToLocalStorage(); // Guarda en localStorage
      }
    },
    // Cambia el balance de un usuario
    updateBalance(username, newBalance) {
      if (this.users[username]) {
        this.users[username].totalBalance = newBalance;
        this.recalculatePercentages(username);
        this.saveToLocalStorage(); // Guarda en localStorage
      }
    },
    // Agrega una nueva sección para un usuario
    addSection(username, newSection) {
      if (this.users[username] && newSection.value <= this.availableBalance(username)) {
        this.users[username].sections.push(newSection);
        this.users[username].sections[0].value -= newSection.value; // Reducir el disponible
        this.recalculatePercentages(username);
        this.saveToLocalStorage(); // Guarda en localStorage
      }
    },
    // Elimina una sección para un usuario
    removeSection(username, index) {
      if (this.users[username]) {
        const removedValue = this.users[username].sections[index].value;
        this.users[username].sections.splice(index, 1);
        this.users[username].sections[0].value += removedValue; // Aumentar el disponible
        this.recalculatePercentages(username);
        this.saveToLocalStorage(); // Guarda en localStorage
      }
    },
    // Recalcula los porcentajes de las secciones de un usuario
    recalculatePercentages(username) {
      if (this.users[username]) {
        const totalBalance = this.users[username].totalBalance;
        this.users[username].sections.forEach(section => {
          section.percentage = ((section.value / totalBalance) * 100);
        });
      }
    },
    // Guarda los balances de usuarios en localStorage
    saveToLocalStorage() {
      localStorage.setItem('userBalances', JSON.stringify(this.users));
    }
  },
  getters: {
    // Obtiene el balance formateado de un usuario
    formattedBalance: (state) => (username) => {
      return username in state.users 
        ? `${state.users[username].totalBalance.toFixed(2)}` 
        : '$0.00';
    },
    // Obtiene el balance disponible de un usuario
    availableBalance: (state) => (username) => {
      return username in state.users 
        ? state.users[username].sections[0].value 
        : 0;
    },
  }
});
