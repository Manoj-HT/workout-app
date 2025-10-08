import { Component, inject, OnInit } from '@angular/core';
import { ModalService } from '../modal-service/modal-service';
import { ExerciseLogService } from '../../services/exercise-log/exercise-log-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { COMPOUND_EXERCISES } from '../../compound-exercises/compound-exercises.data';

@Component({
  selector: 'app-config-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-component.html',
  styleUrl: './modal-component.scss'
})
export class ModalComponent implements OnInit {
  modalService = inject(ModalService)
  exerciselogService = inject(ExerciseLogService)
  sessionConfig = this.exerciselogService.sessionConfig
  modal = this.modalService.getCurrentModal()
  modalData = this.modalService.data;
  router = inject(Router)
  fb = inject(FormBuilder)

  exerciseConfigForm!: FormGroup;

  ngOnInit(): void {
    this.exerciseConfigForm = this.fb.group({
      rest: ['', Validators.required],
      complete: ['', Validators.required],
      sets: ['', Validators.required],
      weights: [''],
      reps: ['']
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

  done() {
    if (this.exerciseConfigForm.valid) {
      const formValues = this.exerciseConfigForm.value;
      const weights = this.stringToNumberArray(formValues.weights);
      const reps = this.stringToNumberArray(formValues.reps);
      const sets = Number(formValues.sets);

      if (weights.length !== sets || reps.length !== sets) {
        return;
      }
      const exerciseID = this.modalService.exerciseId()
      const exerciseObject = COMPOUND_EXERCISES.find((exercise) => exercise.id === exerciseID)
      if (exerciseObject) {
        const newExercise: CompoundExercise = {
          ...exerciseObject,
          sets: sets,
          repsPerSet: reps,
          weights: weights,
          restBetweenSets: Number(formValues.rest),
          restAfterExercise: Number(formValues.complete)
        };
        console.log(newExercise)
        this.modalService.data.update(() => newExercise);
        this.closeModal();
      }

    }
  }

  private stringToNumberArray(str: string): number[] {
    if (!str) return [];
    return str.split(',').map(s => Number(s.trim()));
  }

  selectOption(e: Event, type: ModalType) {
    const li = e.target as HTMLLIElement
    const option = li.textContent as PlaceType | DayType | ExerciseSectionType
    this.sessionConfig.update((prev) => {
      let newVal!: typeof prev
      switch (type) {
        case 'dayType': newVal = {
          ...prev,
          dayType: option as DayType
        }; break;
        case 'place': newVal = {
          ...prev,
          place: option as PlaceType
        }; break;
        case 'exerciseType': newVal = {
          ...prev,
          exerciseSection: option as ExerciseSectionType
        };
          this.routeToExerciseSection(option as ExerciseSectionType);
          break;
      }
      return newVal
    })
    this.openModal('configSelection')
  }

  openModal(modalType: ModalType) {
    this.modalService.openModal(modalType)
  }

  routeToExerciseSection(type: ExerciseSectionType) {
    switch (type) {
      case 'Warm up': this.router.navigate(["/warm-up"]); break;
      case 'Finisher': this.router.navigate(["/finishers"]); break;
      case 'Main': this.router.navigate(["/compound-exercises"]); break;
    }
  }

  endSession() {
    this.exerciselogService.sessionData.update((prev) => {
      if (prev) {
        return {
          ...prev,
          sessionEnd: Date.now()
        }
      }
      return prev
    })
    this.router.navigate(['/session-details'])
    this.closeModal();
  }
}