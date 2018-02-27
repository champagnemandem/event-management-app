import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {ErrorHandlerService} from "./error-handler.service";
import {ServiceHandlerService} from "./service-handler.service";
import {globalVariables} from "../globalvariables";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

@Injectable()
export class FaqService {

    constructor(private service: ServiceHandlerService, private errorService: ErrorHandlerService) { }

    getFaq(): Observable<any> {
        return this.service.get(globalVariables.API_URL + '/services/apexrest/v1/faq')
            .map((response: Response) => response.json()).catch(err => this.errorService.handleError(err));
    }
}
