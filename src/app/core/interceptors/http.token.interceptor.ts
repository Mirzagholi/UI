import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEventType } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { Global } from '../app-global';

import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
    tokenName = 'Authorization';

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        
        let router: Router = Global.Injector.get(Router);
        let authService: AuthenticationService = Global.Injector.get(AuthenticationService);

        req = this.addAccessToken(req, authService.getAccessToken());

        Global.ShowWatingDialog = true;

        return next.handle(req).pipe(
            map(event => {
                switch (event.type) {
                    case HttpEventType.Response: {
                        Global.ShowWatingDialog = false;
                    }
                }
                return event;
            }),
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    // router.navigate(['error'], { queryParams: { code: error.status } });
                    if (error.status === 401 || error.status === 403) {
                        router.navigate(['login']);
                    }
                }

                return throwError(error);
            })
        );
    }

    private addAccessToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${token}`
                }
            });
        }
        return request;
    }

    private getErrorDescription(code: number): string {
        switch (code) {
            case 400: {
                return 'درخواست صحیح نمی باشد و قابل پردازش نیست';
            }
            case 401: {
                return 'دوباره وارد سیستم شوید';
            }
            case 403: {
                return 'اجرای درخواست مورد نظر برای شما امکان ندارد';
            }
            case 404: {
                return 'درخواست مورد نظر وجود ندارد';
            }
            case 405: {
                return 'متد استفاده شده برای درخواست مجاز نیست';
            }
            case 500: {
                return 'عملیات با خطا مواجه شد';
                // return 'خطا سمت سرور رخ داده است';
            }
            default: {
                return 'خطای ناشناس، امکان ارتباط با سرور وجود ندارد';
            }
        }
    }
}
