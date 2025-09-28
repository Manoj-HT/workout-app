import { Component, inject } from '@angular/core';
import { ModalService } from '../modal-service/modal-service';
import { ExerciseLogService } from '../../services/exercise-log/exercise-log-service';
import { Router } from '@angular/router';
import { HexBox } from "../../ui-elements/hex-box/hex-box";

@Component({
  selector: 'config-modal',
  imports: [HexBox],
  templateUrl: './modal-component.html',
  styleUrl: './modal-component.scss'
})
export class ModalComponent {
  modalService = inject(ModalService)
  exerciselogService = inject(ExerciseLogService)
  sessionConfig = this.exerciselogService.sessionConfig
  modal = this.modalService.getCurrentModal()
  router = inject(Router)
  closeModal = this.modalService.closeModal

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

  routeToExerciseSection(type: ExerciseSectionType){
    switch(type){
      case 'Warm up': this.router.navigate(["/warm-up"]); break;
      case 'Finisher': this.router.navigate(["/finishers"]); break;
      case 'Main': this.router.navigate(["/compound-exercises"]); break;
    }
  }
}
