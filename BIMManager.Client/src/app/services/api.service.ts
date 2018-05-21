import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

  private API_ROOT = environment.apiUrl;
  private token: string | null;
  private header: HttpHeaders;

  constructor(private authService: AuthService, private http: HttpClient) {

    this.setToken();

    if (!this.token) {
      return;
    }
  }

  get baseUrl(): string {
    return this.API_ROOT;
  }

  /**
   * Set Auth token on header request
   */
  setToken(): void {

    this.token = this.authService.getToken();
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.token as any);
  }

  /**
   * Send get request on API
   *
   * @param url
   * @param params
   * @param fullResponse
   */
  get(url: string, params?: any, fullResponse = false): Observable<{}> {

    if (!this.header.get('Auth')) {
      this.setToken();
    }

    const httpParams: HttpParams = this.generateHttpParams(params);

    let options: {} = Object.assign({}, { headers: this.header, params: httpParams });
    if (fullResponse) {
      options = Object.assign({}, options, {
        observe: 'response'
      });
    }

    return this.http
      .get(this.API_ROOT + url, options);
  }

  /**
   * Send post request on API
   *
   * @param url
   * @param body
   * @param additionalOptions
   * @param queryParams
   */
  post(url: string, body: string, additionalOptions: {} = {}, queryParams?: {}): Observable<{}> {

    let options: {} = Object.assign({}, { headers: this.header });
    if (additionalOptions) {
      options = Object.assign({}, options, additionalOptions);
    }

    const httpParams: HttpParams = this.generateHttpParams(queryParams);

    Object.assign(options, {
      params: httpParams
    });

    return this.http.post(this.API_ROOT + url, body, options);
  }

  /**
   * Send put request on API
   * @param url
   * @param body
   * @returns {Observable<Response>}
   */
  put(url: string, body: string): Observable<{}> {
    return this.http.put(this.API_ROOT + url, body, { headers: this.header });
  }

  /**
   * Send delete request on API
   * @param url
   * @returns {Observable<Response>}
   */
  httpDelete(url: string): Observable<{}> {
    return this.http.delete(this.API_ROOT + url, { headers: this.header });
  }

  private generateHttpParams(params: any): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    if (params) {
      Object.keys(params)
        .forEach((paramName: string) => {
          if (params[paramName]) {
            httpParams = httpParams.append(paramName, params[paramName]);
          }
        });
    }
    return httpParams;
  }
}
