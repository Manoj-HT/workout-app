import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ExerciseLogService } from '../services/exercise-log/exercise-log-service';
import { CARDIO_EXERCISES } from './cardio-exercises.data';
import { AnimationService } from '../services/animation-service/animation-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardio-exercises',
  imports: [],
  templateUrl: './cardio-exercises.html',
  styleUrl: './cardio-exercises.scss'
})
export class CardioExercises {
  exerciselogService = inject(ExerciseLogService);
  animationService = inject(AnimationService);
  router = inject(Router);
  exercises = CARDIO_EXERCISES;
  selectedExercise = signal<CardioExercise | undefined>(undefined);
  exerciseInProgress = signal(false);
  searchTerm = signal('');
  loadingBar = viewChild<ElementRef>('loadingBar');

  filteredExercises = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.exercises.filter(exercise =>
      exercise.name.toLowerCase().includes(term)
    );
  });

  title = computed(() => {
    const selected = this.selectedExercise();
    if (!selected) {
      return 'No exercises selected';
    }
    return selected.name;
  });

  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  toggleExercise(exercise: CardioExercise) {
    this.resetLoadingBar();
    this.exerciseInProgress.set(false);
    this.selectedExercise.update(currentSelected => {
      if (currentSelected?.id === exercise.id) {
        return undefined; // Deselect if already selected
      } else {
        return exercise; // Select the new exercise
      }
    });
    this.exerciselogService.sessionConfig.update(config => ({
      ...config,
      exercises: this.selectedExercise() ? [this.selectedExercise() as CardioExercise] : []
    }));
  }

  startOrStopExercise() {
    const currentRoute = this.router.url;

    if (this.exerciseInProgress()) {
      // Stop
      this.resetLoadingBar();
      const exercise = this.selectedExercise();
      if (exercise) {
        const newSet: ExerciseLog = {
          title: exercise.name,
          sets: 1, // for cardio, it's just one "set"
          time: exercise.time
        };
        this.exerciselogService.updateCountTo([newSet]);

        if (currentRoute.includes('/warm-up')) {
          this.exerciselogService.updateLastWarmupExercise(Date.now());
        } else if (currentRoute.includes('/finishers')) {
          this.exerciselogService.updateLastFinisherExercise(Date.now());
        }
      }
      this.selectedExercise.set(undefined);
      this.exerciseInProgress.set(false);
    } else {
      // Start
      this.exerciseInProgress.set(true);
      const exercise = this.selectedExercise();
      if (exercise) {
        const exerciseLog: WarmupExerciseLog | FinisherExerciseLog = { ...exercise, exerciseStartTime: Date.now() };

        if (currentRoute.includes('/warm-up')) {
          this.exerciselogService.addWarmupExercise(exerciseLog as WarmupExerciseLog);
        } else if (currentRoute.includes('/finishers')) {
          this.exerciselogService.addFinisherExercise(exerciseLog as FinisherExerciseLog);
        }

        this.animationService.animate({
          ref: this.loadingBar,
          duration: exercise.time,
          pct: 100
        });
      }
    }
  }

  resetLoadingBar() {
    const loadingBarEl = this.loadingBar()?.nativeElement;
    if (loadingBarEl) {
      loadingBarEl.style.width = '0%';
    }
  }
}