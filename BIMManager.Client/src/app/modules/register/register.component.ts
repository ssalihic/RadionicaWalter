import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { IAuthResponse } from '../../models/authentication.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authenticationService: AuthenticationService,
              private authService: AuthService,
              private apiService: ApiService,
              private router: Router) {}

  register(): void {

    this.authenticationService.register({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    })
      .subscribe((response: IAuthResponse) => {

        this.authService.setToken(response.token);
        this.apiService.setToken();
        this.router.navigate(['/project']);
      });
  }
}
