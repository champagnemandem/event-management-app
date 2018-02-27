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
var router_1 = require("@angular/router");
require("rxjs/add/operator/map");
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var event_service_1 = require("../../services/event.service");
var navigation_state_service_1 = require("../../services/navigation-state.service");
var EventDetailComponent = /** @class */ (function () {
    function EventDetailComponent(eventService, route, navigationStateService) {
        this.eventService = eventService;
        this.route = route;
        this.navigationStateService = navigationStateService;
        this.eventComplete = false;
        this.attachmentsPhase = "pre";
        console.log('event details');
    }
    EventDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        //This is setting the current page to be the event/:id page
        this.route.params
            .subscribe(function (params) {
            _this.navigationStateService.setActivePage("event", params['id']);
            _this.eventId = params['id'];
            _this.getEvent(_this.eventId);
        });
        this.sortDates();
    };
    //after this is set, this is extracting the details from the page of the :id
    EventDetailComponent.prototype.getEvent = function (eventId) {
        var _this = this;
        this.eventService.getEvent(eventId).subscribe(function (data) {
            //typecasting data to be of the type Event
            _this.event = data;
            _this.eventComplete = true;
            _this.dates_list = _this.parseDates(data);
        }, 
        //not sure what this is doing
        function (error) {
            _this.errorType = "Error!";
            _this.errorMsg = "An unexpected error occured. Please refresh page";
        });
    };
    EventDetailComponent.prototype.setAttachmentsPhase = function (phase) {
        this.attachmentsPhase = phase;
    };
    EventDetailComponent.prototype.isEvent = function () {
        return true;
    };
    EventDetailComponent.prototype.parseDates = function (data) {
        // return an array of the dates between two dates
        var date1 = data.Start_DateTime.slice(0, 10);
        var date2 = data.End_DateTime.slice(0, 10);
        var date1Arr = date1.split("-");
        var date2Arr = date2.split("-");
        var d1 = new Date(Number(date1Arr[0]), Number(date1Arr[1]) - 1, Number(date1Arr[2]));
        var d2 = new Date(Number(date2Arr[0]), Number(date2Arr[1]) - 1, Number(date2Arr[2]));
        // console.log(d1);
        var dates_list = [];
        while (d1 <= d2) {
            dates_list.push(new Date(d1));
            d1.setDate(d1.getDate() + 1);
        }
        // console.log(dates_list[0].getFullYear());
        // console.log(data.AgendumList);
        return dates_list;
    };
    EventDetailComponent.prototype.sortDates = function () {
        console.log("hi");
        console.log(this.eventDates[0]);
    };
    EventDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'event-detail',
            templateUrl: './event-detail.html'
        }),
        __metadata("design:paramtypes", [event_service_1.EventService, router_1.ActivatedRoute, navigation_state_service_1.NavigationStateService])
    ], EventDetailComponent);
    return EventDetailComponent;
}());
exports.EventDetailComponent = EventDetailComponent;
//# sourceMappingURL=event-detail.component.js.map