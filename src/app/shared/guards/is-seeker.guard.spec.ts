import { TestBed } from '@angular/core/testing';

import { IsSeekerGuard } from './is-seeker.guard';

describe('IsSeekerGuard', () => {
  let guard: IsSeekerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsSeekerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
