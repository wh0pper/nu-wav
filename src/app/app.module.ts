import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SoundcloudComponent } from './soundcloud/soundcloud.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Vis1Component } from './vis1/vis1.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SoundcloudComponent,
    WelcomeComponent,
    NavbarComponent,
    Vis1Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
