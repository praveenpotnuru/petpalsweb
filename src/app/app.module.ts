import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MastHeadComponent } from './shared/components/mast-head/mast-head.component';
import { MastFooterComponent } from './shared/components/mast-footer/mast-footer.component';
import { NavMenuComponent } from './shared/components/nav-menu/nav-menu.component';
import { HomeComponent } from './modules/home/home.component';
import { PetloveComponent } from './modules/petlove/petlove.component';
import { SinglepetComponent } from './modules/singlepet/singlepet.component';
import { AboutComponent } from './modules/about/about.component';
import { ServicesComponent } from './modules/services/services.component';
import { GalleryComponent } from './modules/gallery/gallery.component';
import { EventsComponent } from './modules/events/events.component';
import { RegisterComponent } from './modules/register/register.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
