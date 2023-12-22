import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const Keys = {
  token: 'token',
} as const;

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  #router = inject(Router);

  public token$ = new BehaviorSubject<string | null>(this.#get(Keys.token));

  constructor() {
    this.token$.subscribe((token) => this.#set(Keys.token, token));
  }

  #get(key: keyof typeof Keys): string | null {
    return window.localStorage.getItem(key);
  }

  #set(key: keyof typeof Keys, value: string | null | undefined) {
    if (!value) {
      window.localStorage.removeItem(key);
      return this.#router.navigateByUrl('/login');
    }

    if (value === this.#get(key)) return;

    window.localStorage.setItem(key, value);
    return this.#router.navigateByUrl('/');
  }
}
