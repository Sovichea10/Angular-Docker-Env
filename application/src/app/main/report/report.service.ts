import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ReportService {
    // baseUrl = 'http://preview.engine.vehicle.mpwt.gov.kh:8000/preview/api/v1/auctions/cp';
    // baseUrl = 'https://reqres.in/api';
    httpOptions = {
        headers: new HttpHeaders({
            // 'Conten-type': 'application/json',
            // 'withCredentials': 'true',
            // 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsdW1lbi1qd3QiLCJzdWIiOjEwMjYxLCJpYXQiOjE1ODEzMzY2NDAsImV4cCI6MTU4NzMzNjY0MCwiZGF0YSI6eyJpZCI6MTAyNjEsImVtYWlsIjoiMDk2NTQxNjcwNCIsInVzZXJfdHlwZSI6IkNMSUVOVCJ9fQ.Plu5Ik3MShaYizYNb8rcT94-Geqxs-wRdsErnMpgkTw'
        })
    };

    constructor(private http: HttpClient) { }

    public queryString:any = require('query-string');

    /**
     * Get staffs using GET HTTP client
     */
    listing(x): Observable<any> {
     
        const httpOptions = {};
        let params = new HttpParams();
        params = x;
        httpOptions['params'] = params;


        return this.http
            .get<any>('/cp/report', httpOptions)
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('fail-get-data', []))
            );
    }

    create(data: object, form:any): Observable<any> {
        return this.http
            .post('/cp/customers', {}, this.httpOptions);
            
    //         this.httpClient
    //   .get("data-url")
    //   .subscribe(
    //     data => console.log('success', data),
    //     error => console.log('oops', error)
    //   );
    }

    action(type:string = "", id:string = "", body:object): Observable<any> {
        
        if(type == "CREATE"){
            return this.http
            .post('/cp/customers', body, this.httpOptions);
        }else{
            return this.http
            .put('/cp/customers/'+id, body, this.httpOptions);
        }
    }

    view(id:any){
        return this.http
            .get<any>('/cp/report?id='+id)
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

    delete(id:any){
        return this.http
            .delete<any>('/cp/customers/'+id)
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

    getSetup(){
        //return this.coreGet(env.apiBaseUrl+'/cp/location/provinces');
        return this.http
            .get<any>('/cp/setup')
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

    getDateCycle(body: object): Observable<any> {
        return this.http
            .post('/cp/date-setup/date-cycle', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getYearFrom(body: object): Observable<any> {
        return this.http
            .post('/cp/date-setup/year-from', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getYearTo(body: object): Observable<any> {
        return this.http
            .post('/cp/date-setup/year-to', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getMonthFrom(body: object): Observable<any> {
        return this.http
            .post('/cp/date-setup/month-from', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }
    getMonthTo(body: object): Observable<any> {
        return this.http
            .post('/cp/date-setup/month-to', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getMonths(body: object): Observable<any> {
        return this.http
            .post('/cp/date-setup/months', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    ownerDocmentTypes(){
        return this.http
            .get<any>('/cp/customers/setup/data')
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

    locationFillter(param){
        //return this.coreGet(env.apiBaseUrl+'/cp/location/filter?' + this.queryString.stringify(param));
        return this.http
            .get<any>('/cp/location/filter?'+ this.queryString.stringify(param))
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

    nationalities(){
        return this.http
            .get<any>('/cp/setup/nationalities')
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

    locations(){
        return this.http
            .get<any>('/cp/reports/setup')
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

    getFinancialReport(body: object): Observable<any> {
        return this.http
            .post('/cp/report/financial-request-file', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getCompanyFinancialReport(body: object): Observable<any> {
        return this.http
            .post('/cp/report/company-financial-request-file', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getTransferFinancialReport(body: object): Observable<any> {
        return this.http
            .post('/cp/report/transfer-financial-request-file', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getTidReport(body: object): Observable<any> {
        return this.http
            .post('/cp/report/tid-request-file', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getTidReportExcel(body: object): Observable<any> {
        return this.http
            .post('/cp/report/tid-request-excel-file', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getBankTidReportExcel(body: object): Observable<any> {
        return this.http
            .post('/cp/report/bank-tid-request-excel-file', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getFinancialReportExcel(body: object): Observable<any> {
        return this.http
            .post('/cp/report/financial-request-excel-file', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getCompanyFinancialReportExcel(body: object): Observable<any> {
        return this.http
            .post('/cp/report/company-financial-request-excel-file', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getTransferFinancialReportExcel(body: object): Observable<any> {
        return this.http
            .post('/cp/report/transfer-financial-request-excel-file', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    getNonTaxReportExcel(body: object): Observable<any> {
        return this.http
            .post('/cp/report/non-tax-request-excel-file', body, this.httpOptions)
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
            
            

            if( operation == 'fail-create-data' ){
                
                for(let key in error.error.errors){
                 
                  result.get(key).setErrors({ server:true}); 
                  result.get(key).errors.server = error.error.errors[key][0]; 
                    
                }
                
                return throwError({ message: 'Has error', form: result }); 
            }

            

            // TODO: better job of transforming error for user consumption
            //console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            //return of(result as T);
        };
    }
}
