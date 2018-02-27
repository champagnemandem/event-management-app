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
var Subject_1 = require("rxjs/Subject");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService() {
        var _this = this;
        this.isLoggedInBool = false;
        this.isLoggedIn = new Subject_1.Subject();
        this.isLoggedIn.subscribe(function (x) { return _this.isLoggedInBool = x; });
        console.log("AuthenticationService -> constructor()");
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // var sessionId = (<HTMLInputElement>document.getElementById("sessionId")).value;
        var sessionId = '00D0v0000000WY6!ASAAQBfXn5JHVwIPMAGrMTTNJESbGwyi.Tfo74e6nqUOuFD_DnQzq30vJKu5oVHQE58ziCcVjg2aNMtK34oXB1eWs6Oly_9y';
        if ((this.currentUser && this.currentUser.sessionId)) {
            console.log("(this.currentUser && this.currentUser.sessionId)");
            this.doLogin();
        }
        else if (sessionId) {
            console.log("sessionId");
            localStorage.setItem('currentUser', JSON.stringify({
                sessionId: sessionId
            }));
            this.doLogin();
        }
        else {
            console.log("this.isLoggedIn.next(false)");
            this.isLoggedIn.next(false);
        }
    }
    AuthenticationService.prototype.doLogin = function () {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isLoggedIn.next(true);
    };
    Object.defineProperty(AuthenticationService.prototype, "loggedInBool", {
        get: function () {
            return this.isLoggedInBool;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "sessionId", {
        get: function () {
            return this.currentUser.sessionId;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.logout = function () {
        console.log('logging out');
        this.isLoggedIn.next(false);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=auth.service.js.map