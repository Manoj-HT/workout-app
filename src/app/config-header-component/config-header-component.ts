import { Component, computed, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { ExerciseLogService } from '../services/exercise-log/exercise-log-service';
import { ModalService } from '../modal/modal-service/modal-service';
import { AnimationService } from '../services/animation-service/animation-service';

@Component({
  selector: 'config-header-component',
  imports: [],
  templateUrl: './config-header-component.html',
  styleUrl: './config-header-component.scss'
})
export class ConfigHeaderComponent {
  startDate = new Date().toLocaleString('en-US', {
    weekday: "short",   // "Wed"
    day: "numeric",     // "1"
    month: "short",     // "Jan"
    year: "numeric",    // "1990"
    hour: "2-digit",    // "06"
    minute: "2-digit",  // "30"
    hour12: true        // 12-hour format with AM/PM
  })
  sessionCompletepctLoader = viewChild<ElementRef>('sessionCompletepctLoader')
  exerciseLogService = inject(ExerciseLogService)
  modalService = inject(ModalService)
  animationService = inject(AnimationService)
  exerciseLogEffect = effect(() => this.updateAnimation)

  displayModal() {
    this.modalService.openModal('configSelection')
  }

  updateAnimation() {
    const count = this.exerciseLogService?.exerciseCount()?.count
    const totalExercises = this.exerciseLogService.totalExercises
    const pct = Math.round((count / totalExercises) * 100)
    this.animationService.animate({
      ref: this.sessionCompletepctLoader,
      duration: 2,
      pct,
    })
  }
}
