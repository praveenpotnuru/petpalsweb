import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors';
import { AboutComponent } from './modules/about/about.component';
import { EventsComponent } from './modules/events/events.component';
import { GalleryComponent } from './modules/gallery/gallery.component';
import { HomeComponent } from './modules/home/home.component';
import { PetloveComponent } from './modules/petlove/petlove.component';
import { RegisterComponent } from './modules/register/register.component';
import { ServicesComponent } from './modules/services/services.component';
import { SinglepetComponent } from './modules/singlepet/singlepet.component';
import { MastFooterComponent } from './shared/components/mast-footer/mast-footer.component';
import { MastHeadComponent } from './shared/components/mast-head/mast-head.component';
import { NavMenuComponent } from './shared/components/nav-menu/nav-menu.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './modules/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    MastHeadComponent,
    MastFooterComponent,
    NavMenuComponent,
    HomeComponent,
    PetloveComponent,
    SinglepetComponent,
    AboutComponent,
    ServicesComponent,
    GalleryComponent,
    EventsComponent,
    RegisterComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [httpInterceptorProviders,
    AuthService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
