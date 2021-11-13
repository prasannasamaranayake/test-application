import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  public loggedInUser: Observable<User>;

  constructor(private router: Router) {
    const localStoredUser = localStorage.getItem('registeredUser');
    let registeredUser;
    if (localStoredUser) {
      registeredUser = JSON.parse(localStoredUser) as User;
      this.loggedInUserSubject = new BehaviorSubject<User>(registeredUser);
    }
    //this.loggedInUserSubject = new BehaviorSubject<User>(new User('JohnDoe', '123'));
    this.loggedInUser = this.loggedInUserSubject.asObservable();
  }

  public get loggedInUserName(): string {
    return this.loggedInUserSubject.value.username;
  }

  /**
   * Checks given user is locally stored and if success go to content view
   * @param user
   */
  public login(user: User): void {
    const localStoredUser = localStorage.getItem('registeredUser');
    let registeredUser;
    if (localStoredUser) {
      registeredUser = JSON.parse(localStoredUser) as User;
      if (registeredUser && registeredUser.username === user.username && registeredUser.password === user.password) {
        this.loggedInUserSubject = new BehaviorSubject<User>(registeredUser);
        void this.router.navigate(['content']);
      }
    }
  }

  /**
   * Register a given user in local storage
   * @param user
   */
  public register(user: User): void {
    localStorage.setItem('registeredUser', JSON.stringify(user));
  }
}
