import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AvatarModule } from 'ngx-avatar';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SuggestedConnectionsComponent } from './components/suggested-connections/suggested-connections.component';
import { SuggestedJobOffersComponent } from './components/suggested-job-offers/suggested-job-offers.component';
import { JobOffersPageComponent } from './components/job-offers-page/job-offers-page.component';
import { ConnectionsPageComponent } from './components/connections-page/connections-page.component';
import { EditProfilePageComponent } from './components/edit-profile-page/edit-profile-page.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PostDisplayComponent } from './components/post-display/post-display.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ChatBubbleComponent } from './components/chat-dialog/chat-bubble/chat-bubble.component';
import { FeedComponent } from './components/feed/feed.component';
import { SuggestedConnectionsPageComponent } from './components/suggested-connections-page/suggested-connections-page.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleNotificationComponent } from './components/dashboard/single-notification/single-notification.component';
import { SingleConnectionSuggestionComponent } from './components/suggested-connections/single-connection-suggestion/single-connection-suggestion.component';
import { SingleJobOfferComponent } from './components/suggested-job-offers/single-job-offer/single-job-offer.component';
import { SingleContactComponent } from './components/chat-page/single-contact/single-contact.component';
import { NewPostDialogComponent } from './components/new-post-dialog/new-post-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    DashboardComponent,
    SidebarComponent,
    ProfilePageComponent,
    SuggestedConnectionsComponent,
    SuggestedJobOffersComponent,
    JobOffersPageComponent,
    ConnectionsPageComponent,
    EditProfilePageComponent,
    NotificationComponent,
    PostDisplayComponent,
    ChatPageComponent,
    ChatDialogComponent,
    AdminDashboardComponent,
    ChatBubbleComponent,
    FeedComponent,
    SuggestedConnectionsPageComponent,
    HeaderComponent,
    SingleNotificationComponent,
    SingleConnectionSuggestionComponent,
    SingleJobOfferComponent,
    SingleContactComponent,
    NewPostDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    AvatarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
