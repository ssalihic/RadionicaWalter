import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { IAuthResponse } from '../../models/authentication.model';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';
  errors: {};

  constructor(private authenticationService: AuthenticationService,
              private authService: AuthService,
              private apiService: ApiService,
              private router: Router) {}

  login(): void {

    this.errors = undefined;
    this.authenticationService.login({
      email: this.email,
      password: this.password
    })
      .subscribe((response: IAuthResponse) => {

        this.authService.setToken(response.token);
        this.apiService.setToken();
        this.router.navigate(['/project']);
      }, (err: HttpErrorResponse) => {
        this.errors = err.error;
      });
  }
}
