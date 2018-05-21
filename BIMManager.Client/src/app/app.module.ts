import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routing';
import { AuthenticationModule } from './modules/authentication.module';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { ProjectService } from './services/project.service';
import { AuthenticationService } from './services/authentication.service';
import { SharedModule } from './modules/shared/shared.module';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';
import { ComplexService } from './services/complex.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    AuthService,
    ApiService,
    ProjectService,
    ComplexService,
    AuthGuard,
    PublicGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
