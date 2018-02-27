import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {ServiceHandlerService} from "./service-handler.service";
import {ErrorHandlerService} from "./error-handler.service";
import {IDiscussion} from "../model/IDiscussion";
import {globalVariables} from "../globalvariables";


@Injectable()
export class DiscussionService {

  constructor(private errorService: ErrorHandlerService, private service: ServiceHandlerService) {

  }

   getDiscussion(eventId: string): Observable<any> {
    return this.service.get(globalVariables.API_URL + '/services/apexrest/v1/discussion?eventId=' + eventId)
      .map((response: Response) => response.json())
      .catch(err => this.errorService.handleError(err));
  }

  updateDiscussion(eventId: string, discussion: IDiscussion) {
    return this.service.put(globalVariables.API_URL + '/services/apexrest/v1/discussion/update?eventId=' + eventId, JSON.stringify(discussion))
      .map((response: Response) => response.json())
      .catch(err => this.errorService.handleError(err));
  }

}
