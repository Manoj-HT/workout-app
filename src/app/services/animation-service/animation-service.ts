import { ElementRef, Injectable, Signal, viewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  animate(
    config: {
      ref: Signal<ElementRef<any> | undefined>,
      duration: number,
      pct: number
    }) {

  }
}
