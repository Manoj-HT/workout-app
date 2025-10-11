import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardioExercises } from './cardio-exercises';
import { provideZonelessChangeDetection } from '@angular/core';

TestBed.configureTestingModule({
  providers: [provideZonelessChangeDetection()]
});

describe('CardioExercises', () => {
  let component: CardioExercises;
  let fixture: ComponentFixture<CardioExercises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardioExercises]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardioExercises);
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
