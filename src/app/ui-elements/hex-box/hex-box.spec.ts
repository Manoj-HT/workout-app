import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexBox } from './hex-box';
import { provideZonelessChangeDetection } from '@angular/core';

TestBed.configureTestingModule({
  providers: [provideZonelessChangeDetection()]
});

describe('HexBox', () => {
  let component: HexBox;
  let fixture: ComponentFixture<HexBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HexBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HexBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
