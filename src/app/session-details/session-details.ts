import { Component, effect, inject } from '@angular/core';
import { ExerciseLogService } from '../services/exercise-log/exercise-log-service';

@Component({
  selector: 'app-session-details',
  imports: [],
  templateUrl: './session-details.html',
  styleUrl: './session-details.scss'
})
export class SessionDetails {
  exerciseLogService = inject(ExerciseLogService)
  sessionData = this.exerciseLogService.sessionData
  sessionDataEffect = effect(() => {
    console.log(this.sessionData())
  })
}
