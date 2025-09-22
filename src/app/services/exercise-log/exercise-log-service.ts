import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExerciseLogService {
  exerciseCount = signal<ExerrciseResponseLog>({} as unknown as ExerrciseResponseLog)
  totalExercises = 22
  exerciseConfig = signal<ExerciseConfig | undefined>(undefined)
  sessionConfig = signal<{
    dayType: DayType,
    place: PlaceType,
    exerciseSection: ExerciseSectionType
  }>({
    dayType: 'Select day',
    place: 'Select place',
    exerciseSection: 'Exercise type'
  })
  updateCountTo(newSet: ExerciseLog) {
    this.exerciseCount.update((prev) => {
      const newArr = [...prev.exercise]
      newArr.push(newSet)
      return {
        ...prev,
        exercise: newArr,
        count: newArr.length
      }
    })
  }
}
