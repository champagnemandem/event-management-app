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
var crypto_js_1 = require("crypto-js");
var GravatarDirective = /** @class */ (function () {
    function GravatarDirective(el) {
        this.el = el;
        this.size = 300;
    }
    GravatarDirective.prototype.getAvatarUrl = function () {
        var hash = crypto_js_1.MD5(this.email);
        var url = "http://gravatar.com/avatar/" + hash + ".json?s=" + this.size;
        var el = this.el.nativeElement;
        el.src = url;
    };
    GravatarDirective.prototype.ngOnChanges = function (changes) {
        if (changes['email'].previousValue !== changes['email'].currentValue) {
            this.getAvatarUrl();
        }
    };
    GravatarDirective.prototype.ngOnInit = function () {
        this.getAvatarUrl();
    };
    __decorate([
        core_1.Input('gravatar'),
        __metadata("design:type", String)
    ], GravatarDirective.prototype, "email", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], GravatarDirective.prototype, "size", void 0);
    GravatarDirective = __decorate([
        core_1.Directive({
            selector: '[gravatar]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], GravatarDirective);
    return GravatarDirective;
}());
exports.GravatarDirective = GravatarDirective;
//# sourceMappingURL=gravatar.directive.js.map