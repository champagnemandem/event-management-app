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
var event_service_1 = require("../../services/event.service");
var router_1 = require("@angular/router");
var navigation_state_service_1 = require("../../services/navigation-state.service");
var EventComponent = /** @class */ (function () {
    function EventComponent(eventService, navigationStateService, router) {
        this.eventService = eventService;
        this.navigationStateService = navigationStateService;
        this.router = router;
    }
    EventComponent.prototype.ngOnInit = function () {
        console.log("EventComponent -> ngOnInit()");
        this.navigationStateService.clear();
        this.getEvents();
    };
    EventComponent.prototype.getEvents = function () {
        //this.downloadService.getDownload();
        var _this = this;
        this.eventService.getEvents().subscribe(function (data) {
            _this.events = data;
            var id;
            if (_this.events.length == 1) {
                console.log("getEvents() : only one event is present");
                id = _this.events[0].Id;
                _this.router.navigate(['event/' + id]);
            }
        }, function (error) {
            _this.errorType = "Error!";
            _this.errorMsg = "An unexpected error occurred. Please refresh the page.";
        });
    };
    EventComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'event-listing',
            templateUrl: './event.html'
        }),
        __metadata("design:paramtypes", [event_service_1.EventService,
            navigation_state_service_1.NavigationStateService,
            router_1.Router])
    ], EventComponent);
    return EventComponent;
}());
exports.EventComponent = EventComponent;
//# sourceMappingURL=event.component.js.map