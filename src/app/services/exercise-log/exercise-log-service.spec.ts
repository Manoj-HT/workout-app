import { TestBed } from '@angular/core/testing';

import { ExerciseLogService } from './exercise-log-service';

describe('ExerciseLogService', () => {
  let service: ExerciseLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
