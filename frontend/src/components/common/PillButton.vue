<template> 
  <div
    class="pill-button"
    :style="{ backgroundColor: bgColor }"
  >
    <div 
      class="icon" 
      :style="{ backgroundColor: iconColor }"
    >
    <v-icon class="pill-icon">{{ icon }}</v-icon>
    </div>
    <div class="text-container">
      <span class="name">{{ name }}</span>
    </div>
    
    <div 
      v-if="value !== undefined" 
      class="amount-pill" 
      style="background-color: orange;"
    >
      <div class="text-pill">
        <span>{{ "$" + value }}</span>
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    //default: undefined,
  },
  icon: {
    type: String,
    required: false, // No es obligatorio y sin valor por defecto
  },
  iconColor: {
    type: String,
    default: '#000',
  },
  bgColor: {
    type: String,
    default: '#FFFBE6',
  },
});
</script>

<style scoped>
.pill-button {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 20px;
  margin: 10px;
  color: #000;
  justify-content: space-between;
  border: solid #000 1px;
}

.icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}

.text-container {
  flex-grow: 1;
  border: #000;
  font-weight: 600;
}

.name {
  font-size: 18px;
  margin-left: 10px;
}

.amount-pill {
  border-radius: 12px;
  padding: 5px 10px;
  color: #000;
  border: solid 1px #000;
  font-weight: 600;
  font-size: 16px;
}
.pill-icon {
  color: #000;
  font-size: 28px;
  padding-right: 15px;
  padding-left: 15px;
  padding-bottom: 5px;
}
</style>
