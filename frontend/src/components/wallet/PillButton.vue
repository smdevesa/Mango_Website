<template>
    <div class="pill-button" @click="$emit('click')" :style="{ backgroundColor: bgColor }">
      <div class="icon" :style="{ backgroundColor: iconColor }">
        <v-icon>{{ icon }}</v-icon>
      </div>
      <div class="text-container">
        <span class="name">{{ name }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PillButton',
    props: {
      name: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
      iconColor: {
        type: String,
        default: '#000',
      },
      bgColor: {
        type: String,
        default: '#FFFBE6',
      },
    },
  };
  </script>
  
  <style scoped>
  .pill-button {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border-radius: 20px;
    margin: 5px;
    color: #000;
    font-weight: bold;
    justify-content: space-between;
    cursor: pointer;
  }
  
  .icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .text-container {
    flex-grow: 1;
  }
  
  .name {
    font-size: 16px;
  }
  </style>
  
  