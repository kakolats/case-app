import { CommonModule } from '@angular/common'
import { ErrorHandler, NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { environment } from '../environments/environment'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { UserCreateEditComponent } from './resources/user/user-create-edit.component'
import { UserListComponent } from './resources/user/user-list.component'

import Bugsnag from '@bugsnag/js'
import { BugsnagErrorHandler } from '@bugsnag/plugin-angular'
import { CaseModule } from '@casejs/angular-library';
import { PostulantCreateEditComponent } from './resources/postulant/postulant-create-edit/postulant-create-edit.component';
import { PostulantListComponent } from './resources/postulant/postulant-list/postulant-list.component';
import { PostulantDetailComponent } from './resources/postulant/postulant-detail/postulant-detail.component';
import { CandidatureComponent } from './pages/candidature/candidature.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { CompetenceCreateEditComponent } from './resources/competence/competence-create-edit/competence-create-edit.component';
import { CompetenceListComponent } from './resources/competence/competence-list/competence-list.component';
import { CompetenceDetailComponent } from './resources/competence/competence-detail/competence-detail.component'


if (environment.enableBugsnag) {
  Bugsnag.start({
    apiKey: environment.bugsnagApiKey,
    releaseStage: environment.envName
  })
}

// create a factory which will return the Bugsnag error handler
export function errorHandlerFactory() {
  return new BugsnagErrorHandler()
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    UserCreateEditComponent,
    PostulantCreateEditComponent,
    PostulantListComponent,
    PostulantDetailComponent,
    CandidatureComponent,
    DefaultLayoutComponent,
    CompetenceCreateEditComponent,
    CompetenceListComponent,
    CompetenceDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CaseModule.forRoot({
      baseUrl: environment.baseUrl,
      apiBaseUrl: environment.apiBaseUrl,
      storagePath: environment.storagePath,
      appName: environment.appName,
      tokenName: environment.tokenName,
      tokenAllowedDomains: environment.tokenAllowedDomains,
      production: environment.production,
      isOnboarding: environment.isOnboarding,
      googlePlacesAPIKey: 'myGoogleAPIKey'
    })
  ],
  providers: [{ provide: ErrorHandler, useFactory: errorHandlerFactory }],
  bootstrap: [AppComponent]
})
export class AppModule {}
