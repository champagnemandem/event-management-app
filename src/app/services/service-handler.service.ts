import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {AuthenticationTwoService} from "./authservicetwo.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

@Injectable()
export class ServiceHandlerService {
  private headers;
  private option;

  constructor(private http: Http, auth: AuthenticationTwoService) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.headers.set('Authorization', 'Bearer ' + auth.sessionId);
    // this.headers.set('Authorization', 'Bearer ' + '00D0v0000000WY6!ASAAQLICeERM4WUsyFrqtYSaEB4RGs.22XPJ60KlOYceFViheyV5w4xZ2R9lsYr8lSUZNOCjWsKTf8T6A7_e0pDH5TnzZQsk');
    console.log(this.headers);
    this.option = new RequestOptions({headers: this.headers});
  }

  get(uri: string): Observable<Response> {
    return this.http.get(uri, this.option);
  }

  post(uri: string, body: any): Observable<Response> {
    return this.http.post(uri, body, this.option);
  }

  put(uri: string, body: any): Observable<Response> {
    return this.http.put(uri, body, this.option);
  }
}
