<template>
  <div class="workout-form">
    <div class="form-header">
      <div class="header-content">
        <div class="title-container">
          <span class="title-icon">{{ isEditMode ? '✏️' : '✨' }}</span>
          <h1 class="title-3d">{{ isEditMode ? 'Edit Workout' : 'Create Workout' }}</h1>
        </div>
        <router-link to="/" class="btn-back glass">
          <span>←</span> Back
        </router-link>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="form glass">
      <div class="form-grid">
        <div class="form-group">
          <label for="name" class="label-3d">
            <span class="label-icon">💪</span>
            Workout Name
          </label>
          <div class="input-wrapper">
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="input-3d"
              placeholder="Beast Mode Activated..."
              required
            />
            <div class="input-glow"></div>
          </div>
        </div>

        <div class="form-group">
          <label for="date" class="label-3d">
            <span class="label-icon">📅</span>
            Date
          </label>
          <div class="input-wrapper">
            <input
              id="date"
              v-model="form.date"
              type="date"
              class="input-3d"
              required
            />
            <div class="input-glow"></div>
          </div>
        </div>

        <div class="form-group">
          <label for="type" class="label-3d">
            <span class="label-icon">🎯</span>
            Workout Type
          </label>
          <div class="input-wrapper">
            <select id="type" v-model="form.type" class="input-3d" required>
              <option value="">Choose your challenge...</option>
              <option value="cardio">💨 Cardio</option>
              <option value="strength">🏋️ Strength Training</option>
              <option value="flexibility">🧘 Flexibility</option>
              <option value="sports">⚽ Sports</option>
              <option value="other">🌟 Other</option>
            </select>
            <div class="input-glow"></div>
          </div>
        </div>

        <div class="form-group">
          <label for="duration" class="label-3d">
            <span class="label-icon">⚡</span>
            Duration (minutes)
          </label>
          <div class="input-wrapper">
            <input
              id="duration"
              v-model.number="form.duration"
              type="number"
              min="1"
              class="input-3d"
              placeholder="45"
              required
            />
            <div class="input-glow"></div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="exercises" class="label-3d">
          <span class="label-icon">🔥</span>
          Exercises
        </label>
        <div class="input-wrapper">
          <textarea
            id="exercises"
            v-model="form.exercises"
            rows="3"
            class="input-3d"
            placeholder="Squats 3x10, Deadlifts 3x8, Bench Press 3x10..."
          ></textarea>
          <div class="input-glow"></div>
        </div>
      </div>

      <div class="form-group">
        <label for="notes" class="label-3d">
          <span class="label-icon">📝</span>
          Notes
        </label>
        <div class="input-wrapper">
          <textarea
            id="notes"
            v-model="form.notes"
            rows="4"
            class="input-3d"
            placeholder="How did you feel? Any achievements or observations..."
          ></textarea>
          <div class="input-glow"></div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-3d btn-primary glass">
          <span class="btn-icon">{{ isEditMode ? '💾' : '🚀' }}</span>
          <span>{{ isEditMode ? 'Update Workout' : 'Launch Workout' }}</span>
          <div class="btn-glow"></div>
        </button>
        <router-link to="/" class="btn-3d btn-secondary glass">
          <span class="btn-icon">❌</span>
          <span>Cancel</span>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWorkoutStore } from '../stores/workoutStore'

const router = useRouter()
const route = useRoute()
const workoutStore = useWorkoutStore()

const isEditMode = computed(() => !!route.params.id && route.name === 'EditWorkout')

const form = ref({
  name: '',
  date: new Date().toISOString().split('T')[0],
  type: '',
  duration: '',
  notes: '',
  exercises: ''
})

onMounted(() => {
  if (isEditMode.value) {
    const workout = workoutStore.getWorkoutById(route.params.id)
    if (workout) {
      form.value = { ...workout }
    } else {
      router.push('/')
    }
  }
})

const handleSubmit = () => {
  if (isEditMode.value) {
    workoutStore.updateWorkout(route.params.id, form.value)
  } else {
    workoutStore.addWorkout(form.value)
  }
  router.push('/')
}
</script>

<style scoped>
.workout-form {
  max-width: 800px;
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

.form-header {
  margin-bottom: 40px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.title-icon {
  font-size: 3rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.title-3d {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
  margin: 0;
  text-transform: uppercase;
}

.btn-back {
  padding: 12px 25px;
  border-radius: 25px;
  text-decoration: none;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-size: 1rem;
}

.btn-back:hover {
  transform: translateX(-5px) scale(1.05);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.form {
  padding: 40px;
  border-radius: 30px;
  position: relative;
  overflow: hidden;
}

.form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  opacity: 0;
  transition: opacity 0.3s;
}

.form:hover::before {
  opacity: 1;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin-bottom: 25px;
}

.form-group {
  position: relative;
  animation: fadeInUp 0.6s ease-out backwards;
}

.form-group:nth-child(1) { animation-delay: 0.1s; }
.form-group:nth-child(2) { animation-delay: 0.2s; }
.form-group:nth-child(3) { animation-delay: 0.3s; }
.form-group:nth-child(4) { animation-delay: 0.4s; }
.form-group:nth-child(5) { animation-delay: 0.5s; }
.form-group:nth-child(6) { animation-delay: 0.6s; }

.label-3d {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.label-icon {
  font-size: 1.4rem;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
}

.input-wrapper {
  position: relative;
}

.input-3d {
  width: 100%;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  font-size: 1rem;
  color: white;
  font-family: inherit;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-sizing: border-box;
}

.input-3d::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.input-3d:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.8);
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.input-3d:focus + .input-glow {
  opacity: 1;
}

.input-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
  border-radius: 0 0 15px 15px;
  opacity: 0;
  transition: opacity 0.3s;
  filter: blur(8px);
}

select.input-3d {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  padding-right: 45px;
}

select.input-3d option {
  background: #1e3c72;
  color: white;
  padding: 10px;
}

textarea.input-3d {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  gap: 20px;
  margin-top: 40px;
  animation: fadeInUp 0.6s ease-out 0.7s backwards;
}

.btn-3d {
  position: relative;
  flex: 1;
  padding: 18px 35px;
  border-radius: 50px;
  border: none;
  font-weight: 700;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  text-decoration: none;
  color: white;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.6);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
}

.btn-icon {
  font-size: 1.4rem;
}

.btn-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  transition: all 0.5s;
  pointer-events: none;
}

.btn-primary:active .btn-glow {
  transform: translate(-50%, -50%) scale(3);
  opacity: 1;
  transition: all 0s;
}

@media (max-width: 768px) {
  .workout-form {
    padding: 20px 15px;
  }

  .form {
    padding: 25px;
  }

  .title-3d {
    font-size: 1.8rem;
  }

  .title-icon {
    font-size: 2rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .form-actions {
    flex-direction: column;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
