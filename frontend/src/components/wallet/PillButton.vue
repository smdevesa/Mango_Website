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
      bgColor: {
        type: String,
        default: '#FFFBE6',
      },
    },
  }
  </script>
  
  <style scoped>
  .pill-button {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border-radius: 20px;
    margin: 10px;
    color: #000;
    font-weight: 600;
    justify-content: space-between;
    cursor: pointer;
    height: 54.53px;
    border: solid #000 1px;
  }
  
  .icon {
    width: 25px;
    height: 25px;
    font-size: large;
    border-radius: 50%;
    margin-right: 10px;
    
  }
  
  .text-container {
    flex-grow: 1;
    }
  
  .name {
    font-size: 18px;
    text-decoration: underline;
  }
  </style>
  
  