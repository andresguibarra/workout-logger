# 💪 Workout Logger

A complete web application for tracking your fitness journey, built with Vue 3 and the Composition API.

## Features

- ✅ **Add Workouts**: Create new workout entries with name, date, type, duration, exercises, and notes
- 📋 **View Workouts**: See all your workouts in a clean, organized list sorted by date
- 🔍 **Workout Details**: View detailed information about each workout
- ✏️ **Edit Workouts**: Update your workout information
- 🗑️ **Delete Workouts**: Remove workouts you no longer need
- 💾 **Local Storage**: All data is automatically saved to your browser's local storage
- 📱 **Responsive Design**: Works beautifully on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## Technology Stack

- **Vue 3** - Progressive JavaScript framework using Composition API
- **Vite** - Next generation frontend tooling
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management for Vue
- **LocalStorage** - Data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/andresguibarra/workout-logger.git
cd workout-logger
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Add a Workout**: Click the "New Workout" button on the home page
2. Fill in the workout details:
   - Workout Name (required)
   - Date (required)
   - Type: Cardio, Strength Training, Flexibility, Sports, or Other (required)
   - Duration in minutes (required)
   - Exercises (optional)
   - Notes (optional)
3. Click "Save Workout" to add it to your list
4. **View Details**: Click on any workout card to see full details
5. **Edit**: Click the "Edit" button on the detail page to modify the workout
6. **Delete**: Click the "Delete" button on the detail page to remove the workout

## Project Structure

```
workout-logger/
├── public/             # Static assets
├── src/
│   ├── components/     # Vue components
│   │   └── WorkoutCard.vue
│   ├── router/         # Vue Router configuration
│   │   └── index.js
│   ├── stores/         # Pinia stores
│   │   └── workoutStore.js
│   ├── views/          # Page components
│   │   ├── Home.vue
│   │   ├── WorkoutForm.vue
│   │   └── WorkoutDetail.vue
│   ├── App.vue         # Root component
│   ├── main.js         # Application entry point
│   └── style.css       # Global styles
├── index.html          # HTML entry point
├── package.json        # Project dependencies
└── vite.config.js      # Vite configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

