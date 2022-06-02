import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfilePageComponent } from './components/edit-profile-page/edit-profile-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FeedComponent } from './components/feed/feed.component';
import { JobOffersPageComponent } from './components/job-offers-page/job-offers-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PostPageComponentComponent } from './components/post-page-component/post-page-component.component';
import { ProfileConnectionsComponent } from './components/profile-page/profile-connections/profile-connections.component';
import { ProfileFeedComponent } from './components/profile-page/profile-feed/profile-feed.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { SuggestedConnectionsPageComponent } from './components/suggested-connections-page/suggested-connections-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { ProfileRequestsComponent } from './components/profile-page/profile-requests/profile-requests.component';
import { ProfileBlocksComponent } from './components/profile-page/profile-blocks/profile-blocks.component';
import { AuthGuard, UnAuthGuard } from './services/auth-guard.service';
import { MagicLinkLoginComponent } from './components/magic-link-login/magic-link-login.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { MyJobOffersPageComponent } from './components/my-job-offers-page/my-job-offers-page.component';
import { SearchPageComponent } from './components/feed/search-page/search-page.component';
import { WelcomeFeedComponent } from './components/welcome-page/welcome-feed/welcome-feed.component';
import { WelcomeSearchPageComponent } from './components/welcome-page/welcome-search-page/welcome-search-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: FeedComponent },
      { path: 'search/:searchText', component: SearchPageComponent },
      { path: 'chat', component: ChatPageComponent },
      { path: 'connections', component: SuggestedConnectionsPageComponent },
      { path: 'job-offers', component: JobOffersPageComponent },
      { path: 'my-job-offers', component: MyJobOffersPageComponent },
      { path: 'posts/:id', component: PostPageComponentComponent },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
        children: [
          { path: '', component: ProfileFeedComponent },
          { path: 'connections', component: ProfileConnectionsComponent },
          { path: 'requests', component: ProfileRequestsComponent },
          { path: 'blocks', component: ProfileBlocksComponent },
        ],
      },
      { path: 'edit-profile', component: EditProfilePageComponent },
    ],

    canActivate: [AuthGuard],
  },

  {
    path: 'admin',
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        data: { role: ['ADMIN'] },
      },
    ],
  },
  {
    path: 'welcome',
    component: WelcomePageComponent,
    children: [
      { path: '', component: WelcomeFeedComponent },
      { path: 'search/:searchText', component: WelcomeSearchPageComponent },
    ],
    canActivate: [UnAuthGuard],
  },
  { path: 'login', component: LoginPageComponent, canActivate: [UnAuthGuard] },
  {
    path: 'magic-link-login/:id',
    component: MagicLinkLoginComponent,
    canActivate: [UnAuthGuard],
  },
  {
    path: 'register',
    component: RegistrationPageComponent,
    canActivate: [UnAuthGuard],
  },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
