import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IAuthResponse, ILoginRequest, IRegisterRequest } from '../models/authentication.model';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private authService: AuthService) {}

  login(request: ILoginRequest): Observable<IAuthResponse> {

    return this.http.post<any>( this.apiService.baseUrl + 'auth/login', {
      email: request.email,
      password: request.password
    });
  }

  register(request: IRegisterRequest): Observable<IAuthResponse> {

    return this.http.post<any>( this.apiService.baseUrl + 'auth/register', {
      email: request.email,
      password: request.password,
      confirmPassword: request.confirmPassword
    });
  }

  logout(): void {
    this.authService.removeLoginData();
    location.reload();
  }
}
