import { Component, OnInit } from '@angular/core';
declare var p5: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {
  song;
  amplitude;
  effect1;
  effect2;

  constructor() { }

  ngOnInit() {
    this.setupForEffectOne();
  }

  setupForEffectOne() {
    let propertyFunction = (p) => {
      p.setup = () => {
        p.clear();
        // const canvasWidth = 1000;
        const canvasHeight = 500;
        p.windowWidth;
        p.windowHeight;
        this.effect1 = p.createCanvas(p.windowWidth, canvasHeight);
        this.song = p.loadSound('../assets/cantthinkofanameyet_36.mp3', p.loaded);
        this.amplitude = new p5.Amplitude();
        p.frameRate(30);
      }

      p.draw = () => {
        p.background(0);

        let songVol = this.amplitude.getLevel();

        p.fill(255);
        p.stroke(255);
        p.ellipse(p.width / 2, p.height / 2, 500 * songVol, 500 * songVol); //swap micVol and songVol to show vis of different inputs

        p.fill(0);
        p.ellipse(p.width/2,p.height/2,200*songVol,200*songVol); //swap micVol and songVol to show vis of different inputs
        p.fill('rgba(0,0,0,0)');
        p.stroke(255, 0, 0);
        p.ellipse(p.width/2,p.height/2,100/songVol,100/songVol); //swap micVol and songVol to show vis of different inputs
      }

      p.loaded = () => {
        console.log("song loaded");
        console.log(this.song);
        // this.song.play(); //to play song once song is loaded.
      }

    }
    this.instantiateP5(propertyFunction);
  }

  setupForEffectTwo() {
    let propertyFunction = (p) => {
      p.setup = () => {
        p.clear();
        const canvasWidth = 800; //p.windowWidth;
        const canvasHeight = 500; //p.windowHeight;
        this.effect1 = p.createCanvas(canvasWidth, canvasHeight);
        this.amplitude = new p5.Amplitude();
        p.frameRate(60);
      }

      p.draw = () => {
        p.background(0);

        let songVol = this.amplitude.getLevel();

        p.fill(255);
        p.stroke(255);
        p.ellipse(p.width/2,p.height/2,500*songVol,100*songVol); //swap micVol and songVol to show vis of different inputs

        p.fill(0);
        p.ellipse(p.width/2,p.height/2,200*songVol,50*songVol); //swap micVol and songVol to show vis of different inputs
        p.fill('rgba(0,0,0,0)');
        p.stroke(255, 0, 0);
        p.ellipse(p.width/2,p.height/2,100/songVol,50/songVol); //swap micVol and songVol to show vis of different inputs
      }
    }
    this.instantiateP5(propertyFunction);
  }

  instantiateP5(s) {
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
