import { defineStore } from 'pinia'

export const useBalanceStore = defineStore('balance', {
  state: () => ({
    totalBalance: 1000, // Cambiamos a un número para facilitar los cálculos
    sections: [{label: 'Disponible', value: 1000, percentage: 100, color: 'green'}]
  }),
  actions: {
    updateBalance(newBalance) {
      this.totalBalance = newBalance
      this.recalculatePercentages()
    },
    addSection(newSection) {
      if (newSection.value <= this.availableBalance) {
        this.sections.push(newSection)
        this.sections[0].value -= newSection.value // Reducir el disponible
        this.recalculatePercentages()
      }
    },
    removeSection(index) {
      const removedValue = this.sections[index].value
      this.sections.splice(index, 1)
      this.sections[0].value += removedValue // Aumentar el disponible
      this.recalculatePercentages()
    },
    recalculatePercentages() {
      this.sections.forEach(section => {
        section.percentage = (section.value / this.totalBalance) * 100
      })
    }
  },
  getters: {
    formattedBalance: (state) => `$${state.totalBalance.toFixed(2)}`,
    availableBalance: (state) => state.sections[0].value
  }
})