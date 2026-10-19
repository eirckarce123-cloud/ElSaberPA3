import { TestBed } from '@angular/core/testing';
import { Editorial } from './editorial';

describe('Editorial', () => {
  let service: Editorial;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Editorial);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
