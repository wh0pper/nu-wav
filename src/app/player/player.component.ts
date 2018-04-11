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
  mic;
  fft;

  constructor() { }

  ngOnInit() {
    const s = (p) => {
      p.setup = () => {
        const canvasWidth = 800; // p.windowWidth;
        const canvasHeight = 500; // p.windowHeight;
        p.createCanvas(canvasWidth, canvasHeight);
        this.song = p.loadSound('../assets/resonance.mp3', p.loaded);
        this.amplitude = new p5.Amplitude();
        this.fft = new p5.FFT();
        this.mic = new p5.AudioIn(); // for mic input vis
        this.mic.start(); // for mic input vis
        p.frameRate(60);
      };


      function draw() {
        p.background(0);
        p.fill(255);
        var level = this.amplitude.getLevel();
        var size = p.map(level, 0, 1, 0, 200);
        p.ellipse(p.width/2, p.height/2, size, size);
      }

      p.draw = () => {
        p.background(0);

        // this.song.play();

        const waveform = this.fft.waveform();  // analyze the waveform
        const micVol = this.mic.getLevel();
        const songVol = this.amplitude.getLevel();
        console.log(songVol);

        p.fill(255);
        p.stroke(255);
        // p.ellipse(p.width / 1.1875, p.height / 2.25, 500 * micVol, 500 * micVol); // swap micVol and songVol to show vis of different inputs
        p.ellipse(p.width / 1.1875, p.height / 2.25, 500 * songVol, 500 * songVol);

        p.fill(0);
        // p.ellipse(p.width / 1.1875, p.height / 2.25, 200 * micVol, 200 * micVol); // swap micVol and songVol to show vis of different inputs
        p.ellipse(p.width / 1.1875, p.height / 2.25, 200 * songVol, 200 * songVol); // swap micVol and songVol to show vis of different inputs


        p.fill('rgba(0,0,0,0)');
        p.stroke(255, 0, 0);
        // p.ellipse(p.width / 1.1875, p.height / 2.25, 200 / micVol, 200 / micVol); // swap micVol and songVol to show vis of different inputs
        p.ellipse(p.width / 1.1875, p.height / 2.25, 200 / songVol, 200 / songVol); // swap micVol and songVol to show vis of different inputs

      };


      p.loaded = () => {
        console.log("song loaded");
        console.log(this.song);
        this.song.play(); //to play song once song is loaded.
      };

    };
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
