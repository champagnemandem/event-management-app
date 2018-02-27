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
var contact_service_1 = require("../../services/contact.service");
var user_service_1 = require("../../services/user.service");
var forms_1 = require("@angular/forms");
var index_1 = require("../../services/index");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(contactService, userService, formBuilder, sfdc, log) {
        this.contactService = contactService;
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.sfdc = sfdc;
        this.log = log;
        this.contactComplete = false;
        this.userComplete = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.getContact();
        this.getUser();
        this.contactForm = this.formBuilder.group({
            title: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10)]],
            firstName: ['', [forms_1.Validators.required]],
            lastName: ['', [forms_1.Validators.required]],
            food: [],
            notes: [],
            phone: [],
            photo: [],
        });
        this.userForm = this.formBuilder.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            password: ['', [forms_1.Validators.required]],
            confirmPassword: ['', [forms_1.Validators.required]]
        });
    };
    ProfileComponent.prototype.getContact = function () {
        var _this = this;
        this.contactAlerts = null;
        this.userAlerts = null;
        this.contactService.getContact().subscribe(function (data) {
            console.log(data);
            _this.contact = data;
            _this.contactComplete = true;
            _this.stopLoading(false);
        }, function (error) {
            _this.contactComplete = true;
            _this.stopLoading(false);
            _this.errorType = "Error!";
            _this.errorMsg = "An unexpected error occurred. Please refresh the page.";
        });
    };
    ProfileComponent.prototype.getUser = function () {
        var _this = this;
        this.contactAlerts = null;
        this.userAlerts = null;
        this.userService.getUser().subscribe(function (data) {
            console.log(data);
            _this.user = data;
            _this.userComplete = true;
            _this.stopLoading(false);
        }, function (error) {
            _this.userComplete = true;
            _this.stopLoading(false);
            _this.errorType = "Error!";
            _this.errorMsg = "An unexpected error occurred. Please refresh the page.";
        });
    };
    ProfileComponent.prototype.updateContact = function (form) {
        var _this = this;
        this.contactAlerts = null;
        this.userAlerts = null;
        console.log("ContactComponent -> updateContact() " + JSON.stringify(form));
        this.contactService.updateContact(form).subscribe(function (data) {
            console.log(data);
            _this.contactComplete = true;
            _this.stopLoading(true);
            _this.addContactAlert("success", "Your preferences have been updated.");
        }, function (error) {
            _this.contactComplete = true;
            _this.stopLoading(true);
            _this.errorType = "Error!";
            _this.errorMsg = "An unexpected error occured. Please refresh the page.";
        });
    };
    ProfileComponent.prototype.updateUser = function (form) {
        var _this = this;
        this.contactAlerts = null;
        this.userAlerts = null;
        console.log("ContactComponent -> updateUser() " + JSON.stringify(form));
        this.userService.updateUser(form).subscribe(function (data) {
            console.log(data);
            _this.contactComplete = true;
            _this.stopLoading(true);
        }, function (error) {
            _this.contactComplete = true;
            _this.stopLoading(true);
            _this.errorType = "Error!";
            _this.errorMsg = "An unexpected error occured. Please refresh the page.";
        });
    };
    ProfileComponent.prototype.stopLoading = function (single) {
        if (single || (this.contactComplete && this.userComplete)) {
            this.contactComplete = false;
            this.userComplete = false;
        }
    };
    ProfileComponent.prototype.addContactAlert = function (type, message) {
        this.contactAlerts = [{
                "msg": message,
                "type": type
            }];
    };
    ProfileComponent.prototype.addUserAlert = function (type, message) {
        this.contactAlerts = [{
                "msg": message,
                "type": type
            }];
    };
    ProfileComponent.prototype.showDialog = function (event) {
        this.fileInput.nativeElement.click();
        console.log('file uploading ****');
        var file = event.target;
        console.log(this.fileInput.nativeElement.value);
    };
    ProfileComponent.prototype.fileEvent = function (event) {
        var file = event.target.files[0];
        var fileName = file.name;
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file); // Extracts text from file, but string output is lead with metadata that must be stripped
        var self = this; // access component scope in fileReader scope
        fileReader.onloadend = function () {
            var attachment = fileReader.result;
            attachment = attachment.split('base64,')[1]; // Removing the aforementioned metadata
            self.sfdc.execute('uploadTaskDocument', { fileName: fileName, file: attachment })
                .then(function (res) {
                console.log(res);
            }, function (reason) {
                self.log.error(reason);
            });
            fileReader.onerror = function (e) {
                console.error("Error reading file");
            };
        };
    };
    __decorate([
        core_1.ViewChild('fileInput'),
        __metadata("design:type", core_1.ElementRef)
    ], ProfileComponent.prototype, "fileInput", void 0);
    ProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'profile-page',
            templateUrl: './profile.component.html'
        }),
        __metadata("design:paramtypes", [contact_service_1.ContactService, user_service_1.UserService, forms_1.FormBuilder, index_1.SalesforceService, index_1.LoggerService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map