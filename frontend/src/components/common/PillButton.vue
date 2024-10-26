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
        <span>{{ prefix }}{{ value }}</span>
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
  },
  icon: {
    type: String,
    required: false,
  },
  iconColor: {
    type: String,
    default: '#000',
  },
  bgColor: {
    type: String,
    default: '#FFFBE6',
  },
  prefix: {
    type: String,
    default: '$',
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-size: 24px;
}
</style>
