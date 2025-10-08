import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modal = signal<{
    type: ModalType | undefined;
    anim: 'open' | 'close'
  }>({ type: undefined, anim: 'close' });

  public data = signal<CompoundExercise | undefined>(undefined);
  dataEffect = effect(() => {
    console.log({ data: this.data() })
  })

  exerciseId = signal<number | undefined>(undefined)

  openModal(modalType: ModalType, data?: CompoundExercise) {
    if (data) { this.exerciseId.set(data?.id) }
    this.modal.update(() => {
      return {
        type: modalType,
        anim: 'open'
      }
    });
  }

  getCurrentModal() {
    return this.modal
  }


  closeModal() {
    this.modal.update((prev) => {
      return {
        ...prev,
        anim: 'close'
      }
    });
    setTimeout(() => {
      this.modal.update((prev) => ({ ...prev, type: undefined }));
    }, 200);
  }
}