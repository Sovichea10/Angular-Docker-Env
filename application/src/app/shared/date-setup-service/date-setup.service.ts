import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DateSetupService {
    public redirectUrl:string = '';
    httpOptions = {
        headers: new HttpHeaders({
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9'
        })
    };
    constructor(private http: HttpClient) { }

    getReport(apiUrl:any,body: object, headers:any): Observable<any> {
        return this.http
            .post(apiUrl, body, {headers: new HttpHeaders({
                'Authorization': headers
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getYearFrom(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/date-setup/year-from', body, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getYearTo(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/date-setup/year-to', body, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }
    getMonthFrom(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/date-setup/month-from', body, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }
    getMonthTo(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/date-setup/month-to', body, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
     private handleError<T>(operation = '', result?: any) {
        return (error: any): Observable<T> => {
            
            // console.log('handleError', error);

            // if( operation == 'fail-create-data' ){
                
            //     for(let key in error.error.errors){
                 
            //       result.get(key).setErrors({ server:true}); 
            //       result.get(key).errors.server = error.error.errors[key][0]; 
                    
            //     }
                
                return throwError(error); 
            // }

            

            // TODO: better job of transforming error for user consumption
            //console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            //return of(result as T);
        };
    }
    
}
