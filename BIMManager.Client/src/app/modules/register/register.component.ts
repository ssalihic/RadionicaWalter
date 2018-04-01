import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email = '';
  password = '';
  confirmPassword = '';

  constructor(private http: HttpClient) {}

  register(): void {

    this.http.post<any>('http://localhost:5000/api/auth/register', {
      Email: this.email,
      Password: this.password,
      ConfirmPassword: this.confirmPassword
    })
      .subscribe((response: any) => console.log(response),
        (err: any) => console.error(err));
  }
}
