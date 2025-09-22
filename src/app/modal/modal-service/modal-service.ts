import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modal = signal<{
    type: ModalType | undefined;
    anim: 'open' | 'close'
  }>({ type: undefined, anim: 'close' })
  private selectedOption = signal<PlaceType | DayType | ExerciseSectionType>(undefined)
  private modalAnimation = signal<'open' | 'close'>('open')

  openModal(modalType: ModalType) {
    this.modal.update((prev) => {
      return {
        type: modalType,
        anim: 'open'
      }
    })
  }

  getCurrentModal() {
    return this.modal
  }

  updateModalOption(option: PlaceType | DayType | ExerciseSectionType) {
    this.selectedOption.update(() => option)
  }

  selectedModalOption<T>() {
    this.selectedModalOption as T
  }

  closeModal() {
    this.modal.update((prev) => {
      return {
        ...prev,
        anim: 'close'
      }
    })
    setTimeout(() => {
      this.modal.update((prev) => ({ ...prev, type: undefined }))
    }, 200);
  }
}