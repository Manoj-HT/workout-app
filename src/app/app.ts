import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigHeaderComponent } from './config-header-component/config-header-component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ModalComponent } from './modal/modal-component/modal-component';
import { filter } from 'rxjs';
import { ExerciseLogService } from './services/exercise-log/exercise-log-service';

const imports = [ReactiveFormsModule, ConfigHeaderComponent, RouterOutlet, ModalComponent]
@Component({
  selector: 'app-root',
  imports,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('workout-app');
  loadPage = signal(false)
  router = inject(Router)
  exerciseLogService = inject(ExerciseLogService)

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      let exerciseSection: ExerciseSectionType = 'Exercise type';
      if (event.urlAfterRedirects.includes('/warm-up')) {
        exerciseSection = 'Warm up';
      } else if (event.urlAfterRedirects.includes('/compound-exercises')) {
        exerciseSection = 'Main';
      } else if (event.urlAfterRedirects.includes('/finishers')) {
        exerciseSection = 'Finisher';
      }
      this.exerciseLogService.sessionConfig.update(config => ({
        ...config,
        exerciseSection: exerciseSection
      }));
    });
  }

  sessionStart(){
    this.loadPage.update(() => true)
    this.router.navigate(['/warm-up']);
  }}