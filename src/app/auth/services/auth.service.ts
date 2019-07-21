import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserCredentials } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserValidation } from '../../mock-api/models/api-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) { }

  user$: BehaviorSubject<User> = new BehaviorSubject(null);
  isLoggedIn$ = this.user$.asObservable();

  login({ username, password }: UserCredentials): Observable<User> {
    // we need to cast the result that we expect the API call to return
    return this.http.post(environment.api.login, { username, password }) as Observable<User>;
  }

  validateUsername({ username }: User): Observable<UserValidation> {
    return this.http.post(environment.api.validateUsername, { username }) as Observable<UserValidation>;
  }

  logout() {
    this.user$.next(null);
  }
}
