import { defineStore } from 'pinia'

export const usePayStore = defineStore('pay', {
  state: () => ({
    links: JSON.parse(localStorage.getItem('payLinks')) || [],
  }),

  actions: {
    addLink(owner, id, amount, description) {
      const newLink = {
        owner,
        id,
        amount,
        description,
      };

      this.links.push(newLink);
      this.saveLinksToLocalStorage();
    },

    getLink(id) {
      return this.links.find(link => link.id === id);
    },

    removeLink(id) {
      this.links = this.links.filter(link => link.id !== id);
      this.saveLinksToLocalStorage();
    },

    saveLinksToLocalStorage() {
      localStorage.setItem('payLinks', JSON.stringify(this.links));
    },

    loadLinksFromLocalStorage() {
      this.links = JSON.parse(localStorage.getItem('payLinks')) || [];
    },
  },
});
