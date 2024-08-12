import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  email: string;
  password: string;
  name: string;
}

export interface Login {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.user_url;

  constructor(private http: HttpClient) {}

  saveUserData(userInput: User): Observable<{ message: string; data: User }> {
    return this.http.post<{ message: string; data: User }>(
      `${this.url}/signup`,
      userInput
    );
  }

  verifyUser(loginInput: Login): Observable<{ message: string; data: Object }> {
    return this.http.post<{ message: string; data: Object }>(
      `${this.url}/login`,
      loginInput
    );
  }
}
