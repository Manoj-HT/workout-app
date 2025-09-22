import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinisherExercises } from './finisher-exercises';

describe('FinisherExercises', () => {
  let component: FinisherExercises;
  let fixture: ComponentFixture<FinisherExercises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinisherExercises]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinisherExercises);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
