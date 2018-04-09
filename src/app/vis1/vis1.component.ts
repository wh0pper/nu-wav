import { Component, OnInit } from '@angular/core';
declare var p5: any;

@Component({
  selector: 'app-vis1',
  templateUrl: './vis1.component.html',
  styleUrls: ['./vis1.component.css']
})
export class Vis1Component implements OnInit {
  // private player;
  song;
  amplitude;
  constructor() { }

  ngOnInit() {
    const s = (p) => {
      p.setup = () => {
        const canvasWidth = 1450; //p.windowWidth;
        const canvasHeight = 600; //p.windowHeight;
        p.createCanvas(canvasWidth, canvasHeight);
        this.song = p.loadSound('../assets/resonance.mp3', p.loaded);
        this.amplitude = new p5.Amplitude();
        p.frameRate(60);
        console.log(this.song);
      }

      p.draw = () => { //infinite looping
        // console.log("drawing");
        p.background(0);
        var vol = this.amplitude.getLevel();
        p.fill(255);
        p.stroke(255);
        p.ellipse(p.width/2,p.height/2,500*vol,500*vol);


        p.fill(0);
        p.ellipse(p.width/2,p.height/2,200*vol,200*vol);

        p.fill('rgba(0,0,0,0)');
        p.stroke(255, 0, 0);
        p.ellipse(p.width/2,p.height/2,100/vol,100/vol);
      }

      p.mousePressed = () => {
        console.log("mouse press");
        if ( this.song.isPlaying() ) {
          this.song.pause();
        } else {
          this.song.play();
        }
      }

      p.loaded = () => {
        console.log("song loaded");
        console.log(this.song);
        this.song.play();
      }

    }
    let player = new p5(s);
  }

  // loaded() {
  //   console.log("song loaded");
  //   console.log(this.song);
  //   this.song.play();
  // }






}
