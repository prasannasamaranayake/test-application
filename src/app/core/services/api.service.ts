import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map, take} from 'rxjs/operators';
import {AppHttpResponse} from "../models/app-http-response.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  /**
   * Get Master Data by given url
   * @param url
   */
  public getData<T>(url: string): Observable<T[]> {
    return this.http.get<T[]>(url)
      .pipe(
        take(1),
        catchError(err => throwError('Errors occurred!'))
      );
  }

  /**
   * Get Resources from url and returns Body as observable
   * @param url
   */
  public get<T>(url: string): Observable<T[]> {
    return this.http.get<AppHttpResponse<T>>(url)
      .pipe(
        take(1),
        map(response => {
          return response.body;
        })
      );
  }
}
