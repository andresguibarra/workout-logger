<template>
  <div class="workout-detail">
    <div v-if="workout" class="detail-container">
      <div class="detail-header">
        <router-link to="/" class="btn-back">← Back</router-link>
        <div class="header-actions">
          <router-link 
            :to="`/workout/${workout.id}/edit`" 
            class="btn btn-edit"
          >
            ✏️ Edit
          </router-link>
          <button @click="handleDelete" class="btn btn-delete">
            🗑️ Delete
          </button>
        </div>
      </div>

      <div class="detail-content">
        <h1>{{ workout.name }}</h1>
        
        <div class="detail-meta">
          <div class="meta-item">
            <span class="meta-label">Date:</span>
            <span class="meta-value">{{ formatDate(workout.date) }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Type:</span>
            <span class="meta-value type-badge" :class="`type-${workout.type}`">
              {{ formatType(workout.type) }}
            </span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Duration:</span>
            <span class="meta-value">{{ workout.duration }} minutes</span>
          </div>
        </div>

        <div v-if="workout.exercises" class="detail-section">
          <h2>Exercises</h2>
          <pre class="detail-text">{{ workout.exercises }}</pre>
        </div>

        <div v-if="workout.notes" class="detail-section">
          <h2>Notes</h2>
          <p class="detail-text">{{ workout.notes }}</p>
        </div>

        <div class="detail-footer">
          <small v-if="workout.createdAt">
            Created: {{ formatDateTime(workout.createdAt) }}
          </small>
          <small v-if="workout.updatedAt">
            Last updated: {{ formatDateTime(workout.updatedAt) }}
          </small>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <p>Workout not found</p>
      <router-link to="/" class="btn btn-primary">Go Home</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWorkoutStore } from '../stores/workoutStore'

const router = useRouter()
const route = useRoute()
const workoutStore = useWorkoutStore()

const workout = ref(null)

onMounted(() => {
  workout.value = workoutStore.getWorkoutById(route.params.id)
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatType = (type) => {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this workout?')) {
    workoutStore.deleteWorkout(route.params.id)
    router.push('/')
  }
}
</script>

<style scoped>
.workout-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.btn-back {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.btn-back:hover {
  color: #764ba2;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.detail-content {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.detail-content h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.meta-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  font-weight: 600;
}

.meta-value {
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 500;
}

.type-badge {
  display: inline-block;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
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

.detail-section {
  margin-bottom: 25px;
}

.detail-section h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
}

.detail-text {
  color: #555;
  line-height: 1.6;
  white-space: pre-wrap;
  font-family: inherit;
  margin: 0;
}

.detail-footer {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.detail-footer small {
  color: #7f8c8d;
}

.btn {
  padding: 8px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 0.9rem;
}

.btn-edit {
  background: #667eea;
  color: white;
}

.btn-edit:hover {
  background: #764ba2;
}

.btn-delete {
  background: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background: #c0392b;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 30px;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
}

.not-found p {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 20px;
}

@media (max-width: 600px) {
  .detail-content {
    padding: 20px;
  }
  
  .detail-content h1 {
    font-size: 1.8rem;
  }
  
  .detail-meta {
    flex-direction: column;
    gap: 15px;
  }
  
  .header-actions {
    flex-direction: column;
  }
}
</style>
