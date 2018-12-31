import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { PetloveComponent } from './modules/petlove/petlove.component';
import { SinglepetComponent } from './modules/singlepet/singlepet.component';
import { AboutComponent } from './modules/about/about.component';
import { GalleryComponent } from './modules/gallery/gallery.component';
import { ServicesComponent } from './modules/services/services.component';
import { RegisterComponent } from './modules/register/register.component';
import { EventsComponent } from './modules/events/events.component';
import { SignupComponent } from './modules/signup/signup.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'petlove', component: PetloveComponent },
  { path: 'petlove/:type/:service', component: PetloveComponent },
  { path: 'petdetails/:id', component: SinglepetComponent },
  { path: 'petdetails/:type/:id', component: SinglepetComponent },
  { path: 'about', component: AboutComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'events', component: EventsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'signup', component: SignupComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
