import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorDialogService } from 'app/shared/error-dialog/errordialog.service';
import { Router } from '@angular/router';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    baseUrl = environment.apiUrl;
   
    constructor(
                public errorDialogService: ErrorDialogService,
                private _route: Router,
                ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('request', request.headers.get('Authorization'));
        let byPassToken = '';
        let url = this.baseUrl;

        if(request.url.startsWith('http'))
            url = request.url
        else url = url += request.url

        byPassToken = request.headers.get('Authorization');
        if(byPassToken ){
            request = request.clone({
                url: url,
                setHeaders: {
                    Authorization: byPassToken,
                }
            });
            return next.handle(request).pipe(
                catchError(
                    (err: HttpErrorResponse): Observable<any> => {
                       
                        return this.handleErrorFunction(err, request);
                    }
                )
            );
        }
       
        const token = localStorage.getItem('temp-token');
        request = request.clone({
            url,
            setHeaders: {
                Authorization: `Bearer`+token
            }
        });
       
        
        return next.handle(request).pipe(
            catchError(
                (err: HttpErrorResponse): Observable<any> => {
                    return this.handleError(err, request);
                }
            )
        );
    }

    // tslint:disable-next-line:typedef
    private handleError(res: HttpErrorResponse, req: HttpRequest<any>) {
       
        switch (res.status) {
            case 400: // Bad Request
                // this.errorDialogService.openDialog(res);
                break;
            case 401: // Unauthorized
                // handle 401
                localStorage.clear();
                this._route.navigateByUrl('/auth/login');
                // this.errorDialogService.openDialog(res);
                break;
            case 403:
                localStorage.clear();
                this._route.navigateByUrl('/auth/login');
                // this.errorDialogService.openDialog(res);
                break;
            case 404:
                this.errorDialogService.openDialog(res);
                break;
            case 405: // Method not allowed
                this.errorDialogService.openDialog(res);
                break;
            case 422: // Method not allowed
                this.errorDialogService.openDialog(res);
                break;
            case 500:
                this.errorDialogService.openDialog(res);
                break;
            case 503: // Service unavailable
                this.errorDialogService.openDialog(res);
                break;
            default:
                break;
        }

        let err;
        try {
            err = res.error;
        } catch (ex) { }
        if (!err) {
            const implicitRes = res as any;
            err =
                (implicitRes['content'] ? JSON.parse(implicitRes['content']) : '') ||
                (implicitRes['_body'] ? JSON.parse(implicitRes['_body']) : '');
        }
        if (!err && res.statusText) {
            err = {
                ok: false,
                status: res.status,
                statusText: res.statusText,
                code: res.status,
            };
        }

        if (typeof err !== 'string') {
            err.ok = res.ok || false;
        }

        return throwError(res);
    }

    private handleErrorFunction(res: HttpErrorResponse, req: HttpRequest<any>) {
       
        switch (res.status) {
            case 400: // Bad Request
                // this.errorDialogService.openDialog(res);
                break;
            case 401: // Unauthorized
                // handle 401
                localStorage.clear();
                // this._route.navigateByUrl('/function/financial-report');
                // this.errorDialogService.openDialog(res);
                break;
            case 403:
                localStorage.clear();
                
                break;
            case 404:
                // this.errorDialogService.openDialog(res);
                break;
            case 405: // Method not allowed
                // this.errorDialogService.openDialog(res);
                break;
            case 422: // Method not allowed
                // this.errorDialogService.openDialog(res);
                break;
            case 500:
                // this.errorDialogService.openDialog(res);
                break;
            case 503: // Service unavailable
                // this.errorDialogService.openDialog(res);
                break;
            default:
                break;
        }
        
        let err;
        try {
            err = res.error;
        } catch (ex) { }
        if (!err) {
            const implicitRes = res as any;
            err =
                (implicitRes['content'] ? JSON.parse(implicitRes['content']) : '') ||
                (implicitRes['_body'] ? JSON.parse(implicitRes['_body']) : '');
        }
        if (!err && res.statusText) {
            err = {
                ok: false,
                status: res.status,
                statusText: res.statusText,
                code: res.status,
            };
        }

        if (typeof err !== 'string') {
            err.ok = res.ok || false;
        }

        return throwError(res);
    }
}