import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {BASE_API, FIND, LOGIN, NEW_PASSWORD, RESET} from '../_globals/vars';
import {UserModel} from '../_models/user.model';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUser: Observable<UserModel>;
  private currentUserSubject: BehaviorSubject<UserModel>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(BASE_API + LOGIN, {email, password})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  updateUserInformation(user) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.currentUser = user;
    console.log(currentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.currentUserSubject.next(currentUser);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/login');

  }

  sendEmail(email: string) {
    return this.http.post<any>(BASE_API + RESET, {email});
  }

  verifToken(token: string) {
    return this.http.get<any>(BASE_API + FIND + '/' + token);
  }

  reset(e: string, p: string, r: string, t: string) {
    return this.http.post<any>(BASE_API + NEW_PASSWORD, {
      email: e,
      password: p,
      password_confirmation: r,
      token: t
    });
  }
}
