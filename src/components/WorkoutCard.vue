<template>
  <router-link 
    :to="`/workout/${workout.id}`" 
    class="workout-card glass"
    @mousemove="handleMouseMove"
    @mouseleave="resetTilt"
  >
    <div class="card-shine"></div>
    <div class="card-content">
      <div class="card-header">
        <h3 class="workout-name">{{ workout.name }}</h3>
        <span class="type-badge-3d" :class="`type-${workout.type}`">
          {{ formatType(workout.type) }}
        </span>
      </div>
      
      <div class="card-body">
        <div class="card-info">
          <div class="info-icon">📅</div>
          <span>{{ formatDate(workout.date) }}</span>
        </div>
        <div class="card-info">
          <div class="info-icon">⚡</div>
          <span>{{ workout.duration }} min</span>
        </div>
      </div>

      <div v-if="workout.exercises" class="card-preview">
        <div class="preview-icon">💪</div>
        <span>{{ truncateText(workout.exercises, 60) }}</span>
      </div>
    </div>
    
    <div class="card-glow" :class="`glow-${workout.type}`"></div>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  workout: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

const formatType = (type) => {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const handleMouseMove = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = (y - centerY) / 20
  const rotateY = (centerX - x) / 20
  
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`
  
  // Update shine position
  const shine = card.querySelector('.card-shine')
  shine.style.left = `${x}px`
  shine.style.top = `${y}px`
}

const resetTilt = (e) => {
  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
}
</script>

<style scoped>
.workout-card {
  display: block;
  position: relative;
  border-radius: 25px;
  padding: 30px;
  text-decoration: none;
  color: white;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  overflow: hidden;
  cursor: pointer;
}

.workout-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  opacity: 0;
  transition: opacity 0.3s;
}

.workout-card:hover::before {
  opacity: 1;
}

.workout-card:hover {
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}

.card-shine {
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: opacity 0.3s;
  opacity: 0;
}

.workout-card:hover .card-shine {
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 15px;
}

.workout-name {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  flex: 1;
  line-height: 1.3;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.type-badge-3d {
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
}

.workout-card:hover .type-badge-3d {
  transform: translateZ(20px) scale(1.05);
}

.type-cardio {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.type-strength {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.type-flexibility {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #333;
}

.type-sports {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: white;
}

.type-other {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
}

.card-body {
  display: flex;
  gap: 25px;
  margin-bottom: 20px;
}

.card-info {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 500;
}

.info-icon {
  font-size: 1.3rem;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
}

.card-preview {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.5;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.card-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  filter: blur(15px);
  opacity: 0.6;
  transition: opacity 0.3s;
}

.workout-card:hover .card-glow {
  opacity: 1;
}

.glow-cardio {
  background: linear-gradient(90deg, #4facfe, #00f2fe);
}

.glow-strength {
  background: linear-gradient(90deg, #f093fb, #f5576c);
}

.glow-flexibility {
  background: linear-gradient(90deg, #a8edea, #fed6e3);
}

.glow-sports {
  background: linear-gradient(90deg, #43e97b, #38f9d7);
}

.glow-other {
  background: linear-gradient(90deg, #fa709a, #fee140);
}

@media (max-width: 768px) {
  .workout-card {
    padding: 20px;
  }
  
  .workout-name {
    font-size: 1.3rem;
  }
  
  .card-body {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
