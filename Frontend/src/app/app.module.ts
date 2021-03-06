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
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SuggestedConnectionsComponent } from './components/suggested-connections/suggested-connections.component';
import { SuggestedJobOffersComponent } from './components/suggested-job-offers/suggested-job-offers.component';
import { JobOffersPageComponent } from './components/job-offers-page/job-offers-page.component';
import { EditProfilePageComponent } from './components/edit-profile-page/edit-profile-page.component';
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
import { DetailedConnectionSuggestionComponent } from './components/suggested-connections-page/detailed-connection-suggestion/detailed-connection-suggestion.component';
import { DetailedJobOfferComponent } from './components/job-offers-page/detailed-job-offer/detailed-job-offer.component';
import { ProfileFeedComponent } from './components/profile-page/profile-feed/profile-feed.component';
import { ProfileConnectionsComponent } from './components/profile-page/profile-connections/profile-connections.component';
import { ConnectionDisplayComponent } from './components/profile-page/profile-connections/connection-display/connection-display.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { WelcomePageSidebarComponent } from './components/welcome-page/welcome-page-sidebar/welcome-page-sidebar.component';
import { WelcomePageHeaderComponent } from './components/welcome-page/welcome-page-header/welcome-page-header.component';
import { PublicAccountsComponent } from './components/welcome-page/public-accounts/public-accounts.component';
import { PublicAccountDisplayComponent } from './components/welcome-page/public-accounts/public-account-display/public-account-display.component';
import { PostPageComponentComponent } from './components/post-page-component/post-page-component.component';
import { DetailedPostDisplayComponent } from './components/post-page-component/detailed-post-display/detailed-post-display.component';
import { WriteCommentComponent } from './components/post-page-component/write-comment/write-comment.component';
import { CommentPreviewComponent } from './components/post-page-component/comment-preview/comment-preview.component';
import { PhotoLightBoxComponent } from './components/post-page-component/photo-light-box/photo-light-box.component';
import { ConnectPanelComponent } from './components/connect-panel/connect-panel.component';
import { ProfileRequestsComponent } from './components/profile-page/profile-requests/profile-requests.component';
import { ProfileBlocksComponent } from './components/profile-page/profile-blocks/profile-blocks.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { MagicLinkLoginComponent } from './components/magic-link-login/magic-link-login.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { MyJobOffersPageComponent } from './components/my-job-offers-page/my-job-offers-page.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { NewJobOfferDialogComponent } from './components/my-job-offers-page/new-job-offer-dialog/new-job-offer-dialog.component';
import { EditJobOfferDialogComponent } from './components/my-job-offers-page/edit-job-offer-dialog/edit-job-offer-dialog.component';
import { SearchPageComponent } from './components/feed/search-page/search-page.component';
import { WelcomeSearchPageComponent } from './components/welcome-page/welcome-search-page/welcome-search-page.component';
import { WelcomeFeedComponent } from './components/welcome-page/welcome-feed/welcome-feed.component';
import {
  PostContentComponent,
  UrlifyPipe,
} from './components/post-content/post-content.component';
import { JobOfferPageComponent } from './components/job-offer-page/job-offer-page.component';
import { ProfilePreviewComponent } from './components/profile-page/profile-preview/profile-preview.component';
//import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { TwoFactorAuthComponent } from './components/two-factor-auth/two-factor-auth.component';
import { SelectTechnologiesDialogComponent } from './components/select-technologies-dialog/select-technologies-dialog.component';
import { NotificationBoxComponent } from './components/dashboard/header/notification-box/notification-box.component';
import { DateAsAgoPipe } from './services/shared/date-as-ago.pipe';

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
    EditProfilePageComponent,
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
    DetailedConnectionSuggestionComponent,
    DetailedJobOfferComponent,
    ProfileFeedComponent,
    ProfileConnectionsComponent,
    ConnectionDisplayComponent,
    WelcomePageComponent,
    WelcomePageSidebarComponent,
    WelcomePageHeaderComponent,
    PublicAccountsComponent,
    PublicAccountDisplayComponent,
    PostPageComponentComponent,
    DetailedPostDisplayComponent,
    WriteCommentComponent,
    CommentPreviewComponent,
    PhotoLightBoxComponent,
    ConnectPanelComponent,
    ProfileRequestsComponent,
    ProfileBlocksComponent,
    ProfilePictureComponent,
    MagicLinkLoginComponent,
    NotAuthorizedComponent,
    MyJobOffersPageComponent,
    SidebarRightComponent,
    NewJobOfferDialogComponent,
    EditJobOfferDialogComponent,
    SearchPageComponent,
    WelcomeSearchPageComponent,
    WelcomeFeedComponent,
    PostContentComponent,
    UrlifyPipe,
    JobOfferPageComponent,
    ProfilePreviewComponent,
    TwoFactorAuthComponent,
    SelectTechnologiesDialogComponent,
    NotificationBoxComponent,
    DateAsAgoPipe,
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
  exports: [DateAsAgoPipe],
})
export class AppModule {}
