import { Component, OnInit } from '@angular/core';
declare var p5: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {
  songPaths: string[] = ['../assets/resonance.mp3', '../assets/disco.mp3', '../cool-song.mp3'];
  songIndex: number = 0;
  song;
  amplitude;
  effect1;
  effect2;
  fft;

  constructor() { }

  ngOnInit() {
    this.setupForEffectOne();
  }

  selectNewSong() {
    if (this.songIndex < this.songPaths.length) {
      this.songIndex++;
    } else {
      this.songIndex = 0;
    }
  }

  setupForEffectOne() {
    let propertyFunction = (p) => {

      p.setup = () => {
        var cnv = p.createCanvas(p.windowWidth, p.windowHeight);
        cnv.position(100, 100);
        var x = (p.windowWidth - p.width) / 2;
        var y = (p.windowHeight - p.height) / 2;
        cnv.position(x, y);
        p.background('rgba(0,0,0,0)');

        p.clear();
        // const canvasWidth = 1000;
        const canvasHeight = p.windowHeight;
        const canvasWidth = p.windowWidth;
        // p.windowHeight;
        this.effect1 = p.createCanvas(canvasWidth, canvasHeight);
        this.song = p.loadSound('../assets/resonance.mp3', p.loaded);
        // this.amplitude = new p5.Amplitude();
        this.fft = new p5.FFT(0.5, 128);
        p.frameRate(30);
      };

      p.draw = () => {
        p.background(0);

        // let songVol = this.amplitude.getLevel();
        let spectrum = this.fft.analyze();
        // console.log(songVol);

        for (var i=0; i < spectrum.length; i++) {
          let thisAmp = spectrum[i];
          p.stroke(0,0,0);
          p.fill(255,255,255);
          let x = i * 10;
          p.rect(x, 0, 8, spectrum[i])
        }
        // p.fill(255,100,100);
        // p.rect(p.windowWidth, p.windowHeight, 10, 10);
        // p.rect(0, 0, 100, 100);

        // p.fill(255);
        // p.stroke(255);
        // p.ellipse(p.width / 1.2, p.height / 3, 500 * songVol, 500 * songVol);

        // p.fill(0);
        // p.ellipse(p.width / 1.2, p.height / 3, 200 * songVol, 200 * songVol);
        // p.fill('rgba(0,0,0,0)');
        // p.stroke(255, 0, 0);
        // p.ellipse(p.width / 1.2, p.height / 3, 100 / songVol, 100 / songVol);
        //
        // p.fill(255);
        // p.stroke(255);
        // p.ellipse(p.width/5, p.height / 3, 500 * songVol, 500 * songVol);
        //
        // p.fill(0);
        // p.ellipse(p.width/5, p.height / 3, 200 * songVol, 200 * songVol);
        // p.fill('rgba(0,0,0,0)');
        // p.stroke("#FFD700");
        // p.ellipse(p.width/5, p.height / 3, 100 / songVol, 100 / songVol);
      }

      p.loaded = () => {
        console.log("song loaded");
        console.log(this.song);
        // this.song.play(); //to play song once song is loaded.
      };

    }
    this.instantiateP5(propertyFunction);
  }

  // setupForEffectTwo() {
  //   let propertyFunction = (p) => {
  //     p.setup = () => {
  //       p.clear();
  //       // const canvasWidth = 800; //p.windowWidth;
  //       // const canvasHeight = 500; //p.windowHeight;
  //       this.effect1 = p.createCanvas(p.windowWidth, p.windowHeight);
  //       this.amplitude = new p5.Amplitude();
  //       p.frameRate(60);
  //     };
  //
  //     p.draw = () => {
  //       p.background(0);
  //
  //       let songVol = this.amplitude.getLevel();
  //
  //       p.fill(255);
  //       p.stroke(255);
  //       p.ellipse(p.width / 2, p.height, 500 * songVol, 100 * songVol); //swap micVol and songVol to show vis of different inputs
  //
  //       p.fill(0);
  //       p.ellipse(p.width / 2, p.height, 200 * songVol, 50 * songVol); //swap micVol and songVol to show vis of different inputs
  //       p.fill('rgba(0,0,0,0)');
  //       p.stroke(255, 0, 0);
  //       p.ellipse(p.width / 2, p.height, 100 / songVol, 50 / songVol); //swap micVol and songVol to show vis of different inputs
  //     };
  //   };
  //   this.instantiateP5(propertyFunction);
  // }

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
