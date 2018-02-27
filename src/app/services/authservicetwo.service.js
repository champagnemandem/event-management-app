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
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/toPromise");
var jsforce = require('jsforce');
var AuthenticationTwoService = /** @class */ (function () {
    // todo: externalize url/client_id/client_secret - remove secret as its BAD BAD BAD!!
    // private client_id = '3MVG9szVa2RxsqBYkPp.Y7.IVKCvZ5418H9jDzK.JyZLipE7yw_HE7uUHtNW7bMdgUNHwcBjcScVSVapXItUU';
    // private client_secret= '180289279416951926';
    function AuthenticationTwoService(http) {
        this.http = http;
        this.useRest = window.local || false;
        this.apiVersion = '38.0';
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    AuthenticationTwoService.prototype.login = function (username, password) {
        var _this = this;
        if (!this.conn) {
            console.log('Authenticating with jsforce.');
            this.conn = new jsforce.Connection({ loginUrl: 'https://cs66.salesforce.com' });
        }
        return new Promise(function (resolve, reject) {
            // TODO: got lazy so hardcoded password :P 'Password123iNO2JbWROgNha0pqR0FOE9Or'
            _this.conn.login(username, password).then(function (response) {
                _this.token = _this.conn.accessToken;
                _this.userId = response.id;
                if (_this.token) {
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: _this.token, userId: _this.userId }));
                    resolve(true);
                }
            }).catch(function (ex) {
                console.log('exception occured in login()');
                resolve(false);
            });
        });
    };
    AuthenticationTwoService.prototype.getFaqs = function () {
        return this.conn.query('SELECT Id, Question__c, Answer__c FROM FAQ_page__c');
    };
    AuthenticationTwoService.prototype.getConn = function () {
        var self = this;
        return self.conn;
    };
    AuthenticationTwoService.prototype.getUserId = function () {
        return this.userId;
    };
    // todo: externalize post authenticatee methods to dev/prod config
    //     loginn(username: string, password: string): Observable<any> {
    //
    //         // this is prob wrong implementation...
    //         // i believe this code needs to be refactored to use http sessionId's OOTB salesforce??
    //           this.oAuthBaseUrl = 'https://test.salesforce.com/services/oauth2/token';
    //            let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    //            // let option = new RequestOptions({ headers: headers });
    //            let body = new URLSearchParams();
    //             body.append('grant_type', 'password');
    //             body.append('username', username);
    //             body.append('password', password);
    //             body.append('client_id', this.client_id);
    //             body.append('client_secret', this.client_secret);
    //
    //              console.log(body.toString());
    //         return this.http.post(this.oAuthBaseUrl, body)
    //             .map((response: Response) => {
    //                 // login successful if there's a jwt token in the response
    //                 console.log(response.json().access_token);
    //                 let token = response.json() && response.json().access_token;
    //                 if (token) {
    //                     // set token property
    //                     this.token = token;
    //
    //
    //                     // store username and jwt token in local storage to keep user logged in between page refreshes
    //                     localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
    //                     // return true to indicate successful login
    //                     return true;
    //                 } else {
    //                     // return false to indicate failed login
    //                     return false;
    //                 }
    //             }).catch(this.handleError);
    //      }
    AuthenticationTwoService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    AuthenticationTwoService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    AuthenticationTwoService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AuthenticationTwoService);
    return AuthenticationTwoService;
}());
exports.AuthenticationTwoService = AuthenticationTwoService;
//# sourceMappingURL=authservicetwo.service.js.map