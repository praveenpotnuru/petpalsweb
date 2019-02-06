import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { ToastaModule } from '../../projects/ngx-toasta/src/public_api';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors';
import { AboutComponent } from './modules/about/about.component';
import { AddpetComponent } from './modules/addpet/addpet.component';
import { EventsComponent } from './modules/events/events.component';
import { GalleryComponent } from './modules/gallery/gallery.component';
import { HomeComponent } from './modules/home/home.component';
import { MypetsComponent } from './modules/mypets/mypets.component';
import { MyrequestsComponent } from './modules/myrequests/myrequests.component';
import { PetloveComponent } from './modules/petlove/petlove.component';
import { RegisterComponent } from './modules/register/register.component';
import { ServicesComponent } from './modules/services/services.component';
import { SignupComponent } from './modules/signup/signup.component';
import { SinglepetComponent } from './modules/singlepet/singlepet.component';
import { AuthService } from './services/auth.service';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { MastFooterComponent } from './shared/components/mast-footer/mast-footer.component';
import { MastHeadComponent } from './shared/components/mast-head/mast-head.component';
import { NavMenuComponent } from './shared/components/nav-menu/nav-menu.component';
import { NumbersOnlyDirective } from './shared/directives/numbers-only.directive';
import {OverlayModule} from '@angular/cdk/overlay';
import { IconlistComponent } from './shared/components/iconlist/iconlist.component';
import { ProductsComponent } from './modules/products/products.component';
import { ContactusComponent } from './modules/contactus/contactus.component';
import { HowitworksComponent } from './modules/howitworks/howitworks.component';
import { PetnewsComponent } from './modules/petnews/petnews.component';
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
    NumbersOnlyDirective,
    MyrequestsComponent,
    MypetsComponent,
    AddpetComponent,
    LoaderComponent,
    IconlistComponent,
    ProductsComponent,
    ContactusComponent,
    HowitworksComponent,
    PetnewsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    OverlayModule,
    MatDatepickerModule,
    MatTabsModule,
    DeferLoadModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ToastaModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
