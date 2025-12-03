<template>
  <router-link 
    :to="`/workout/${workout.id}`" 
    class="workout-card"
  >
    <div class="card-header">
      <h3>{{ workout.name }}</h3>
      <span class="type-badge" :class="`type-${workout.type}`">
        {{ formatType(workout.type) }}
      </span>
    </div>
    
    <div class="card-body">
      <div class="card-info">
        <span class="info-icon">📅</span>
        <span>{{ formatDate(workout.date) }}</span>
      </div>
      <div class="card-info">
        <span class="info-icon">⏱️</span>
        <span>{{ workout.duration }} minutes</span>
      </div>
    </div>

    <div v-if="workout.exercises" class="card-preview">
      {{ truncateText(workout.exercises, 60) }}
    </div>
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
</script>

<style scoped>
.workout-card {
  display: block;
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.workout-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  gap: 15px;
}

.card-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #2c3e50;
  flex: 1;
}

.type-badge {
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

.type-cardio {
  background: #e3f2fd;
  color: #1976d2;
}

.type-strength {
  background: #fce4ec;
  color: #c2185b;
}

.type-flexibility {
  background: #f3e5f5;
  color: #7b1fa2;
}

.type-sports {
  background: #e8f5e9;
  color: #388e3c;
}

.type-other {
  background: #fff3e0;
  color: #f57c00;
}

.card-body {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
}

.card-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
  font-size: 0.95rem;
}

.info-icon {
  font-size: 1.1rem;
}

.card-preview {
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.4;
  border-top: 1px solid #e0e0e0;
  padding-top: 12px;
  margin-top: 8px;
}

@media (max-width: 600px) {
  .workout-card {
    padding: 15px;
  }
  
  .card-header h3 {
    font-size: 1.1rem;
  }
  
  .card-body {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
