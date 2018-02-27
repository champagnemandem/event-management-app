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
var auth_service_1 = require("../../services/auth.service");
var navigation_state_service_1 = require("../../services/navigation-state.service");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(auth, navigationStateService) {
        var _this = this;
        this.auth = auth;
        this.navigationStateService = navigationStateService;
        this.isCollapsed = true;
        this.isLoggedIn = auth.isLoggedInBool;
        this.auth.isLoggedIn.subscribe(function (result) { return _this.isLoggedIn = result; }, function (error) { return console.log(error); }, function () { return console.log("HeaderComponent -> subscribed to "); });
        // loadingService.status.subscribe((status: boolean) => {
        //   this.active = status;
        // });
        this.navigationStateService.navigationState.subscribe(function (state) {
            _this.showDiscussion = state.page == "event";
            console.log("navigationStateEvent " + JSON.stringify(state));
        });
    }
    HeaderComponent.prototype.collapsed = function (event) {
    };
    HeaderComponent.prototype.expanded = function (event) {
    };
    HeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'greenhouse-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthenticationService, navigation_state_service_1.NavigationStateService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map