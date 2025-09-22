import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarmupExercises } from './warmup-exercises';

describe('WarmupExercises', () => {
  let component: WarmupExercises;
  let fixture: ComponentFixture<WarmupExercises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarmupExercises]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarmupExercises);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
