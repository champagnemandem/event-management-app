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
require("rxjs/add/operator/map");
var service_handler_service_1 = require("./service-handler.service");
var error_handler_service_1 = require("./error-handler.service");
var globalvariables_1 = require("../globalvariables");
var UserService = /** @class */ (function () {
    function UserService(errorService, service) {
        this.errorService = errorService;
        this.service = service;
    }
    UserService.prototype.getUser = function () {
        var _this = this;
        return this.service.get(globalvariables_1.globalVariables.API_URL + '/services/apexrest/v1/user')
            .map(function (response) { return response.json(); })
            .catch(function (err) { return _this.errorService.handleError(err); });
    };
    UserService.prototype.updateUser = function (user) {
        var _this = this;
        return this.service.put(globalvariables_1.globalVariables.API_URL + '/services/apexrest/v1/user/update', JSON.stringify(user))
            .map(function (response) { return response.json(); })
            .catch(function (err) { return _this.errorService.handleError(err); });
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [error_handler_service_1.ErrorHandlerService, service_handler_service_1.ServiceHandlerService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map