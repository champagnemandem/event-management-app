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
var error_handler_service_1 = require("./error-handler.service");
var service_handler_service_1 = require("./service-handler.service");
var globalvariables_1 = require("../globalvariables");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var EventService = /** @class */ (function () {
    function EventService(errorService, service) {
        this.errorService = errorService;
        this.service = service;
    }
    EventService.prototype.getEvents = function () {
        var _this = this;
        return this.service.get(globalvariables_1.globalVariables.API_URL + '/services/apexrest/v1/events')
            .map(function (response) { return response.json(); }).catch(function (err) { return _this.errorService.handleError(err); });
    };
    //API_URL is under config.js
    EventService.prototype.getEvent = function (eventId) {
        var _this = this;
        return this.service.get(globalvariables_1.globalVariables.API_URL + '/services/apexrest/v1/event?eventId=' + eventId)
            .map(function (response) { return response.json(); })
            .catch(function (err) { return _this.errorService.handleError(err); });
    };
    EventService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [error_handler_service_1.ErrorHandlerService, service_handler_service_1.ServiceHandlerService])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map