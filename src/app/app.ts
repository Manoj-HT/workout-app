import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('workout-app');
  dayType = signal<DayType>("Select day")
  place = signal<PlaceType>('Place')
  modal = signal<ModalType>(undefined)
  modalAnimation = signal<'open' | 'close'>('open')
  startDate = new Date().toLocaleString('en-US', {
    weekday: "short",   // "Wed"
    day: "numeric",     // "1"
    month: "short",     // "Jan"
    year: "numeric",    // "1990"
    hour: "2-digit",    // "06"
    minute: "2-digit",  // "30"
    hour12: true        // 12-hour format with AM/PM
  })
  exerciseList = signal<string[]>([
    'Overhead press',
    'Pushups',
    'Dips',
    'Dumbell curls'
  ])
  selectedExercise = signal<ExerciseType>({
    title: "",
    rest: 0,
    complete: 0,
    sets: 0,
    weights: [0,0,0],
    reps: [0, 0, 0],
  })
  exerciseConfigForm = new FormGroup({
    rest: new FormControl(''),
    complete: new FormControl(''),
    sets: new FormControl(''),
    weights: new FormControl(''),
    reps: new FormControl('')
  })
  selectedExerciseList = signal<ExerciseType[]>([])

  enableModal(type: ModalType) {
    this.modal.update(() => {
      this.toggleAnimation('enable')
      return type
    })
  }

  toggleAnimation(toggle: 'enable' | 'disable') {
    if (toggle === 'enable') {
      this.modalAnimation.update(() => 'open')
      return;
    }
    this.modalAnimation.update(() => 'close')
    setTimeout(() => {
      this.modal.update((prev) => {
        return undefined
      })
    }, 190);
  }

  selectDay(e: Event) {
    const li = e.target as HTMLLIElement
    let dayTypeText = li.textContent as DayType
    if (li.textContent === 'Cancel') dayTypeText = "Select day"
    this.dayType.update(() => dayTypeText)
    this.toggleAnimation('disable')
  }

  selectPlace(e: Event) {
    const li = e.target as HTMLLIElement
    let selectedPlaceText = li.textContent as PlaceType
    if (li.textContent === 'Cancel') selectedPlaceText = "Place"
    this.place.update(() => selectedPlaceText)
    this.toggleAnimation('disable')
  }

  selectExercise(e: Event) {
    const li = e.target as HTMLLIElement
    this.selectedExercise.update((prev) => {
      return {
        ...prev,
        title: li.textContent
      }
    })
    this.modal.update(() => 'exerciseSelector')
    this.toggleAnimation('enable')
  }

  completeConfiguration() {
    console.log(this.exerciseConfigForm.value)
    let exerciseConfig = this.exerciseConfigForm.value
    
    this.selectedExercise.update((prev) => {
      return {
        ...prev,
        reps: exerciseConfig.reps?.split(",").map(rep => Number(rep.trim())),
        weights: exerciseConfig.weights?.split(",").map(rep => Number(rep.trim())),
        sets: Number(exerciseConfig.sets),
        rest: Number(exerciseConfig.rest),
        complete: Number(exerciseConfig.complete)
      }
    })
    this.toggleAnimation('disable')
  }

  closeConfiguration() {
    this.toggleAnimation('disable')
  }
}

type ModalType = 'dayType' | 'place' | 'exerciseSelector' | undefined
type DayType = 'Full body' | 'Push day' | 'Pull day' | 'Leg + core day' | 'Select day'
type PlaceType = 'Home' | 'Gym' | 'Place' | undefined
type ExerciseType = {
  title: string
  rest: number,
  complete: number,
  sets: number | undefined,
  weights: number[] | undefined,
  reps: number[] | undefined,
}