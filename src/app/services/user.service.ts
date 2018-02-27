import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {ServiceHandlerService} from "./service-handler.service";
import {ErrorHandlerService} from "./error-handler.service";
import {globalVariables} from "../globalvariables";
import {IUser} from "../model/IUser";


@Injectable()
export class UserService {

  constructor(private errorService: ErrorHandlerService, private service: ServiceHandlerService) {

  }

  getUser(): Observable<any> {
    return this.service.get(globalVariables.API_URL + '/services/apexrest/v1/user')
      .map((response: Response) => response.json())
      .catch(err => this.errorService.handleError(err));
  }

  updateUser(user: IUser) {
    return this.service.put(globalVariables.API_URL + '/services/apexrest/v1/user/update', JSON.stringify(user))
      .map((response: Response) => response.json())
      .catch(err => this.errorService.handleError(err));
  }
}
