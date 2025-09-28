import { Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfigHeaderComponent } from './config-header-component/config-header-component';
import { Router, RouterOutlet } from '@angular/router';
import { ModalComponent } from './modal/modal-component/modal-component';
import { HexBox } from './ui-elements/hex-box/hex-box';
const imports = [ReactiveFormsModule, ConfigHeaderComponent, RouterOutlet, ModalComponent, HexBox]
@Component({
  selector: 'app-root',
  imports,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('workout-app');
  loadPage = signal(false)
  sessionStart(){
    this.loadPage.update(() => true)
  }
  // configType = signal<{
  //   dayType: DayType;
  //   place: PlaceType;
  //   exerciseSection: ExerciseSectionType
  // }>({
  //   dayType: "Select day",
  //   place: "Select place",
  //   exerciseSection: "Exercise type"
  // })
  // modal = signal<ModalType>(undefined)
  // modalAnimation = signal<'open' | 'close'>('open')
  // startDate = new Date().toLocaleString('en-US', {
  //   weekday: "short",   // "Wed"
  //   day: "numeric",     // "1"
  //   month: "short",     // "Jan"
  //   year: "numeric",    // "1990"
  //   hour: "2-digit",    // "06"
  //   minute: "2-digit",  // "30"
  //   hour12: true        // 12-hour format with AM/PM
  // })
  // exerciseList = signal<string[]>([
  //   'Overhead press',
  //   'Pushups',
  //   'Dips',
  //   'Dumbell curls'
  // ])
  // selectedExercise = signal("")
  // exerciseConfigForm = new FormGroup({
  //   rest: new FormControl(''),
  //   complete: new FormControl(''),
  //   sets: new FormControl(''),
  //   weights: new FormControl(''),
  //   reps: new FormControl('')
  // })
  // selectedExerciseList = signal<ExerciseConfig[]>([])
  // restTimepctLoader = viewChild<ElementRef>('restTimepctLoader')
  // completeExerciseTimepctLoader = viewChild<ElementRef>('completeExerciseTimepctLoader')
  // sessionLoader = viewChild<ElementRef>('sessionCompletepctLoader')
  // completedSets = 0

  // displayModal(type: ModalType) {
  //   this.modal.update(() => {
  //     this.toggleAnimation('enable')
  //     return type
  //   })
  // }

  // closeModal() {
  //   this.toggleAnimation('disable')
  //   setTimeout(() => {
  //     this.modal.update(() => undefined)
  //   }, 200);
  // }

  // toggleAnimation(toggle: 'enable' | 'disable') {
  //   if (toggle === 'enable') {
  //     this.modalAnimation.update(() => 'open')
  //     return;
  //   }
  //   this.modalAnimation.update(() => 'close')
  //   setTimeout(() => {
  //     this.modal.update((prev) => {
  //       return undefined
  //     })
  //   }, 190);
  // }

  // selectDay(e: Event) {
  //   const li = e.target as HTMLLIElement
  //   let dayTypeText = li.textContent as DayType
  //   if (li.textContent === 'Cancel') dayTypeText = "Select day"
  //   this.configType.update((prev) => ({ ...prev, dayType: dayTypeText }))
  //   console.log(this.configType());
  //   this.toggleAnimation('disable')
  // }

  // selectPlace(e: Event) {
  //   const li = e.target as HTMLLIElement
  //   let selectedPlaceText = li.textContent as PlaceType
  //   if (li.textContent === 'Cancel') selectedPlaceText = "Select place"
  //   this.configType.update((prev) => ({ ...prev, place: selectedPlaceText }))
  //   this.toggleAnimation('disable')
  // }

  // selectExerciseType(e: Event) {
  //   const li = e.target as HTMLLIElement
  //   let selectedExerciseSectionText = li.textContent as ExerciseSectionType
  //   if (li.textContent === 'Cancel') selectedExerciseSectionText = "Exercise type"
  //   this.configType.update((prev) => ({ ...prev, exerciseSection: selectedExerciseSectionText }))
  //   this.toggleAnimation('disable')
  // }

  // selectExercise(e: Event) {
  //   const li = e.target as HTMLLIElement
  //   this.selectedExercise.update((prev) => li.textContent)
  //   this.displayModal('exerciseSelector')
  // }

  // updateExercise(config: {
  //   key: keyof ExerciseConfig,
  //   value: string,
  //   index: number
  // }) {
  //   const { key, index, value } = config
  //   this.selectedExerciseList.update((prev) => {
  //     const newArr = [...prev]
  //     const updatingObj = newArr[index]
  //     if (key === 'reps' || key === 'weights') {
  //       if (updatingObj.sets !== undefined) {
  //         const arr = updatingObj[key]
  //         if (arr) {
  //           arr[updatingObj.sets - 1] = Number(value)
  //         }
  //       }
  //     }
  //     if (key === 'sets' || key == 'eccentric' || key === 'restBreath' || key === 'rest') {
  //       updatingObj[key] = Number(value)
  //     }
  //     return newArr
  //   })
  // }

  // updateSessionDuration() {
  //   //total 6 exercises; 6 * 3 = 18 sets; 1 super set = 2 sets; 
  //   console.log(this.selectedExerciseList().length);
  //   this.completedSets += this.selectedExerciseList().length
  //   const totalPct = (this.completedSets / 18) * 100
  //   this.loadingBar({
  //     type: 'session',
  //     duration: 1,
  //     targetPercent: totalPct
  //   })
  // }

  // completeSet() {
  //   this.selectedExerciseList.update((prev) => {
  //     const newArr = [...prev]
  //     newArr.forEach((ex) => {
  //       if (ex.sets) {
  //         ex.sets += 1
  //       }
  //     })
  //     if (newArr.length > 0) {
  //       this.loadingBar({
  //         type: 'rest',
  //         duration: newArr[0].rest
  //       })
  //     }
  //     return newArr
  //   })
  //   this.updateSessionDuration()
  // }

  // loadingBar(config: {
  //   type: 'rest' | 'complete' | 'session',
  //   duration: number,
  //   targetPercent?: number
  // }) {
  //   const { type, duration, targetPercent = 100 } = config
  //   const restTimeLoader = this.restTimepctLoader()?.nativeElement as HTMLDivElement
  //   const completeExerciseTimeLoader = this.completeExerciseTimepctLoader()?.nativeElement as HTMLDivElement
  //   const sessionDurationLoader = this.sessionLoader()?.nativeElement as HTMLDivElement
  //   const startTime = performance.now();
  //   let barFill: HTMLDivElement
  //   switch (type) {
  //     case 'complete': barFill = completeExerciseTimeLoader; break;
  //     case 'rest': barFill = restTimeLoader; break;
  //     case 'session': barFill = sessionDurationLoader; break;
  //     default: barFill = completeExerciseTimeLoader;
  //   }
  //   const startWidth = parseFloat(barFill.style.width) || 0;
  //   const endWidth = Math.min(targetPercent, 100);
  //   const update = (now: number) => {
  //     const elapsed = now - startTime;
  //     const progress = Math.min(elapsed / (duration * 1000), 1);
  //     const currentWidth = startWidth + (endWidth - startWidth) * progress;
  //     barFill.style.width = currentWidth + "%"
  //     if (progress < 1) {
  //       requestAnimationFrame(update);
  //     }
  //   }
  //   setTimeout(() => {
  //     if (restTimeLoader) restTimeLoader.style.width = '0'
  //   }, (duration * 1000) + 1000);
  //   requestAnimationFrame(update);
  // }

  // removeExercise(index: number) {
  //   this.selectedExerciseList.update((prev) => {
  //     const newArr = [...prev]
  //     newArr.splice(index, 1)
  //     return newArr
  //   })
  // }

  // completeExercise() {

  // }

  // completeConfiguration() {
  //   let exerciseConfig = this.exerciseConfigForm.value
  //   this.selectedExerciseList.update((prev) => {
  //     const newArr = [...prev]
  //     const newExercise: ExerciseConfig = {
  //       reps: exerciseConfig.reps?.split(",").map(rep => Number(rep.trim())),
  //       weights: exerciseConfig.weights?.split(",").map(rep => Number(rep.trim())),
  //       sets: Number(exerciseConfig.sets),
  //       rest: Number(exerciseConfig.rest),
  //       complete: Number(exerciseConfig.complete),
  //       title: this.selectedExercise(),
  //       restBreath: 0,
  //       eccentric: 0
  //     }
  //     newArr.push(newExercise)
  //     return newArr
  //   })
  //   this.toggleAnimation('disable')
  // }

  // closeConfiguration() {
  //   this.toggleAnimation('disable')
  // }
}


