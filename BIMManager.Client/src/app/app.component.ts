import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(public authService: AuthService,
              private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.authStatus.next(this.authService.isAuthenticated());
  }

  logOut(): void {
    this.authenticationService.logout();
  }
}
