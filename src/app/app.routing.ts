import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component'
import { PlayerComponent } from './player/player.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
