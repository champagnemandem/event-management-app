import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './components/event/event.component';
import { FaqComponent } from './components/faq/faq.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import {AuthGuard} from "./services/auth.guard";
import { SalesforceResolver } from './resolves/index';

const appRoutes: Routes = [
  {
      path: '',
      redirectTo: 'event',
      pathMatch: 'full',
      canActivate: [AuthGuard]
  },
  {
      path: 'event',
      component: EventComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'faq',
      component: FaqComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
  },  
  {
      path: 'event/:id',
      component: EventDetailComponent,
      canActivate: [AuthGuard]
  },
  { path: '**', component: EventComponent }
];

export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
