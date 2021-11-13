import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUserSubject: BehaviorSubject<User>;
  public loggedInUser: Observable<User>;

  constructor() {
    // this.loggedInUserSubject = new BehaviorSubject<User>(new User());
    this.loggedInUserSubject = new BehaviorSubject<User>(new User('JohnDoe', '123'));
    this.loggedInUser = this.loggedInUserSubject.asObservable();
  }

  public get loggedInUserName(): string {
    return this.loggedInUserSubject.value.username;
  }
}
