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
    public id:number = 0;
    public data:any; 


    httpOptions = {
        headers: new HttpHeaders({
            // 'Conten-type': 'application/json',
            // 'withCredentials': 'true',
            // 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsdW1lbi1qd3QiLCJzdWIiOjEwMjYxLCJpYXQiOjE1ODEzMzY2NDAsImV4cCI6MTU4NzMzNjY0MCwiZGF0YSI6eyJpZCI6MTAyNjEsImVtYWlsIjoiMDk2NTQxNjcwNCIsInVzZXJfdHlwZSI6IkNMSUVOVCJ9fQ.Plu5Ik3MShaYizYNb8rcT94-Geqxs-wRdsErnMpgkTw'
        })
    };

    constructor(private http: HttpClient) { }

    setId(id:number=0){
        this.id = id;
    }
    getId(){
        return this.id;
    }
   
    /**
     * Get List User using GET HTTP client
     */
    listing(param_from_component): Observable<any> {
        // TODO: send the message _after_ fetching the heroes
        // this.messageService.add('HeroService: fetched heroes');
        const httpOptions = {};
        let params = new HttpParams();
        params = param_from_component;
        httpOptions['params'] = params;


        return this.http
            .get<any>('/cp/user', httpOptions)
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getUsers', []))
            );
    }

    // =============== Get User

    view(id:string = ''): Observable<any> {
        return this.http
            .get<any>('/cp/user?id='+id)
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getUser', []))
            );
    }

    // =============== Create User
    create(body: object): Observable<any> {
        return this.http
            .post('/cp/users', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('creating new user')),
                catchError(this.handleError<any>('Cannot create user', []))
            );
    }

    action(type:string = "", body:object): Observable<any> {
        if(type == "CREATE"){
            return this.http
            .post('/cp/user', body, this.httpOptions);
        }else{
            return this.http
            .post('/cp/user', body, this.httpOptions);
        }
    }

    // ============= Update User
    updateUser( id:number = 0, data: {}): Observable<any> {
        return this.http
            .put('/cp/users/'+id+'?_method=PUT', data)
            .pipe(
                tap(_ => console.log('updating new user')),
                catchError(this.handleError<any>('Cannot update user', []))
            );
    }

    delete(id:number = 0): Observable<any> {
        return this.http
            .delete<any>('/cp/user/'+id)
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('', []))
            );
    }

    // Get Setup date
    setup(): Observable<any> {
        return this.http
            .get<any>('/cp/user/setup')
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getUser', []))
            );
    }

    //========== location service
    Listlocation(id:string = ''): Observable<any> {
        return this.http
            .get<any>('/cp/users/'+id+'/locations')
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getUser', []))
            );
    }

    // Get location service
    ListLocationService(id:string = '',param_from_component): Observable<any> {
        // TODO: send the message _after_ fetching the heroes
        // this.messageService.add('HeroService: fetched heroes');
        const httpOptions = {};
        let params = new HttpParams();
        params = param_from_component;
        httpOptions['params'] = params;
        return this.http
            .get<any>('/cp/users/'+id+'/locations/search', httpOptions)
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('getUsers', []))
            );
    }

    addLocation( id:string = '',body:object): Observable<any> {
        return this.http
            .post('/cp/users/'+id+'/locations', body, this.httpOptions);
    }

    deleteLocation(id:number = 0): Observable<any> {
        return this.http
            .delete<any>('/cp/users/locations/remove/'+id)
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('', []))
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
}
