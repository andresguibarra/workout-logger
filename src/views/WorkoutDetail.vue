<template>
  <div class="workout-detail">
    <div v-if="workout" class="detail-container">
      <div class="detail-header">
        <router-link to="/" class="btn-nav glass">
          <span>←</span> Back
        </router-link>
        <div class="header-actions">
          <router-link 
            :to="`/workout/${workout.id}/edit`" 
            class="btn-action btn-edit glass"
          >
            <span class="btn-icon">✏️</span>
            Edit
          </router-link>
          <button @click="handleDelete" class="btn-action btn-delete glass">
            <span class="btn-icon">🗑️</span>
            Delete
          </button>
        </div>
      </div>

      <div class="detail-content glass">
        <div class="content-inner">
          <div class="workout-title-section">
            <h1 class="workout-title-3d">{{ workout.name }}</h1>
            <span class="type-badge-3d" :class="`type-${workout.type}`">
              {{ formatType(workout.type) }}
            </span>
          </div>
          
          <div class="meta-grid">
            <div class="meta-card glass">
              <div class="meta-icon">📅</div>
              <div class="meta-content">
                <span class="meta-label">Date</span>
                <span class="meta-value">{{ formatDate(workout.date) }}</span>
              </div>
            </div>
            
            <div class="meta-card glass">
              <div class="meta-icon">⚡</div>
              <div class="meta-content">
                <span class="meta-label">Duration</span>
                <span class="meta-value">{{ workout.duration }} min</span>
              </div>
            </div>
          </div>

          <div v-if="workout.exercises" class="detail-section">
            <div class="section-header">
              <span class="section-icon">🔥</span>
              <h2 class="section-title">Exercises</h2>
            </div>
            <div class="section-content glass">
              <pre class="detail-text">{{ workout.exercises }}</pre>
            </div>
          </div>

          <div v-if="workout.notes" class="detail-section">
            <div class="section-header">
              <span class="section-icon">📝</span>
              <h2 class="section-title">Notes</h2>
            </div>
            <div class="section-content glass">
              <p class="detail-text">{{ workout.notes }}</p>
            </div>
          </div>

          <div class="detail-footer">
            <div v-if="workout.createdAt" class="footer-item">
              <span class="footer-icon">✨</span>
              <small>Created: {{ formatDateTime(workout.createdAt) }}</small>
            </div>
            <div v-if="workout.updatedAt" class="footer-item">
              <span class="footer-icon">🔄</span>
              <small>Updated: {{ formatDateTime(workout.updatedAt) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="not-found glass">
      <div class="not-found-icon">😕</div>
      <p class="not-found-text">Workout not found</p>
      <router-link to="/" class="btn-primary glass">
        <span>🏠</span> Go Home
      </router-link>
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
  if (confirm('Are you sure you want to delete this workout? This action cannot be undone.')) {
    workoutStore.deleteWorkout(route.params.id)
    router.push('/')
  }
}
</script>

<style scoped>
.workout-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
}

.btn-nav,
.btn-action {
  padding: 12px 25px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  border: none;
  font-size: 1rem;
  color: white;
}

.btn-nav:hover {
  transform: translateX(-5px) scale(1.05);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-edit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-edit:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
}

.btn-delete {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.btn-delete:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 40px rgba(245, 87, 108, 0.5);
}

.btn-icon {
  font-size: 1.2rem;
}

.detail-content {
  padding: 50px;
  border-radius: 30px;
  position: relative;
  overflow: hidden;
}

.detail-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  opacity: 0.5;
}

.content-inner {
  position: relative;
  z-index: 1;
}

.workout-title-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  gap: 20px;
  flex-wrap: wrap;
  animation: fadeInDown 0.6s ease-out 0.2s backwards;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.workout-title-3d {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1.2;
  flex: 1;
}

.type-badge-3d {
  padding: 12px 25px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
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

.meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.meta-card {
  padding: 25px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s;
  animation: fadeInUp 0.6s ease-out backwards;
}

.meta-card:nth-child(1) { animation-delay: 0.3s; }
.meta-card:nth-child(2) { animation-delay: 0.4s; }

.meta-card:hover {
  transform: translateY(-5px);
}

.meta-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
}

.meta-content {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
}

.meta-value {
  font-size: 1.4rem;
  color: white;
  font-weight: 700;
}

.detail-section {
  margin-bottom: 35px;
  animation: fadeInUp 0.6s ease-out backwards;
}

.detail-section:nth-child(4) { animation-delay: 0.5s; }
.detail-section:nth-child(5) { animation-delay: 0.6s; }

.section-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.section-icon {
  font-size: 2rem;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
}

.section-title {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.section-content {
  padding: 25px;
  border-radius: 20px;
}

.detail-text {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  white-space: pre-wrap;
  font-family: inherit;
  margin: 0;
  font-size: 1.1rem;
}

.detail-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  animation: fadeInUp 0.6s ease-out 0.7s backwards;
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.5);
}

.footer-icon {
  font-size: 1.2rem;
}

.not-found {
  text-align: center;
  padding: 80px 40px;
  border-radius: 30px;
}

.not-found-icon {
  font-size: 5rem;
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.not-found-text {
  font-size: 1.8rem;
  color: white;
  font-weight: 700;
  margin-bottom: 30px;
}

.btn-primary {
  display: inline-flex;
  padding: 18px 40px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  align-items: center;
  gap: 12px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.6);
}

@media (max-width: 768px) {
  .workout-detail {
    padding: 20px 15px;
  }

  .detail-content {
    padding: 30px 20px;
  }

  .workout-title-3d {
    font-size: 2rem;
  }

  .meta-grid {
    grid-template-columns: 1fr;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .section-title {
    font-size: 1.4rem;
  }
}
</style>
