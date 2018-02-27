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
var index_1 = require("./index");
require("rxjs/add/operator/toPromise");
var _ = require("lodash");
var jsforce = require('jsforce');
var moment = require("moment");
var API;
(function (API) {
    API[API["REST"] = 0] = "REST";
    API[API["VFR"] = 1] = "VFR";
})(API = exports.API || (exports.API = {}));
var SalesforceService = /** @class */ (function () {
    function SalesforceService(_zone, log) {
        this._zone = _zone;
        this.log = log;
        this.useRest = window.local || false;
        this.apiVersion = '34.0';
    }
    Object.defineProperty(SalesforceService.prototype, "instanceUrl", {
        get: function () {
            if (this.conn) {
                return this.conn.instanceUrl;
            }
            else {
                return window.location.origin;
            }
        },
        enumerable: true,
        configurable: true
    });
    SalesforceService.prototype.authenticate = function (login_url, username, password, oauth2) {
        var _this = this;
        if (!this.conn) {
            this.log.debug('Authenticating with jsforce.');
            this.conn = new jsforce.Connection({
                loginUrl: login_url,
                version: this.apiVersion,
                proxyUrl: window.local ? '/proxy/' : undefined,
                oauth2: oauth2
            });
            return this.conn.login(username, password);
        }
        else {
            this.log.warn('Already authenticated. No need to reauth.');
            return new Promise(function (resolve, reject) {
                resolve(_this.conn.userInfo);
            });
        }
    };
    /**
     * @param  {string} controller 	        - The APEX controller to use
     * @param  {string} method 				- The method to execute on the controller. To use
     * 						     	          both REST and Visualforce Remoting the methods
     * 						                  must be tagged with both `@RemoteAction` and `WebService`
     * @param  {Object} params      		- Parameters to pass to the APEX method as an object with
     * 							      		  the format `{ parameter_name: value }`
     * @param  {RemotingOptions} vfrOptions	- An object containing options to pass to the Visualforce
     * 										  remoting call.
     * @return {Promise<any>} 	 Returns a promise with the result or rejects with the
     * 						     remoting exception.
     */
    SalesforceService.prototype.execute = function (method, params, vfrOptions) {
        var _this = this;
        this.log.group('Executing method: ' + method, index_1.LOG_LEVEL.DEBUG);
        this.log.debug('Params:', params);
        var controller = this.controller;
        var p = new Promise(function (resolve, reject) {
            if (_this.useRest) {
                _this.log.debug('Using REST API');
                var beforeHookResult = _this.runBeforeHook(controller, method, params, API.REST);
                if (beforeHookResult) {
                    // console.log("new5")
                    _this._zone.runOutsideAngular(function () {
                        _this.execute_rest(controller, method, params)
                            .then(function (res) {
                            _this.log.debug('Result: ', res);
                            resolve(res);
                            // console.log("4")
                            _this.runAfterHook(null, res);
                        }, function (reason) {
                            _this.log.error(reason);
                            reject(reason);
                            _this.runAfterHook(reason, null);
                        })
                            .then(function () {
                            _this._zone.run(function () { });
                        });
                    });
                }
                else {
                    var reason = 'Before hook failed';
                    reject(reason);
                    _this.runAfterHook(reason, null);
                }
            }
            else {
                _this.log.debug('Using Visualforce Remoting');
                var beforeHookResult = _this.runBeforeHook(controller, method, params, API.VFR);
                if (beforeHookResult) {
                    var tmp_1 = [];
                    for (var i in params) {
                        tmp_1.push(params[i]);
                    }
                    _this._zone.runOutsideAngular(function () {
                        _this.execute_vfr(method, tmp_1, vfrOptions)
                            .then(function (res) {
                            _this.log.debug('Result: ', res);
                            resolve(res);
                            _this.runAfterHook(null, res);
                        }, function (reason) {
                            _this.log.error(reason);
                            reject(reason);
                            _this.runAfterHook(reason, null);
                        })
                            .then(function () {
                            _this._zone.run(function () { });
                        });
                    });
                }
                else {
                    var reason = 'Before hook failed';
                    reject(reason);
                    _this.runAfterHook(null, reason);
                }
            }
        });
        this.log.groupEnd(index_1.LOG_LEVEL.DEBUG);
        return p;
    };
    SalesforceService.prototype.execute_rest = function (pkg, method, params) {
        var _this = this;
        var self = this;
        // console.log("1")
        for (var key in params) {
            if (typeof (params[key]) === 'object' && !Array.isArray(params[key])) {
                params[key] = this.processSobject(params[key]);
            }
        }
        // console.log("2")
        return new Promise(function (resolve, reject) {
            // console.log(pkg, params, method);
            self.conn.execute(pkg, method, params, null)
                .then(function (res) {
                res = _this.parseResult(res);
                resolve(res);
            }, function (reason) {
                reject(reason);
            });
            // console.log("3")
        });
    };
    SalesforceService.prototype.execute_vfr = function (method, params, config) {
        // Set ctrl to the Visualforce Remoting controller
        var controller = this.controller;
        var ctrl = window[controller] || {};
        var self = this;
        config = config || { escape: false };
        // Make sure the controller has the method we're attempting to call
        if (ctrl.hasOwnProperty(method)) {
            var methodFunc = ctrl[method];
            var directCfg_1 = methodFunc.directCfg;
            return new Promise(function (resolve, reject) {
                // The wrong number of parameters were included
                if (params.length !== directCfg_1.method.len) {
                    reject('Wrong number of parameters included');
                    return;
                }
                var callback = function (res, err) {
                    if (res) {
                        res = self.parseResult(res);
                        resolve(res);
                    }
                    else {
                        reject(err.message);
                    }
                };
                params.push(callback);
                params.push(config);
                ctrl[method].apply(null, params);
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                reject('The requested method does not exist on ' + controller);
            });
        }
    };
    SalesforceService.prototype.convertDate = function (date, dateTime) {
        if (dateTime === void 0) { dateTime = false; }
        if (this.useRest) {
            if (dateTime) {
                return moment(date).toISOString();
            }
            else {
                return moment(date).format('YYYY-MM-DD');
            }
        }
        else {
            return moment(date).unix();
        }
    };
    SalesforceService.prototype.processSobject = function (obj) {
        var nullables = [];
        var tmp = JSON.parse(JSON.stringify(obj));
        for (var key in tmp) {
            if (!tmp[key]) {
                tmp[key] = undefined;
                nullables.push(key);
            }
        }
        tmp.fieldsToNull = nullables;
        return tmp;
    };
    SalesforceService.prototype.runBeforeHook = function (method, controller, params, api) {
        var beforeHookResult = true;
        if (this.beforeHook) {
            this.log.debug('Executing before hook');
            beforeHookResult = this.beforeHook.apply(this, [controller, method, params, API.REST]);
            this.log.debug('Before hook completed with status: ', beforeHookResult);
        }
        return beforeHookResult;
    };
    SalesforceService.prototype.runAfterHook = function (error, result) {
        if (this.afterHook) {
            this.log.debug('Executing after hook');
            this.afterHook.apply(this, [error, result]);
            this.log.debug('After hook completed');
        }
    };
    SalesforceService.prototype.parseResult = function (result) {
        if (!result) {
            return [];
        }
        result = this.stripNamespace(result);
        if (result.result) {
            result = result.result;
        }
        return this.arrayify(result);
    };
    SalesforceService.prototype.arrayify = function (obj) {
        if (!Array.isArray(obj)) {
            return [obj];
        }
        else {
            return obj;
        }
    };
    SalesforceService.prototype.normalizeType = function (val) {
        var dateRegex = /[0-9]{2,4}-[0-9]{1,2}-[0-9]{1,2}/i;
        if (!isNaN(val)) {
            return +val;
        }
        else if (val == 'true' || val == 'false' || this.isJsonString(val)) {
            return JSON.parse(val);
        }
        else if (dateRegex.test(val)) {
            return Date.parse(val);
        }
        else {
            return val;
        }
    };
    SalesforceService.prototype.isJsonString = function (str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    SalesforceService.prototype.stripNamespace = function (obj) {
        var _this = this;
        if (Array.isArray(obj)) {
            return obj.map(function (v) {
                return _this.stripNamespace(v);
            });
        }
        else if (typeof (obj) === 'object' && !Array.isArray(obj)) {
            if (obj.$ && obj.$['xsi:nil'] === 'true') {
                return null;
            }
            else {
                for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (i.indexOf(':') > -1) {
                        var t = i.substr(i.indexOf(":") + 1);
                        obj[t] = this.stripNamespace(obj[i]);
                        delete obj[i];
                    }
                    else if (i === '$') {
                        delete obj[i];
                    }
                    else {
                        obj[i] = this.stripNamespace(obj[i]);
                    }
                }
                return obj;
            }
        }
        else {
            return this.normalizeType(obj);
        }
    };
    SalesforceService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone, index_1.LoggerService])
    ], SalesforceService);
    return SalesforceService;
}());
exports.SalesforceService = SalesforceService;
var SOQL = /** @class */ (function () {
    function SOQL() {
        this.builder = {
            fields: [],
            sobject: null,
            conditions: null,
            order: null,
            limit: null
        };
        this.sobject = this.from;
    }
    SOQL.prototype.select = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
            var item = items_1[_a];
            if (typeof (item) === 'object') {
                var fields = item.fields.join(', ');
                var subquery = this.build(item);
                subquery = "(" + subquery + ")";
                this.builder.fields.push(subquery);
            }
            else {
                this.builder.fields.push(item);
            }
        }
        this.builder.fields = _.uniq(this.builder.fields);
        this.soql = this.build(this.builder);
        return this;
    };
    SOQL.prototype.from = function (sobject) {
        this.builder.sobject = sobject;
        this.soql = this.build(this.builder);
        return this;
    };
    SOQL.prototype.where = function (conditions) {
        this.builder.conditions = conditions;
        this.soql = this.build(this.builder);
        return this;
    };
    SOQL.prototype.order = function (field, direction) {
        this.builder.order.field = field;
        this.builder.order.direction = direction;
        this.soql = this.build(this.builder);
        return this;
    };
    SOQL.prototype.orderBy = function (field) {
        this.builder.order.field = field;
        this.soql = this.build(this.builder);
        return this;
    };
    SOQL.prototype.orderDirection = function (direction) {
        this.builder.order.direction = direction;
        this.soql = this.build(this.builder);
        return this;
    };
    SOQL.prototype.limit = function (num) {
        this.builder.limit = num;
        this.soql = this.build(this.builder);
        return this;
    };
    SOQL.prototype.build = function (builder) {
        var sobject = builder.sobject, fields = builder.fields.join(', '), conditions = builder.conditions, limit = builder.limit, order = undefined;
        if (builder.order && builder.order.field) {
            order = 'ORDER BY ' + builder.order.field;
            if (builder.order.direction) {
                order += ' ' + builder.order.direction;
            }
        }
        var soql = "SELECT " + fields + " FROM " + sobject;
        if (conditions) {
            soql += " WHERE " + conditions;
        }
        if (order) {
            soql += " " + order;
        }
        if (limit) {
            soql += " " + limit;
        }
        return soql;
    };
    return SOQL;
}());
exports.SOQL = SOQL;
//# sourceMappingURL=salesforce.service.js.map