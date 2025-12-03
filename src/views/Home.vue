<template>
  <div class="home">
    <div class="header">
      <h1>💪 Workout Logger</h1>
      <p class="subtitle">Track your fitness journey</p>
    </div>

    <div class="stats">
      <div class="stat-card">
        <span class="stat-number">{{ totalWorkouts }}</span>
        <span class="stat-label">Total Workouts</span>
      </div>
    </div>

    <div class="actions">
      <router-link to="/workout/new" class="btn btn-primary">
        ➕ New Workout
      </router-link>
    </div>

    <div v-if="sortedWorkouts.length === 0" class="empty-state">
      <p>No workouts yet. Start by adding your first workout!</p>
    </div>

    <div v-else class="workouts-list">
      <h2>Recent Workouts</h2>
      <WorkoutCard
        v-for="workout in sortedWorkouts"
        :key="workout.id"
        :workout="workout"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWorkoutStore } from '../stores/workoutStore'
import WorkoutCard from '../components/WorkoutCard.vue'

const workoutStore = useWorkoutStore()

const totalWorkouts = computed(() => workoutStore.totalWorkouts)
const sortedWorkouts = computed(() => workoutStore.sortedWorkouts)
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 40px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.actions {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.btn {
  padding: 12px 30px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;
  font-size: 1.1rem;
}

.workouts-list h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

@media (max-width: 600px) {
  .header h1 {
    font-size: 2rem;
  }
  
  .stat-card {
    padding: 15px 30px;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>
