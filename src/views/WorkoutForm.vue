<template>
  <div class="workout-form">
    <div class="form-header">
      <h1>{{ isEditMode ? '✏️ Edit Workout' : '➕ New Workout' }}</h1>
      <router-link to="/" class="btn-back">← Back</router-link>
    </div>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="name">Workout Name *</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="e.g., Morning Run, Leg Day"
          required
        />
      </div>

      <div class="form-group">
        <label for="date">Date *</label>
        <input
          id="date"
          v-model="form.date"
          type="date"
          required
        />
      </div>

      <div class="form-group">
        <label for="type">Workout Type *</label>
        <select id="type" v-model="form.type" required>
          <option value="">Select type...</option>
          <option value="cardio">Cardio</option>
          <option value="strength">Strength Training</option>
          <option value="flexibility">Flexibility</option>
          <option value="sports">Sports</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="duration">Duration (minutes) *</label>
        <input
          id="duration"
          v-model.number="form.duration"
          type="number"
          min="1"
          placeholder="e.g., 45"
          required
        />
      </div>

      <div class="form-group">
        <label for="notes">Notes</label>
        <textarea
          id="notes"
          v-model="form.notes"
          rows="4"
          placeholder="Add any notes about your workout..."
        ></textarea>
      </div>

      <div class="form-group">
        <label for="exercises">Exercises</label>
        <textarea
          id="exercises"
          v-model="form.exercises"
          rows="3"
          placeholder="e.g., Squats 3x10, Bench Press 3x8"
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {{ isEditMode ? 'Update Workout' : 'Save Workout' }}
        </button>
        <router-link to="/" class="btn btn-secondary">Cancel</router-link>
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
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.form-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
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

.form {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-group textarea {
  resize: vertical;
  font-family: inherit;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn {
  padding: 12px 30px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  text-align: center;
  flex: 1;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #e0e0e0;
  color: #2c3e50;
}

.btn-secondary:hover {
  background: #d0d0d0;
}

@media (max-width: 600px) {
  .form {
    padding: 20px;
  }
  
  .form-header h1 {
    font-size: 1.5rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>
