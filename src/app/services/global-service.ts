import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GlobalService {

  private loginState = new BehaviorSubject(false);
  currentLoginState = this.loginState.asObservable();

  constructor() { }

  changeLoginState(state: boolean) {
    this.loginState.next(state)
  }

}