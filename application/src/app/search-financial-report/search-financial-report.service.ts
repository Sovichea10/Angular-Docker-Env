import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SFRService {
    public redirectUrl:string = '';
    httpOptions = {
        headers: new HttpHeaders({
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9'
        })
    };
    constructor(private http: HttpClient) { }

    login(body: object): Observable<any> {
        return this.http.post('/auth/login', body);
    }

    //eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHBzOi8vZGV2LWFwaS1vc3NyLm1wd3QuZ292LmtoOjI1OTA4L2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjQwMDc3MzA5LCJleHAiOjE2NDI2NjkzMDksIm5iZiI6MTY0MDA3NzMwOSwianRpIjoicVpiVTNiakE4am9Pc1NpYyJ9.3g2Zpv-n29QQybvkWQKQfpIjQUMbu6lWapm2aBb_6tY

    isLoggedIn(): boolean {
        return true;
    }

    getSetup( params,hearder:any){
        return this.http
            .get<any>('/report/setup?'+params, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

    getSetupProfitCenter(hearder:any, profit_center:any){
        
        const httpOptions = {};
        let params = new HttpParams({ fromObject: {profitCenter:profit_center} });
        let queryParams = {"page":1,"per_page":1};
        return this.http
            .get<any>('/report/setup', {
                params: params,
                headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }


    getDateCycle(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/date-setup/date-cycle', body, {headers: new HttpHeaders({
                'Authorization': hearder
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

    getFinancialReport(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/report/financial-request-file', body, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getKey(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/setup/get-key', body, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    updateTemToken(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/setup/update-url-token', body, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getCompanyFinancialReport(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/report/company-financial-request-file', body, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getTransferFinancialReport(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/report/transfer-financial-request-file', body, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }
    getTidReport(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/report/tid-request-file', body, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getTidReportExcel(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/report/tid-request-excel-file', body, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getNonTaxReportExcel(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/report/non-tax-request-excel-file', body, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getFinancailReportExcel(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/report/financial-request-excel-file', body, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getCompanyFinancailReportExcel(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/report/company-financial-request-excel-file', body, {headers: new HttpHeaders({
                'Authorization': hearder
            })})
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getTransferFinancailReportExcel(body: object, hearder:any): Observable<any> {
        return this.http
            .post('/report/report/transfer-financial-request-excel-file', body, {headers: new HttpHeaders({
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
