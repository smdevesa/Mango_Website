import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFrequentContactsStore = defineStore('frequentContacts', () => {
  const contacts = ref(JSON.parse(localStorage.getItem('frequentContacts')) || {});

  const saveToLocalStorage = () => {
    localStorage.setItem('frequentContacts', JSON.stringify(contacts.value));
  };

  const addContact = (ownerUsername, contactUsername) => {

    if (!contacts.value[ownerUsername]) {
      contacts.value[ownerUsername] = [];
    }

    // Verificar si el contacto ya existe para este usuario
    const contactExists = contacts.value[ownerUsername].some(
      contact => contact.username === contactUsername
    );

    // Solo agregar si no existe
    if (!contactExists) {
      contacts.value[ownerUsername].push({
        username: contactUsername,
        addedAt: new Date().toISOString()
      });
      saveToLocalStorage();
    }
  };

  const getContacts = (username) => {
    return contacts.value[username] || [];
  };

  return {
    contacts,
    addContact,
    getContacts
  };
});
