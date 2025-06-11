<template>
  <div id="app">
    <StudentView />
  </div>
</template>

<script setup lang="ts">
import StudentView from '@/views/StudentView.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f8f9fa;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
}
</style>