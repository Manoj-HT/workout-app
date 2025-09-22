import { Component, inject } from '@angular/core';
import { ModalService } from '../modal-service/modal-service';
import { ExerciseLogService } from '../../services/exercise-log/exercise-log-service';

@Component({
  selector: 'config-modal',
  imports: [],
  templateUrl: './modal-component.html',
  styleUrl: './modal-component.scss'
})
export class ModalComponent {
  modalService = inject(ModalService)
  exerciselogService = inject(ExerciseLogService)
  sessionConfig = this.exerciselogService.sessionConfig
  modal = this.modalService.getCurrentModal()
  closeModal = this.modalService.closeModal
  selectOption(e: Event, type: ModalType){
    const li = e.target as HTMLLIElement
    const option  = li.textContent as PlaceType | DayType | ExerciseSectionType
    this.modalService.updateModalOption(option)
    this.closeModal()
  }

  openModal(modalType: ModalType){
    // this.closeModal()
    this.modalService.openModal(modalType)
  }
}
