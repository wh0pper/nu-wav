import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatabaseService } from './database.service';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './api-keys';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SoundcloudComponent } from './soundcloud/soundcloud.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';

export const MasterFirebase = {
  apiKey: firebaseConfig.apiKey,
  authDomain:  firebaseConfig.authDomain,
  databaseURL:  firebaseConfig.databaseURL,
  storageBucket:  firebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SoundcloudComponent,
    WelcomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
