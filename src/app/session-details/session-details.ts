import { Component, computed, effect, inject, signal } from '@angular/core';
import { ExerciseLogService } from '../services/exercise-log/exercise-log-service';
import { DatePipe } from '@angular/common';
import { Clipboard } from '@capacitor/clipboard';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-session-details',
  imports: [DatePipe],
  templateUrl: './session-details.html',
  styleUrl: './session-details.scss'
})
export class SessionDetails {
  exerciseLogService = inject(ExerciseLogService)
  tempVar = signal({
    sessionStart: 1696759200000, // Example timestamp (ms)

    warmup: [
      {
        id: 1,
        name: "Jump Rope",
        time: 300,
        exerciseStartTime: 1696759200000,
        exerciseEndTime: 1696759500000
      },
      {
        id: 2,
        name: "Treadmill Walk",
        time: 600,
        exerciseStartTime: 1696759500000,
        exerciseEndTime: 1696760100000
      },
      {
        id: 3,
        name: "Dynamic Stretching",
        time: 480,
        exerciseStartTime: 1696760100000,
        exerciseEndTime: 1696760580000
      }
    ],

    main: [
      {
        id: 101,
        name: "Bench Press",
        sets: 3,
        restBetweenSets: 120,
        restAfterExercise: 180,
        weights: [30, 35, 40],
        eccentricControl: 2,
        breathControl: 1,
        rpe: 8,
        repsPerSet: [10, 8, 6],
        exerciseStartTime: 1696760700000,
        exerciseEndTime: 1696761600000,
        setTimestamps: [
          1696760700000,
          1696760940000,
          1696761180000
        ]
      },
      {
        id: 102,
        name: "Squats",
        sets: 4,
        restBetweenSets: 150,
        restAfterExercise: 180,
        weights: [60, 70, 70, 75],
        eccentricControl: 3,
        breathControl: 2,
        rpe: 9,
        repsPerSet: [12, 10, 8, 6],
        exerciseStartTime: 1696761600000,
        exerciseEndTime: 1696762800000,
        setTimestamps: [
          1696761600000,
          1696761900000,
          1696762200000,
          1696762500000
        ]
      },
      {
        id: 103,
        name: "Overhead Press",
        sets: 3,
        restBetweenSets: 120,
        restAfterExercise: 150,
        weights: [20, 25, 25],
        eccentricControl: 2,
        breathControl: 1,
        rpe: 7,
        repsPerSet: [12, 10, 8],
        exerciseStartTime: 1696762800000,
        exerciseEndTime: 1696763700000,
        setTimestamps: [
          1696762800000,
          1696763060000,
          1696763320000
        ]
      }
    ],

    finisher: [
      {
        id: 201,
        name: "Burpees",
        time: 180,
        exerciseStartTime: 1696763700000,
        exerciseEndTime: 1696763880000
      },
      {
        id: 202,
        name: "Battle Ropes",
        time: 120,
        exerciseStartTime: 1696763880000,
        exerciseEndTime: 1696764000000
      },
      {
        id: 203,
        name: "Assault Bike",
        time: 240,
        exerciseStartTime: 1696764000000,
        exerciseEndTime: 1696764240000
      }
    ],

    sessionEnd: 1696764300000
  });
  sessionData = this.exerciseLogService.sessionData

  async copyAndReset() {
    await Clipboard.write({
      string: JSON.stringify(this.sessionData())
    })
    App.exitApp()
  }
}
