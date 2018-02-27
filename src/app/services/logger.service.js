"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL[LOG_LEVEL["ALL"] = 0] = "ALL";
    LOG_LEVEL[LOG_LEVEL["DEBUG"] = 1] = "DEBUG";
    LOG_LEVEL[LOG_LEVEL["INFO"] = 2] = "INFO";
    LOG_LEVEL[LOG_LEVEL["WARN"] = 3] = "WARN";
    LOG_LEVEL[LOG_LEVEL["ERROR"] = 4] = "ERROR";
    LOG_LEVEL[LOG_LEVEL["NONE"] = 5] = "NONE";
})(LOG_LEVEL = exports.LOG_LEVEL || (exports.LOG_LEVEL = {}));
var LoggerService = /** @class */ (function () {
    function LoggerService() {
        this.logLevel = LOG_LEVEL.ERROR;
    }
    LoggerService.prototype.group = function (message, logLevel) {
        if (logLevel === void 0) { logLevel = LOG_LEVEL.ERROR; }
        if (this.logLevel <= logLevel) {
            window.console.group.apply(window.console, [message]);
        }
    };
    LoggerService.prototype.groupEnd = function (logLevel) {
        if (logLevel === void 0) { logLevel = LOG_LEVEL.ERROR; }
        if (this.logLevel <= logLevel) {
            window.console.groupEnd.apply(window.console, arguments);
        }
    };
    LoggerService.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.logLevel <= 1) {
            window.console.debug.apply(window.console, args);
        }
    };
    LoggerService.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.logLevel <= 2) {
            window.console.info.apply(window.console, args);
        }
    };
    LoggerService.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.logLevel <= 3) {
            window.console.warn.apply(window.console, args);
        }
    };
    LoggerService.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.logLevel <= 4) {
            window.console.error.apply(window.console, args);
        }
    };
    LoggerService.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        window.console.info.apply(window.console, args);
    };
    LoggerService = __decorate([
        core_1.Injectable()
    ], LoggerService);
    return LoggerService;
}());
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map