import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { authoredArticlesResolver } from './authored-articles.resolver';

describe('authoredArticlesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => authoredArticlesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
