import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Vis1Component } from './vis1/vis1.component';
import { SoundcloudComponent } from './soundcloud/soundcloud.component';


@NgModule({
  declarations: [
    AppComponent,
    Vis1Component,
    SoundcloudComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
