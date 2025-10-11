import { Component, computed, ElementRef, inject, signal, viewChild, effect } from '@angular/core';
import { COMPOUND_EXERCISES } from './compound-exercises.data';
import { FormsModule } from '@angular/forms';
import { ExerciseLogService } from '../services/exercise-log/exercise-log-service';
import { ModalService } from '../modal/modal-service/modal-service';
import { AnimationService } from '../services/animation-service/animation-service';

@Component({
  selector: 'app-compound-exercises',
  imports: [FormsModule],
  templateUrl: './compound-exercises.html',
  styleUrl: './compound-exercises.scss',
})
export class CompoundExercises {
  exercises = COMPOUND_EXERCISES;
  modalService = inject(ModalService);
  exerciseLogService = inject(ExerciseLogService);
  animationService = inject(AnimationService);
  searchTerm = signal('');
  progressBar = viewChild<ElementRef>('progressBar');

  currentCompoundExercises = signal<CompoundExercise[]>([]);
  exerciseStartTime = signal<number | undefined>(undefined);
  setTimestamps = signal<number[]>([]);
  constructor() {
    effect(() => {
      const selectedExercise = this.modalService.data();
      if (selectedExercise) {
        this.currentCompoundExercises.update((exercises) => {
          this.exerciseStartTime.update(() => Date.now());
          this.timer.set(
            selectedExercise.sets == 1
              ? selectedExercise.restAfterExercise
              : selectedExercise.restBetweenSets,
          );
          return [...exercises, selectedExercise];
        });
      }
    });
  }

  filteredExercises = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.exercises.filter((exercise) => exercise.name.toLowerCase().includes(term));
  });

  currentSetIndex = signal(0);
  hasMoreSets = computed(() => {
    const exercises = this.currentCompoundExercises();
    if (exercises.length === 0) {
      return false;
    }
    return this.currentSetIndex() < exercises[0].sets - 1;
  });

  selectExercise(exercise: CompoundExercise) {
    // this.modalService.data.update(() => exercise)
    this.modalService.openModal('exerciseSelector', exercise);
  }

  timer = signal(0);
  initiateTimer() {
    const interval = setInterval(() => {
      this.timer.update((prev) => {
        if (prev == 0) {
          clearInterval(interval);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
  }

  nextSet() {
    this.resetProgressBar();
    this.setTimestamps.update((timestamps) => [...timestamps, Date.now()]); // Capture set completion timestamp

    const exercises = this.currentCompoundExercises(); // Use currentCompoundExercises
    if (exercises.length > 0) {
      const newSets: ExerciseLog[] = exercises.map((exercise) => ({
        title: exercise.name,
        sets: 1,
        time: 0,
      }));
      this.exerciseLogService.updateCountTo(newSets);
      this.timer.set(exercises[0].restBetweenSets);
      this.initiateTimer();
      this.animationService.animate({
        ref: this.progressBar,
        duration: exercises[0].restBetweenSets, // Assuming restBetweenSets is consistent for superset
        pct: 100,
      });
    }
    this.currentSetIndex.update((index) => index + 1);
  }

  completeExercise() {
    this.resetProgressBar();
    const exerciseEndTime = Date.now(); // Capture exercise completion timestamp

    const exercises = this.currentCompoundExercises(); // Use currentCompoundExercises
    if (exercises.length > 0) {
      const restTime = exercises[0].restAfterExercise;
      this.timer.set(restTime);
      this.initiateTimer();
      this.animationService.animate({
        ref: this.progressBar,
        duration: restTime,
        pct: 100,
      });

      // Log each exercise in the superset
      exercises.forEach((exercise) => {
        const loggedExercise: LoggedCompoundExercise = {
          ...exercise,
          exerciseStartTime: this.exerciseStartTime()!,
          exerciseEndTime: exerciseEndTime,
          setTimestamps: this.setTimestamps(),
        };
        this.exerciseLogService.addLoggedCompoundExercise(loggedExercise);
      });

      // Reset component state
      setTimeout(
        () => {
          this.currentCompoundExercises.set([]);
          this.exerciseStartTime.set(undefined);
          this.setTimestamps.set([]);
          this.currentSetIndex.set(0);
        },
        (restTime + 2) * 1000,
      );
    } else {
      // If no exercises, just reset state
      this.currentCompoundExercises.set([]);
      this.exerciseStartTime.set(undefined);
      this.setTimestamps.set([]);
      this.currentSetIndex.set(0);
    }
  }

  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  resetProgressBar() {
    const progressBarEl = this.progressBar()?.nativeElement;
    if (progressBarEl) {
      progressBarEl.style.width = '0%';
    }
  }
}
