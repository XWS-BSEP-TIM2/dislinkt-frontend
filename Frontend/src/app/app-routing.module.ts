import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { ConnectionsPageComponent } from './components/connections-page/connections-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfilePageComponent } from './components/edit-profile-page/edit-profile-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FeedComponent } from './components/feed/feed.component';
import { JobOffersPageComponent } from './components/job-offers-page/job-offers-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { SuggestedConnectionsPageComponent } from './components/suggested-connections-page/suggested-connections-page.component';
import { SuggestedConnectionsComponent } from './components/suggested-connections/suggested-connections.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: FeedComponent },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'chat', component: ChatPageComponent },
      {
        path: 'connections',
        component: SuggestedConnectionsPageComponent,
        children: [
          { path: 'my-connections', component: ConnectionsPageComponent },
        ],
      },
      { path: 'job-offers', component: JobOffersPageComponent },
      { path: 'user/:id', component: ProfilePageComponent },
      { path: 'edit-profile', component: EditProfilePageComponent },
    ],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
