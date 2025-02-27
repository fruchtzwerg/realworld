import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { favoriteArticlesResolver } from './favorite-articles.resolver';

describe('favoriteArticlesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => favoriteArticlesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
