import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal-service';
import { provideZonelessChangeDetection } from '@angular/core';

TestBed.configureTestingModule({
  providers: [provideZonelessChangeDetection()]
});

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
