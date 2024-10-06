<template>
  <div class="user-item">
    <div class="user-info">
      <img :src="photoUrl || defaultPhoto" alt="User Photo" class="user-photo" />
      <div class="user-details">
        <span class="user-name">{{ firstName }} {{ lastName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      default: null,
    },
  },
  computed: {
    defaultPhoto() {
      return 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'; // Cambia la ruta a tu ícono por defecto
    },
  },
};
</script>

<style scoped>
.user-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  background-color: #d5ed9f; /* Cambiado a verde */
  border-bottom: 1px solid #ccc; /* Si deseas un separador */
}

.user-info {
  display: flex;
  align-items: center;
}

.user-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 10px;
  border: 1px solid #000;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: normal;
  font-size: 18px;
}
</style>
