import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SoundcloudComponent } from './soundcloud/soundcloud.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SoundcloudComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
