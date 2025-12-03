<template>
  <div class="home">
    <div class="header-3d">
      <div class="logo-container">
        <div class="logo-3d">
          <span class="emoji-float">💪</span>
        </div>
        <h1 class="title-3d">
          <span v-for="(char, index) in 'WORKOUT LOGGER'" :key="index" 
                :style="{ animationDelay: `${index * 0.05}s` }"
                class="char-animate">
            {{ char === ' ' ? '\u00A0' : char }}
          </span>
        </h1>
        <p class="subtitle-glow">Transform Your Fitness Journey</p>
      </div>
    </div>

    <div class="stats-container">
      <div class="stat-card-3d glass" @mousemove="handleMouseMove" @mouseleave="resetTilt">
        <div class="stat-icon">🏆</div>
        <div class="stat-content">
          <span class="stat-number-3d">{{ totalWorkouts }}</span>
          <span class="stat-label">Total Workouts</span>
        </div>
        <div class="stat-glow"></div>
      </div>
    </div>

    <div class="actions">
      <router-link to="/workout/new" class="btn-3d glass">
        <span class="btn-icon">✨</span>
        <span>New Workout</span>
        <div class="btn-glow"></div>
      </router-link>
    </div>

    <div v-if="sortedWorkouts.length === 0" class="empty-state glass">
      <div class="empty-icon">🎯</div>
      <p class="empty-text">Start your fitness journey today!</p>
      <p class="empty-subtext">Create your first workout to begin</p>
    </div>

    <div v-else class="workouts-section">
      <h2 class="section-title">
        <span class="title-glow">Recent Workouts</span>
      </h2>
      <div class="workouts-grid">
        <WorkoutCard
          v-for="workout in sortedWorkouts"
          :key="workout.id"
          :workout="workout"
          class="workout-item"
        />
      </div>
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

const handleMouseMove = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = (y - centerY) / 10
  const rotateY = (centerX - x) / 10
  
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
}

const resetTilt = (e) => {
  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 1;
}

.header-3d {
  text-align: center;
  margin-bottom: 60px;
  perspective: 1000px;
}

.logo-container {
  animation: fadeInDown 1s ease-out;
}

.logo-3d {
  display: inline-block;
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

.emoji-float {
  font-size: 5rem;
  display: inline-block;
  filter: drop-shadow(0 10px 30px rgba(255, 215, 0, 0.5));
  animation: rotate3d 4s ease-in-out infinite;
}

@keyframes rotate3d {
  0%, 100% {
    transform: rotateY(0deg) rotateZ(0deg);
  }
  50% {
    transform: rotateY(180deg) rotateZ(10deg);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.title-3d {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 3px;
  margin-bottom: 15px;
  text-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  display: flex;
  justify-content: center;
  gap: 3px;
}

.char-animate {
  display: inline-block;
  animation: bounceIn 0.6s ease-out backwards;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0) translateY(-50px);
  }
  50% {
    transform: scale(1.2) translateY(0);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.subtitle-glow {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
                 0 0 20px rgba(102, 126, 234, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
                 0 0 40px rgba(102, 126, 234, 0.8);
  }
}

.stats-container {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  perspective: 1000px;
}

.stat-card-3d {
  position: relative;
  padding: 40px 60px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 30px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  overflow: hidden;
  animation: fadeInUp 1s ease-out 0.3s backwards;
}

.stat-card-3d::before {
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

.stat-card-3d:hover::before {
  opacity: 1;
}

.stat-icon {
  font-size: 3rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.stat-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stat-number-3d {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.stat-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
  filter: blur(10px);
  animation: slideGlow 3s ease-in-out infinite;
}

@keyframes slideGlow {
  0%, 100% {
    opacity: 0.5;
    transform: translateX(-100%);
  }
  50% {
    opacity: 1;
    transform: translateX(100%);
  }
}

.actions {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  animation: fadeInUp 1s ease-out 0.5s backwards;
}

.btn-3d {
  position: relative;
  padding: 20px 50px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.btn-3d::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: transform 0.4s;
  z-index: -1;
}

.btn-3d:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.6);
}

.btn-3d:hover::before {
  transform: scale(1.2);
}

.btn-icon {
  font-size: 1.5rem;
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.btn-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%);
  animation: rotateGlow 4s linear infinite;
  pointer-events: none;
}

@keyframes rotateGlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.empty-state {
  text-align: center;
  padding: 80px 40px;
  border-radius: 30px;
  animation: fadeInUp 1s ease-out 0.7s backwards;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

.empty-text {
  font-size: 1.5rem;
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
}

.empty-subtext {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
}

.workouts-section {
  animation: fadeInUp 1s ease-out 0.7s backwards;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
}

.title-glow {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: 1px;
}

.workouts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.workout-item {
  animation: fadeInUp 0.8s ease-out backwards;
}

.workout-item:nth-child(1) { animation-delay: 0.1s; }
.workout-item:nth-child(2) { animation-delay: 0.2s; }
.workout-item:nth-child(3) { animation-delay: 0.3s; }
.workout-item:nth-child(4) { animation-delay: 0.4s; }
.workout-item:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .title-3d {
    font-size: 2rem;
    flex-wrap: wrap;
  }
  
  .emoji-float {
    font-size: 3rem;
  }
  
  .stat-card-3d {
    padding: 30px 40px;
    flex-direction: column;
    text-align: center;
  }
  
  .stat-content {
    align-items: center;
  }
  
  .workouts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
