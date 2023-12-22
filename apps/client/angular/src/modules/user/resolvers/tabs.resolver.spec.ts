import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tabsResolver } from './tabs.resolver';

describe('tabsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => tabsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
