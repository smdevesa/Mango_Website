<template>
  <div class="layout">
    <Sidebar class="sidebar" />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../common/Sidebar.vue";
</script>

<style scoped>
.layout {
  display: flex; 
  min-height: 100vh; 
  width: 100vw; 
  overflow: hidden; 
}

.sidebar {
  width: 250px; 
  flex-shrink: 0; 
}

.main-content {
  flex-grow: 1; 
  margin-left: 250px; 
  padding: 20px;
  overflow: auto; 
}
</style>
