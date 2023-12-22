import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { feedResolver } from './feed.resolver';

describe('feedResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => feedResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
