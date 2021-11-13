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
    this.loggedInUser = this.loggedInUserSubject.asObservable();
  }

  public get loggedInUserName(): string {
    return this.loggedInUserSubject.value.username;
  }

  /**
   * Checks given user is locally stored and if success go to content view
   * @param user
   * @param failCallBackFn - what to do if fails
   */
  public login(user: User, failCallBackFn: () => any): void {
    const localStoredUser = localStorage.getItem('registeredUser');
    let registeredUser;
    if (localStoredUser) {
      registeredUser = JSON.parse(localStoredUser) as User;
      if (registeredUser && registeredUser.username === user.username && registeredUser.password === user.password) {
        this.loggedInUserSubject = new BehaviorSubject<User>(registeredUser);
        void this.router.navigate(['content']);
      } else {
        failCallBackFn();
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

  /**
   * Remove logged user from auth service
   * @param user
   */
  public logout(): void {
    this.loggedInUserSubject = new BehaviorSubject<User>(new User());
    void this.router.navigate(['login']);
  }
}
