import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWorkoutStore = defineStore('workout', () => {
  // State
  const workouts = ref([])
  
  // Load workouts from localStorage on initialization
  const loadWorkouts = () => {
    try {
      const stored = localStorage.getItem('workouts')
      if (stored) {
        workouts.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading workouts from localStorage:', error)
      workouts.value = []
    }
  }
  
  // Save workouts to localStorage
  const saveWorkouts = () => {
    localStorage.setItem('workouts', JSON.stringify(workouts.value))
  }
  
  // Computed
  const totalWorkouts = computed(() => workouts.value.length)
  
  const sortedWorkouts = computed(() => {
    return [...workouts.value].sort((a, b) => new Date(b.date) - new Date(a.date))
  })
  
  // Actions
  const addWorkout = (workout) => {
    const newWorkout = {
      id: crypto.randomUUID(),
      ...workout,
      createdAt: new Date().toISOString()
    }
    workouts.value.push(newWorkout)
    saveWorkouts()
  }
  
  const updateWorkout = (id, updatedWorkout) => {
    const index = workouts.value.findIndex(w => w.id === id)
    if (index !== -1) {
      workouts.value[index] = {
        ...workouts.value[index],
        ...updatedWorkout,
        updatedAt: new Date().toISOString()
      }
      saveWorkouts()
    }
  }
  
  const deleteWorkout = (id) => {
    workouts.value = workouts.value.filter(w => w.id !== id)
    saveWorkouts()
  }
  
  const getWorkoutById = (id) => {
    return workouts.value.find(w => w.id === id)
  }
  
  // Initialize
  loadWorkouts()
  
  return {
    workouts,
    totalWorkouts,
    sortedWorkouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkoutById
  }
})
