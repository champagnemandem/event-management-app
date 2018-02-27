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
var ContentEditableModelDirective = /** @class */ (function () {
    function ContentEditableModelDirective(el) {
        this.el = el;
        this.update = new core_1.EventEmitter();
    }
    ContentEditableModelDirective.prototype.onKeyUp = function () {
        var value = this.el.nativeElement.innerText;
        this.lastViewModel = value;
        this.update.emit(value);
    };
    ContentEditableModelDirective.prototype.ngOnChanges = function (changes) {
        if (changes['model'].currentValue !== changes['model'].previousValue) {
            if (!changes['model'].currentValue) {
                this.model = null;
            }
            this.lastViewModel = this.model;
            this.refreshView();
        }
    };
    ContentEditableModelDirective.prototype.refreshView = function () {
        this.el.nativeElement.innerText = this.model;
    };
    __decorate([
        core_1.Input('contentEditableModel'),
        __metadata("design:type", Object)
    ], ContentEditableModelDirective.prototype, "model", void 0);
    __decorate([
        core_1.Output('contentEditableModelChange'),
        __metadata("design:type", Object)
    ], ContentEditableModelDirective.prototype, "update", void 0);
    ContentEditableModelDirective = __decorate([
        core_1.Directive({
            selector: '[contentEditableModel]',
            host: {
                '(keyup)': 'onKeyUp()'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], ContentEditableModelDirective);
    return ContentEditableModelDirective;
}());
exports.ContentEditableModelDirective = ContentEditableModelDirective;
//# sourceMappingURL=contentEditableModel.directive.js.map