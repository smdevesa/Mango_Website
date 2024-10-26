import { defineStore } from 'pinia';

export const useCardStore = defineStore('card', {
  state: () => ({
    cards: JSON.parse(localStorage.getItem('cards')) || [],
  }),

  actions: {
    addCard(card) {
      this.cards.push(card);
      this.saveCards();
    },

    removeCard(id) {
      this.cards = this.cards.filter(card => card.id !== id);
      this.saveCards();
    },

    updateCard(updatedCard) {
      const index = this.cards.findIndex(card => card.id === updatedCard.id);
      if (index !== -1) {
        this.cards[index] = updatedCard;
        this.saveCards();
      }
    },

    saveCards() {
      localStorage.setItem('cards', JSON.stringify(this.cards));
    },

    loadCards() {
      const storedCards = localStorage.getItem('cards');
      if (storedCards) {
        this.cards = JSON.parse(storedCards);
      }
    },
  },

  getters: {
    getCards: (state) => state.cards,
    getCardById: (state) => (id) => state.cards.find(card => card.id === id),
  },
});
