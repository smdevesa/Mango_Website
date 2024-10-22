import { defineStore } from 'pinia'

export const useBalanceStore = defineStore('balance', {
  state: () => ({
    balance: '$1,234.56',
    sections: [
      { label: 'Otros', percentage: 100, color: 'grey' }
    ]
  }),
  actions: {
    updateBalance(newBalance) {
      this.balance = newBalance
    },
    updateSections(newSections) {
      this.sections = newSections
    }
  }
})