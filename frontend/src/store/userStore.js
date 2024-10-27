// userStore.js
import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useUserStore = defineStore('user', () => {
  const users = ref(JSON.parse(localStorage.getItem('users')) || []); // Cargar usuarios desde localStorage
  const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || null);
  const error = ref('');
  const loading = ref(false);

  const wordsForAlias = ['apple', 'humano', 'computador', 'cobayo', 'paloma', 'raton', 'estrella'];

  const saveUsersToLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users.value));
  };

  const saveCurrentUserToLocalStorage = () => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value));
  };

  const register = (username, password, email) => {
    loading.value = true; // Indica que se está procesando la solicitud
    error.value = ''; // Limpia errores anteriores

    // Validar si el usuario ya existe
    const userExists = users.value.some(user => user.username === username || user.email === email);
    if (userExists) {
      error.value = 'El nombre de usuario o el correo ya están en uso.';
      loading.value = false; // Finaliza la carga
      return;
    }

    const alias = generateRandomAlias();
    const cvu = generateRandomCvu();

    // Simulación de registro
    users.value.push({ username, password, email, alias, cvu }); // Agregar nuevo usuario
    saveUsersToLocalStorage(); // Guardar usuarios en localStorage
    loading.value = false; // Finaliza la carga
  };

  // Función para iniciar sesión
  const login = (username, password) => {
    loading.value = true; // Indica que se está procesando la solicitud
    error.value = ''; // Limpia errores anteriores

    // Buscar el usuario por nombre de usuario
    const user = users.value.find(user => user.username === username && user.password === password);
    if (!user) {
      error.value = 'Nombre de usuario o contraseña incorrectos.';
      loading.value = false; // Finaliza la carga
      return;
    }

    // Si el usuario es encontrado, lo establece como usuario actual
    currentUser.value = user;
    saveCurrentUserToLocalStorage(); // Guardar usuario actual en localStorage
    loading.value = false; // Finaliza la carga
  };

  // Función para cerrar sesión
  const logout = () => {
    currentUser.value = null; // Limpiar el usuario actual
    localStorage.removeItem('currentUser'); // Eliminar el usuario actual del localStorage
  };

  const isLoggedIn = () => currentUser.value !== null;

  // Cargar datos al montar el store
  onMounted(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      users.value = storedUsers;
    }
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedCurrentUser) {
      currentUser.value = storedCurrentUser;
    }
  });

  const generateRandomAlias = () => {
    let alias;
    let isUnique = false;
  
    while (!isUnique) {
      const word1 = Math.floor(Math.random() * wordsForAlias.length);
      const word2 = Math.floor(Math.random() * wordsForAlias.length);
      alias = wordsForAlias[word1] + '.' + wordsForAlias[word2] + '.mango';
  
      isUnique = !users.value.some(user => user.alias === alias);
    }
    return alias;
  };

  const generateRandomCvu = () => {
    let cvu;
    let isUnique = false;
  
    while (!isUnique) {
      cvu = Math.random().toString().substring(2, 24);
      isUnique = !users.value.some(user => user.cvu === cvu);
    }
    return cvu;
  };

  const aliasIsUsed = (aliasToCheck) => {
    return users.value.some(user => user.alias === aliasToCheck); 

  } 

  const userExists = (username) => {
    return users.value.some(user => user.username === username);
  };

  return { users, currentUser, error, loading, register, login, logout, isLoggedIn, aliasIsUsed, userExists };
});
