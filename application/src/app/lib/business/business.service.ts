import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { Staff } from './staff';
// import { STAFFS } from 'app/mock/mock-staff';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // baseUrl = 'http://preview.engine.vehicle.mpwt.gov.kh:8000/preview/api/v1/auctions/cp';
    // baseUrl = 'https://reqres.in/api';
    httpOptions = {
        headers: new HttpHeaders({
            'Conten-type': 'application/json',
            'withCredentials': 'true',
            // 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsdW1lbi1qd3QiLCJzdWIiOjEwMjYxLCJpYXQiOjE1ODEzMzY2NDAsImV4cCI6MTU4NzMzNjY0MCwiZGF0YSI6eyJpZCI6MTAyNjEsImVtYWlsIjoiMDk2NTQxNjcwNCIsInVzZXJfdHlwZSI6IkNMSUVOVCJ9fQ.Plu5Ik3MShaYizYNb8rcT94-Geqxs-wRdsErnMpgkTw'
        })
    };

    constructor(private http: HttpClient) { }

    public queryString:any = require('query-string');

    /**
     * Get staffs using GET HTTP client
     */
    listing(x): Observable<any> {
        // TODO: send the message _after_ fetching the heroes
        // this.messageService.add('HeroService: fetched heroes');
        const httpOptions = {};
        let params = new HttpParams();
        params = x;
        httpOptions['params'] = params;


        return this.http
            .get<any>('/cp/businesses', httpOptions)
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

    create(body: object): Observable<any> {
        return this.http
            .post('/cp/businesses', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('creating new user')),
                catchError(this.handleError<any>('Cannot create user', []))
            );
    }

    view(id:any){
        return this.http
            .get<any>('/cp/businesses/'+id)
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /**
     * List Bussiness Type
     */
    listingBussiness(): Observable<any> {
        // TODO: send the message _after_ fetching the heroes
        const httpOptions = {};

        return this.http
            .get<any>('/cp/setup/bussiness-types', httpOptions)
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

    /**
     * List Bussiness Type
     */
    listingProvinces(): Observable<any> {
        // TODO: send the message _after_ fetching the heroes
        const httpOptions = {};

        return this.http
            .get<any>('/cp/location/provinces', httpOptions)
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

    listingDistricts(param_from_component): Observable<any> {
        // TODO: send the message _after_ fetching the heroes
        const httpOptions = {};
        let params = new HttpParams();
        params = param_from_component;
        httpOptions['params'] = params;
        return this.http
            .get<any>('/cp/location/filter', httpOptions)
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

    customers(param){
        //return this.coreGet(env.apiBaseUrl+'/cp/location/provinces');
        return this.http
            .get<any>('/cp/customers?'+ this.queryString.stringify(param))
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

    action(type:string = "", id:string = "", body:object): Observable<any> {
        
        if(type == "CREATE"){
            return this.http
            // .post('/cp/businesses', body, this.httpOptions);
            .post('/cp/transactions/businesses/'+id, body, this.httpOptions);
        }else{
            return this.http
            .put('/cp/transactions/businesses/'+id, body, this.httpOptions);
        }
    }

    provinces(){
        //return this.coreGet(env.apiBaseUrl+'/cp/location/provinces');
        return this.http
            .get<any>('/cp/location/provinces')
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

    delete(id:any){
        return this.http
            .delete<any>('/cp/businesses/'+id)
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getHeroes', []))
            );
    }

}
