import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {ErrorHandlerService} from "./error-handler.service";
import {ServiceHandlerService} from "./service-handler.service";
import {globalVariables} from "../globalvariables";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

@Injectable()
export class EventService {

  constructor(private errorService: ErrorHandlerService, private service: ServiceHandlerService) {
  }


  getEvents(): Observable<any> {
    return this.service.get(globalVariables.API_URL + '/services/apexrest/v1/events')
      .map((response: Response) => response.json()).catch(err => this.errorService.handleError(err));
  }

  //API_URL is under config.js
  getEvent(eventId: string): Observable<any> {
    return this.service.get(globalVariables.API_URL + '/services/apexrest/v1/event?eventId=' + eventId)
      .map((response: Response) => response.json())
      .catch(err => this.errorService.handleError(err));
  }
}
