<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// Main App component using Vue Router
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
}

body {
  margin: 0;
}
</style>
