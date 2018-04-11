import { Component, OnInit } from '@angular/core';
import * as SC from 'soundcloud';
import { soundcloud_key } from '../api-keys';

@Component({
  selector: 'app-soundcloud',
  templateUrl: './soundcloud.component.html',
  styleUrls: ['./soundcloud.component.css']
})
export class SoundcloudComponent implements OnInit {
  public tracks;
  constructor() { }

  ngOnInit() {
    console.log('sc initialize');
    SC.initialize({

      client_id: soundcloud_key,
      //redirect_uri: 'http://example.com/callback'
    });
    //
  }

  playSong() {
    let songURL = "https://soundcloud.com/mad-colour/die-antwoord-dis-is-why-im-hot-madcolour-remix";

    // SC.get('/resolve.json?url=' + songURL).then(function(tracks){
    //   console.log(tracks.id)
    //   SC.stream('/tracks/' + tracks.id).then(function(player){
    //     player.play();
    //   });
    }
  }
