export const COMPOUND_EXERCISES: CompoundExerciseData[] = [
  {
    id: 1,
    name: 'Barbell Squat',
    sets: 3,
    restBetweenSets: 90, // seconds
    restAfterExercise: 180, // seconds
    weights: [60, 70, 80], // kg
    eccentricControl: 70, // %
    breathControl: 80, // %
    rpe: 75, // %
    repsPerSet: [8, 6, 4],
  },
  {
    id: 2,
    name: 'Bench Press',
    sets: 3,
    restBetweenSets: 90,
    restAfterExercise: 180,
    weights: [50, 60, 70],
    eccentricControl: 60,
    breathControl: 70,
    rpe: 70,
    repsPerSet: [10, 8, 6],
  },
  {
    id: 3,
    name: 'Deadlift',
    sets: 1,
    restBetweenSets: 120,
    restAfterExercise: 240,
    weights: [100],
    eccentricControl: 80,
    breathControl: 90,
    rpe: 85,
    repsPerSet: [5],
  },
  {
    id: 4,
    name: 'Overhead press',
    restBetweenSets: 60,
    restAfterExercise: 120,
    weights: [30, 35, 40],
    eccentricControl: 65,
    breathControl: 75,
    rpe: 70,
    repsPerSet: [10, 8, 6],
    sets: 3
  },
  {
    id: 5,
    name: 'Pull-ups',
    sets: 3,
    restBetweenSets: 60,
    restAfterExercise: 120,
    weights: [0, 0, 0], // Bodyweight
    eccentricControl: 70,
    breathControl: 80,
    rpe: 75,
    repsPerSet: [8, 8, 8],
  },
];
