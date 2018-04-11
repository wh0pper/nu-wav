import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
declare var p5: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  song;
  amplitude;
  mic;

  constructor() { }

  ngOnInit() {
    const s = (p) => {
      p.setup = () => {
        const canvasWidth = 800; //p.windowWidth;
        const canvasHeight = 500; //p.windowHeight;
        p.createCanvas(canvasWidth, canvasHeight);
        this.song = p.loadSound('../assets/resonance.mp3', p.loaded);
        this.amplitude = new p5.Amplitude();
        this.mic = new p5.AudioIn(); // for mic input vis
        this.mic.start(); // for mic input vis
        p.frameRate(60);
      }

      p.draw = () => {
        p.background(0);

        let songVol = this.amplitude.getLevel();
        let micVol = this.mic.getLevel();

        p.fill(255);
        p.stroke(255);
        p.ellipse(p.width/2,p.height/2,500*micVol,500*micVol); //swap micVol and songVol to show vis of different inputs


        p.fill(0);
        p.ellipse(p.width/2,p.height/2,200*micVol,200*micVol); //swap micVol and songVol to show vis of different inputs

        p.fill('rgba(0,0,0,0)');
        p.stroke(255, 0, 0);
        p.ellipse(p.width/2,p.height/2,100/micVol,100/micVol); //swap micVol and songVol to show vis of different inputs
      }


      p.loaded = () => {
        console.log("song loaded");
        console.log(this.song);
        // this.song.play(); //to play song once song is loaded.
      }

    }
    let player = new p5(s);
  }

  playCurrentSong() {
    if ( this.song.isPlaying() ) {
      this.song.pause();
    } else {
      this.song.play();
    }
  }
}
