<template>
  <div id="app">
    <div class="particles">
      <div class="particle" v-for="i in 50" :key="i" :style="particleStyle(i)"></div>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const particleStyle = (i) => {
  const size = Math.random() * 4 + 1
  const delay = Math.random() * 20
  const duration = Math.random() * 20 + 10
  const left = Math.random() * 100
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
  border-radius: 50%;
  bottom: -10px;
  animation: float-up linear infinite;
  opacity: 0;
}

@keyframes float-up {
  0% {
    bottom: -10px;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    bottom: 110%;
    opacity: 0;
    transform: translateX(50px);
  }
}
</style>
