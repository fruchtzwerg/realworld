import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { articlesResolver } from './articles.resolver';

describe('articlesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => articlesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
