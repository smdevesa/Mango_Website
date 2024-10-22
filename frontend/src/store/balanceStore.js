import { defineStore } from 'pinia'

export const useBalanceStore = defineStore('balance', {
  state: () => ({
    balance: '$0.00',
    sections: [{label: 'Disponible', percentage: 100, color: 'green'}]
  }),
  actions: {
    updateBalance(newBalance) {
      this.balance = newBalance
    },
    addSection(newSection) {
      this.sections.push(newSection)
      this.recalculatePercentages()
    },
    removeSection(index) {
      this.sections.splice(index, 1)
      this.recalculatePercentages()
    },
    recalculatePercentages() {
      const total = this.sections.reduce((sum, section) => sum + section.value, 0)
      this.sections.forEach(section => {
        section.percentage = (section.value / total) * 100
      })
    }
  }
})
