<template>
  <div class="user-item">
    <div class="user-info">
      <img
        :src="photoUrl || defaultPhoto"
        alt="User Photo"
        class="user-photo"
      >
      <div class="user-details">
        <span class="user-name">
          {{ username }}
        </span>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { computed } from 'vue';

defineProps({
  username: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    default: null,
  },
});

const defaultPhoto = computed(() => {
  return 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png';
});
</script>
  
<style scoped>
.user-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  background-color: #d5ed9f; 
  border-bottom: 1px solid #ccc; 
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
