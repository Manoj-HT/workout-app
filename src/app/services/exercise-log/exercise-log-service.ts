import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExerciseLogService {
  exerciseCount = signal<ExerrciseResponseLog>({ startTime: Date.now(), count: 0, exercise: [] });
  totalExercises = 22
  exerciseConfig = signal<ExerciseConfig | undefined>(undefined)
  configuredExercises = signal<ConfiguredExercise[]>([]);
  sessionData = signal<SessionData | undefined>({
    sessionEnd: 0,
    sessionStart: 0,
    warmup: [],
    finisher: [],
    main: []
  });
  sessionConfig = signal<{
    dayType: DayType,
    place: PlaceType,
    exerciseSection: ExerciseSectionType,
    exercises: CardioExercise[]
  }>({
    dayType: 'Select day',
    place: 'Select place',
    exerciseSection: 'Exercise type',
    exercises: []
  })

  sessionDataEffect = effect(() => {
    console.log(this.sessionData())
  })

  updateCountTo(newSets: ExerciseLog[]) {
    this.exerciseCount.update((prev) => {
      const newArr = [...prev.exercise, ...newSets];
      return {
        ...prev,
        exercise: newArr,
        count: prev.count + newSets.length
      }
    })
  }

  addWarmupExercise(exercise: WarmupExerciseLog) {
    this.sessionData.update(data => {
      if (!data) return data;
      const warmup = data.warmup ? [...data.warmup, exercise] : [exercise];
      return { ...data, warmup };
    });
  }

  updateLastWarmupExercise(endTime: number) {
    this.sessionData.update(data => {
      if (!data || !data.warmup || data.warmup.length === 0) return data;
      const lastExercise = { ...data.warmup[data.warmup.length - 1], exerciseEndTime: endTime };
      const warmup = [...data.warmup.slice(0, -1), lastExercise];
      return { ...data, warmup };
    });
  }

  addFinisherExercise(exercise: FinisherExerciseLog) {
    this.sessionData.update(data => {
      if (!data) return data;
      const finisher = data.finisher ? [...data.finisher, exercise] : [exercise];
      return { ...data, finisher };
    });
  }

  updateLastFinisherExercise(endTime: number) {
    this.sessionData.update(data => {
      if (!data || !data.finisher || data.finisher.length === 0) return data;
      const lastExercise = { ...data.finisher[data.finisher.length - 1], exerciseEndTime: endTime };
      const finisher = [...data.finisher.slice(0, -1), lastExercise];
      return { ...data, finisher };
    });
  }

  addLoggedCompoundExercise(loggedExercise: LoggedCompoundExercise) {
    this.sessionData.update(data => {
      if (!data) return data;
      const main = data.main ? [...data.main, loggedExercise] : [loggedExercise];
      return { ...data, main };
    });
  }
}
