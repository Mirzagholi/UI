import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, } from '@angular/router';

import { Observable } from 'rxjs';

import {AuthenticationService } from '../authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.checkIsLogin()) {
            return true;
        } else {
            this.authService.logout();
            return false;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (route.url.length > 0) {
            return this.checkIsLogin(route.url[0].path);
        } else {
            return new Observable<boolean>(observer => {
                observer.next(true);
            });
        }
    }

    checkIsLogin(url): Observable<boolean> {
        return new Observable<boolean>(observer => {
            observer.next(this.authService.checkIsLogin());
            // this.authService.hasPermission(url).subscribe(
            //     hasPermission => {
            //         if (hasPermission) {
            //             observer.next(true);
            //         }
            //     }, () => {
            //         observer.next(false);
            //         this.router.navigate(['/error', 403]);
            //     }
            // );
        });
    }
}
