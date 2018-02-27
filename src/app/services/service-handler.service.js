"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var authservicetwo_service_1 = require("./authservicetwo.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var ServiceHandlerService = /** @class */ (function () {
    function ServiceHandlerService(http, auth) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.set('Authorization', 'Bearer ' + '00D0v0000000WY6!ASAAQJGqOxdxJEGW.jzBFiXzfa.Xqw9gTVYDPN06rSx5Ow6bHXXesI.eXsC2zR31Q6VHAuzFoys.AjBUUpD8OEGoLjB3MK49');
        this.option = new http_1.RequestOptions({ headers: this.headers });
    }
    ServiceHandlerService.prototype.get = function (uri) {
        return this.http.get(uri, this.option);
    };
    ServiceHandlerService.prototype.post = function (uri, body) {
        return this.http.post(uri, body, this.option);
    };
    ServiceHandlerService.prototype.put = function (uri, body) {
        return this.http.put(uri, body, this.option);
    };
    ServiceHandlerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, authservicetwo_service_1.AuthenticationTwoService])
    ], ServiceHandlerService);
    return ServiceHandlerService;
}());
exports.ServiceHandlerService = ServiceHandlerService;
//# sourceMappingURL=service-handler.service.js.map