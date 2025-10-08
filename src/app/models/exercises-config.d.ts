type ExerciseSectionType =
    | 'Warm up'
    | 'Main'
    | 'Finisher'
    | 'Exercise type'
    | undefined

type ExerciseConfig = {
    title: string
    rest: number,
    complete: number,
    sets: number | undefined,
    weights: number[] | undefined,
    reps: number[] | undefined,
    eccentric: number;
    restBreath: number;
}

type DayType =
    | 'Full body'
    | 'Push day'
    | 'Pull day'
    | 'Leg + core day'
    | 'Select day'


type PlaceType =
    | 'Home'
    | 'Gym'
    | 'Select place'
    | undefined


type ExerrciseResponseLog = {
    startTime: number,
    count: number,
    exercise: ExerciseLog[]
}

type ExerciseLog = {
    title: string,
    sets: number,
    time: number,
}

type CompoundExercise = {
  id: number;
  name: string;
  sets: number;
  restBetweenSets: number;
  restAfterExercise: number;
  weights: number[];
  eccentricControl: number;
  breathControl: number;
  rpe: number;
  repsPerSet: number[];
  exerciseStartTime?: number;
  exerciseEndTime?: number;
}

type CompoundExerciseData = Omit<CompoundExercise, 'exerciseStartTime' | 'exerciseEndTime' >

type LoggedCompoundExercise = CompoundExercise & {
  exerciseStartTime: number;
  exerciseEndTime: number;
  setTimestamps: number[];
};

type ConfiguredExercise = {
  id: number;
  sets: number;
  repsPerSet: number[];
  weights: number[];
  restBetweenSets: number;
  restAfterExercise: number;
}

type CardioExercise = {
  id: number;
  name: string;
  time: number;
}

type WarmupExerciseLog = CardioExercise & { exerciseStartTime?: number; exerciseEndTime?: number; };

type FinisherExerciseLog = CardioExercise & { exerciseStartTime?: number; exerciseEndTime?: number; };

type SessionData = {
  sessionStart: number;
  warmup?: WarmupExerciseLog[];
  finisher?: FinisherExerciseLog[];
  main?: LoggedCompoundExercise[];
  sessionEnd: number;
}