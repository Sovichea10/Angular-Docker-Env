import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Service {
    getProductType() {
      throw new Error('Method not implemented.');
    }


    httpOptions = {
        headers: new HttpHeaders({
            'Content-type': 'application/json',
            'withCredentials': 'true',
        })
    };

    constructor(private http: HttpClient) { }

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

            // TODO: better job of transforming error for product consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    //==================================================================================>> Listing
    listing(): Observable<any> {

        const httpOptions = {};

        return this.http.get<any>('/cp/report-monthly', httpOptions);
    }

    create(data:any): Observable<any> {
        return this.http.post('/cp/report-monthly', data);
    }

    update(id:number = 0, data:any = {}): Observable<any> {
        return this.http.post('/cp/customers/'+id+'?_method=PUT', data, this.httpOptions);
    }

    //==================================================================================>> View Majors
    view(id:string = ''): Observable<any> {
        const httpOptions = {};
        return this.http.get<any>('/cp/report-monthly/'+id, httpOptions);
    }

    delete(id:number = 0): Observable<any> {
        return this.http.delete('/cp/customers/'+id, this.httpOptions);
    }

    uploadAttachment(data:any): Observable<any> {
        return this.http.post('/cp/report-monthly/attach-file', data);
    }
   
}
