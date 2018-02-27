"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var contacts_list_component_1 = require("./components/contacts-list/contacts-list.component");
var contact_detail_component_1 = require("./components/contact-detail/contact-detail.component");
var contact_update_component_1 = require("./components/contact-update/contact-update.component");
var event_component_1 = require("./components/event/event.component");
var faq_component_1 = require("./components/faq/faq.component");
var profile_component_1 = require("./components/profile/profile.component");
var discussion_component_1 = require("./components/discussion/discussion.component");
var event_detail_component_1 = require("./components/event-detail/event-detail.component");
var index_1 = require("./resolves/index");
var appRoutes = [
    {
        path: '',
        redirectTo: 'event',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: contacts_list_component_1.ContactsListComponent,
        resolve: {
            sfdc: index_1.SalesforceResolver
        }
    },
    {
        path: 'contact/view/:id',
        component: contact_detail_component_1.ContactDetailComponent,
        resolve: {
            sfdc: index_1.SalesforceResolver
        }
    },
    {
        path: 'contact/edit/:id',
        component: contact_update_component_1.ContactUpdateComponent,
        resolve: {
            sfdc: index_1.SalesforceResolver
        }
    },
    {
        path: 'contact/new',
        component: contact_update_component_1.ContactUpdateComponent,
        resolve: {
            sfdc: index_1.SalesforceResolver
        }
    },
    {
        path: 'event',
        component: event_component_1.EventComponent,
        resolve: {
            sfdc: index_1.SalesforceResolver
        }
    },
    {
        path: 'faq',
        component: faq_component_1.FaqComponent,
        resolve: {
            sfdc: index_1.SalesforceResolver
        }
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent,
        resolve: {
            sfdc: index_1.SalesforceResolver
        }
    },
    {
        path: 'discussion',
        component: discussion_component_1.DiscussionComponent,
        resolve: {
            sfdc: index_1.SalesforceResolver
        }
    },
    {
        path: 'event/:id',
        component: event_detail_component_1.EventDetailComponent,
        resolve: {
            sfdc: index_1.SalesforceResolver
        }
    },
    { path: '**', component: event_component_1.EventComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
//# sourceMappingURL=app.routing.js.map