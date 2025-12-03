import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import WorkoutForm from '../views/WorkoutForm.vue'
import WorkoutDetail from '../views/WorkoutDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/workout/new',
    name: 'NewWorkout',
    component: WorkoutForm
  },
  {
    path: '/workout/:id',
    name: 'WorkoutDetail',
    component: WorkoutDetail
  },
  {
    path: '/workout/:id/edit',
    name: 'EditWorkout',
    component: WorkoutForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
