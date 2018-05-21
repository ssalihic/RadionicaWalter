import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard {

    constructor(private router: Router, private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this.authService.isAuthenticated()) {
            return true;
        } else {

            this.router.navigate(['/login']);
            return false;
        }
    }
}