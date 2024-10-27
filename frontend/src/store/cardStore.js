import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useUserStore } from './userStore';

export const useCardStore = defineStore('card', () => {
  const userStore = useUserStore();
  const cardsByUser = ref(JSON.parse(localStorage.getItem('cardsByUser')) || {});

  const saveToLocalStorage = () => {
    localStorage.setItem('cardsByUser', JSON.stringify(cardsByUser.value));
  };

  const getCards = computed(() => {
    const currentUsername = userStore.currentUser?.username;
    return currentUsername ? (cardsByUser.value[currentUsername] || []) : [];
  });

  const addCard = (card) => {
    const currentUsername = userStore.currentUser?.username;
    if (currentUsername) {
      if (!cardsByUser.value[currentUsername]) {
        cardsByUser.value[currentUsername] = [];
      }
      cardsByUser.value[currentUsername].push(card);
      saveToLocalStorage();
    }
  };

  const removeCard = (cardId) => {
    const currentUsername = userStore.currentUser?.username;
    if (currentUsername && cardsByUser.value[currentUsername]) {
      cardsByUser.value[currentUsername] = cardsByUser.value[currentUsername].filter(card => card.id !== cardId);
      saveToLocalStorage();
    }
  };

  return { getCards, addCard, removeCard };
});
