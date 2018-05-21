import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  /**
   * Token status reactive variable.
   *
   * @type {EventEmitter<boolean>}
   */
  authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  /**
   * Set token in localStorage
   *
   * @param token
   * @returns {string}
   */
  setToken(token: string): string {

    // delete any jwt in local storage
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
    }

    // set token, save user and emit new auth status
    localStorage.setItem('jwt', token);
    this.authStatus.next(true);
    return token;
  }

  /**
   * Remove login data from localStorage
   */
  removeLoginData(): void {

    localStorage.clear();
  }

  /**
   * Retrieve token from localStorage
   * @returns {string}
   */
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  /**
   * Check if token is expired or exist.
   *
   * @returns {boolean}
   */
  isAuthenticated(): boolean {

    if (!this.getToken()) {
      this.authStatus.next(false);
      return false;
    }
    this.authStatus.next(true);
    return true;
  }
}
