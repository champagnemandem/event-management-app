import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms'
import { AccordionModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';    
import { Ng2StickyModule } from 'ng2-sticky';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent}  from './components/index';
import { SalesforceService, LoggerService, LOG_LEVEL, AuthenticationTwoService } from './services/index';
import { SalesforceResolver } from './resolves/index';

import { ContentEditableModelDirective } from './directives/contentEditableModel.directive';
import { GravatarDirective } from './directives/gravatar.directive';
import { NewlineToBreakPipe, KeysPipe } from './pipes/index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { EventComponent } from './components/event/event.component';
import { FaqComponent } from './components/faq/faq.component';
import { HeaderComponent } from './components/app/header.component';
import { FooterComponent } from './components/app/footer.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { BannerComponent } from './components/app/banner.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GoogleMapComponent } from './components/event-detail/googlemap.component';


import {EventService} from "./services/event.service";
import {ErrorHandlerService} from "./services/error-handler.service";
import {ServiceHandlerService} from "./services/service-handler.service";
import {AuthenticationService} from "./services/auth.service";
import {NavigationStateService} from "./services/navigation-state.service";
import {ContactService} from "./services/contact.service";
import {UserService} from "./services/user.service";
import {DiscussionService} from "./services/discussion.service";
import {AuthGuard} from "./services/auth.guard";
import {FaqService} from "./services/faq.service";



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        routing,
        ReactiveFormsModule,
        AccordionModule.forRoot(),
        AgmCoreModule.forRoot({
           apiKey: 'AIzaSyCAw3LQCUTL9SZHxZS_usO_YT0sqBR8ZtY'
        }),
        Ng2StickyModule
    ],
    declarations: [
        AppComponent,
        ContentEditableModelDirective,
        GravatarDirective,
        NewlineToBreakPipe,
        KeysPipe,
        EventComponent,
        FaqComponent,
        HeaderComponent,
        EventDetailComponent,
        FooterComponent,
        BannerComponent,
        ProfileComponent,
        GoogleMapComponent
    ],
    providers: [
        AuthGuard,
        SalesforceService,
        LoggerService,
        SalesforceResolver,
        appRoutingProviders,
        AuthenticationTwoService,
        EventService,
        ErrorHandlerService,
        ServiceHandlerService,
        AuthenticationService,
        NavigationStateService,
        ContactService,
        UserService,
        DiscussionService,
        FaqService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private sfdc: SalesforceService, private log: LoggerService) {
        this.sfdc.controller = 'AngularAppController';
        this.log.logLevel = LOG_LEVEL.ALL;
    }
}
