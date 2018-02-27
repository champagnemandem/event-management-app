import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {ServiceHandlerService} from "./service-handler.service";
import {ErrorHandlerService} from "./error-handler.service";
import {IContact} from "../model/IContact";
import {globalVariables} from "../globalvariables";


@Injectable()
export class ContactService {

  constructor(private errorService: ErrorHandlerService, private service: ServiceHandlerService) {

  }

  getContact(): Observable<any> {
    return this.service.get(globalVariables.API_URL + '/services/apexrest/v1/contact')
      .map((response: Response) => response.json())
      .catch(err => this.errorService.handleError(err));
  }

  updateContact(contact: IContact) {
    return this.service.put(globalVariables.API_URL + '/services/apexrest/v1/contact/update', JSON.stringify(contact))
      .map((response: Response) => response.json())
      .catch(err => this.errorService.handleError(err));
  }
}
