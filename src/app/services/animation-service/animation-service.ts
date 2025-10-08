import { ElementRef, Injectable, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  animate(config: {
    ref: Signal<ElementRef<HTMLElement> | undefined>,
    duration: number,
    pct: number,
    autoReset?: boolean
  }) {
    const { ref, duration, pct, autoReset = true } = config;
    const elementRef = ref();
    if (!elementRef) return;

    const element = elementRef.nativeElement;
    const targetWidth = pct;
    const startWidth = parseFloat(element.style.width) || 0;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const currentWidth = startWidth + (targetWidth - startWidth) * progress;
      element.style.width = currentWidth + "%";
      if (progress < 1) {
        requestAnimationFrame(update);
      } else if (autoReset) {
        setTimeout(() => {
          element.style.width = "0%";
        }, 2000);
      }
    };

    requestAnimationFrame(update);
  }
}
