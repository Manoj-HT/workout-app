import { Component, effect, ElementRef, inject, OnInit, output, signal, viewChild } from '@angular/core';
import { ExerciseLogService } from '../services/exercise-log/exercise-log-service';
import { ModalService } from '../modal/modal-service/modal-service';
import { AnimationService } from '../services/animation-service/animation-service';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-config-header',
  imports: [],
  templateUrl: './config-header-component.html',
  styleUrl: './config-header-component.scss'
})
export class ConfigHeaderComponent implements OnInit {
  sessionStart = output()
  startDate = signal("Start session")
  sessionCompletepctLoader = viewChild<ElementRef>('sessionCompletepctLoader')
  exerciseLogService = inject(ExerciseLogService)
  modalService = inject(ModalService)
  animationService = inject(AnimationService)
  router = inject(Router)
  exerciseLogEffect = effect(() => {
    this.updateAnimation();
  });

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe({
      next: (event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/') {
          this.animationService.animate({
            ref: this.sessionCompletepctLoader,
            duration: 2,
            pct: 0,
            autoReset: false
          });
          this.startDate.set("Start session")
        }
      }
    })
  }

  displayModal() {
    this.modalService.openModal('configSelection')
  }

  updateAnimation() {
    const count = this.exerciseLogService.exerciseCount()?.count;
    if (count === undefined) return;
    const totalExercises = this.exerciseLogService.totalExercises;
    const pct = Math.round((count / totalExercises) * 100);
    this.animationService.animate({
      ref: this.sessionCompletepctLoader,
      duration: 2,
      pct,
      autoReset: false
    });
  }

  startSession() {
    this.startDate.update(() => {
      this.sessionStart.emit();
      this.exerciseLogService.sessionData.update((prev) => {
        if (prev) {
          return { ...prev, sessionStart: Date.now() }
        }
        return prev
      });
      return new Date().toLocaleString('en-US', {
        weekday: "short",   // "Wed"
        day: "numeric",     // "1"
        month: "short",     // "Jan"
        year: "numeric",    // "1990"
        hour: "2-digit",    // "06"
        minute: "2-digit",  // "30"
        hour12: true        // 12-hour format with AM/PMif
      })
    })
  }
}
