import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modal = signal<{
    type: ModalType | undefined;
    anim: 'open' | 'close'
  }>({ type: undefined, anim: 'close' })

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