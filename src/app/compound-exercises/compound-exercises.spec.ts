import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundExercises } from './compound-exercises';
import { provideZonelessChangeDetection } from '@angular/core';

TestBed.configureTestingModule({
  providers: [provideZonelessChangeDetection()]
});

describe('CompoundExercises', () => {
  let component: CompoundExercises;
  let fixture: ComponentFixture<CompoundExercises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundExercises]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoundExercises);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
