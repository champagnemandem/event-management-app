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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var forms_2 = require("@angular/forms");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var app_routing_1 = require("./app.routing");
var index_1 = require("./components/index");
var index_2 = require("./services/index");
var index_3 = require("./resolves/index");
var contentEditableModel_directive_1 = require("./directives/contentEditableModel.directive");
var gravatar_directive_1 = require("./directives/gravatar.directive");
var index_4 = require("./pipes/index");
var animations_1 = require("@angular/platform-browser/animations");
var contacts_list_component_1 = require("./components/contacts-list/contacts-list.component");
var contact_detail_component_1 = require("./components/contact-detail/contact-detail.component");
var contact_update_component_1 = require("./components/contact-update/contact-update.component");
var event_component_1 = require("./components/event/event.component");
var faq_component_1 = require("./components/faq/faq.component");
var header_component_1 = require("./components/app/header.component");
var footer_component_1 = require("./components/app/footer.component");
var event_detail_component_1 = require("./components/event-detail/event-detail.component");
var banner_component_1 = require("./components/app/banner.component");
var profile_component_1 = require("./components/profile/profile.component");
var discussion_component_1 = require("./components/discussion/discussion.component");
var event_service_1 = require("./services/event.service");
var error_handler_service_1 = require("./services/error-handler.service");
var service_handler_service_1 = require("./services/service-handler.service");
var auth_service_1 = require("./services/auth.service");
var navigation_state_service_1 = require("./services/navigation-state.service");
var contact_service_1 = require("./services/contact.service");
var user_service_1 = require("./services/user.service");
var AppModule = /** @class */ (function () {
    function AppModule(sfdc, log) {
        this.sfdc = sfdc;
        this.log = log;
        this.sfdc.controller = 'AngularAppController';
        this.log.logLevel = index_2.LOG_LEVEL.ALL;
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                animations_1.BrowserAnimationsModule,
                app_routing_1.routing,
                forms_2.ReactiveFormsModule,
                ngx_bootstrap_1.AccordionModule.forRoot()
            ],
            declarations: [
                index_1.AppComponent,
                contentEditableModel_directive_1.ContentEditableModelDirective,
                gravatar_directive_1.GravatarDirective,
                index_4.NewlineToBreakPipe,
                index_4.KeysPipe,
                contacts_list_component_1.ContactsListComponent,
                contact_detail_component_1.ContactDetailComponent,
                contact_update_component_1.ContactUpdateComponent,
                event_component_1.EventComponent,
                faq_component_1.FaqComponent,
                header_component_1.HeaderComponent,
                event_detail_component_1.EventDetailComponent,
                footer_component_1.FooterComponent,
                banner_component_1.BannerComponent,
                profile_component_1.ProfileComponent,
                discussion_component_1.DiscussionComponent
            ],
            providers: [
                index_2.SalesforceService,
                index_2.LoggerService,
                index_3.SalesforceResolver,
                app_routing_1.appRoutingProviders,
                index_2.AuthenticationTwoService,
                event_service_1.EventService,
                error_handler_service_1.ErrorHandlerService,
                service_handler_service_1.ServiceHandlerService,
                auth_service_1.AuthenticationService,
                navigation_state_service_1.NavigationStateService,
                contact_service_1.ContactService,
                user_service_1.UserService
            ],
            bootstrap: [index_1.AppComponent]
        }),
        __metadata("design:paramtypes", [index_2.SalesforceService, index_2.LoggerService])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map