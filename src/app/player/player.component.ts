import { Component, OnInit } from '@angular/core';
declare var p5: any;

@Component ({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {
  // songPaths: string[] = ['../assets/resonance.mp3', '../assets/disco.mp3', '../cool-song.mp3'];
  // songIndex: number = 0;
  beatHoldFrames: number = 30;
  beatThreshold: number = 0.11;
  beatCutoff: number = 0;
  beatDecayRate: number = 0.98;
  framesSinceLastBeat: number = 0;

  song;
  amplitude;
  effect1;
  effect2;
  fft;
  level;

  colors;
  center;
  pointCoordinates: number[];
  rotation: number = 0;

  radius: number[][] = [
    [0.935, 0.83, 0.76, 0.71],
    [0.645, 0.68, 0.57, 0.535],
    [0.57, 0.51, 0.51, 0.475]
  ];

  angles: number[][] = [
    [8, 32, 12],
    [30, 39, 8],
    [7, 29, 21.5]
  ];

  // constructor() { }

  ngOnInit() {
    this.setupForEffectOne();
  }

  // selectNewSong() {
  //   if (this.songIndex < this.songPaths.length) {
  //     this.songIndex++;
  //   } else {
  //     this.songIndex = 0;
  //   }
  // }

  playCurrentSong() {
    if (this.song.isPlaying()) {
      this.song.pause();
    } else {
      this.song.play();
    }
  }

  setupForEffectOne() {
    let propertyFunction = (p) => {

      p.setup = () => {
        // var cnv = p.createCanvas(p.windowWidth, p.windowHeight);
        // let center = { x: p.windowWidth / 2, y: p.windowHeight / 2 };
        const intervals = 512;
        // cnv.position(center);
        // p.background('rgba(0,0,0,0)');

        // p.clear();

        p.colors = [
          p.color(200, 200, 200), // background
          p.color(0, 0, 0), // dark
          p.color(245, 245, 245), // light
          p.color(125, 147, 161), // color #1
          p.color(145, 171, 172), // color #2
          p.color(160, 192, 203), // color #3
          p.color(210, 221, 223) // color #4
        ];

        // const canvasHeight = p.windowHeight;
        // const canvasWidth = p.windowWidth;

        p.createCanvas(p.windowWidth, p.windowHeight);
        p.rectMode(p.center);
        this.song = p.loadSound('../assets/resonance.mp3', p.loaded);

        this.fft = new p5.FFT(0.85, intervals);

        p.amplitude = new p5.Amplitude();
        p.amplitude.setInput(p.song);
        p.amplitude.smooth(0.9);

        p.frameRate(60);
      };

      p.draw = () => {
        p.background(p.colors[0]);

        p.level = p.amplitude.getLevel();
        p.detectBeat(p.level);
        p.distortion = p.map(p.level, 0, 1, 0, 0.2);

        p.calculatePointCoordinates();

        p.drawOuterShape(0);
        p.drawLayers();
        p.drawOuterShape(1);

        p.drawInnerShape();
      }
      // let spectrum = this.fft.analyze();

      // for (var i=0; i < spectrum.length; i++) {
      //   let thisAmp = spectrum[i];
      //   p.stroke(0,0,0);
      //   p.fill(255,255,255);
      //   let x = i * 10;
      //   p.rect(x, 0, 8, spectrum[i])
      // }


      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.center = {x: p.windowWidth / 2, y: p.windowHeight / 2};
      }

      p.toRadians = (p
    .
      angles
    ) =>
      {
        return [p.angles * (Math.PI / 180)];
      }


      p.calculateDistance = (x1, y1, x2, y2, k) => {
        return [x1 + k * (x2 - x1), y1 + k * (y2 - y1)];
      }

      p.calculatePointCoordinates = () => {
        // outer shapes
        for (var s = 0; s < 2; s++) {
          var factor = 0 ? (1 + p.distortion) : (1 - p.distortion);
          p.pointCoordinates[s] = [];
          for (var i = 0; i < 3; i++) {
            p.pointCoordinates[s].push(p.calcRotated(0 - p.angles[s][1] + 120 * i, p.factor * p.radius[s][0])); // 23
            p.pointCoordinates[s].push(p.calcRotated(0 - p.angles[s][0] + 120 * i, p.factor * p.radius[s][2])); // 24
            p.pointCoordinates[s].push(p.calcRotated(120 * i, p.factor * p.radius[s][1])); // 1
            p.pointCoordinates[s].push(p.calcRotated(p.angles[s][0] + 120 * i, p.factor * p.radius[s][2])); // 2
            p.pointCoordinates[s].push(p.calcRotated(p.angles[s][1] + 120 * i, factor * p.radius[s][0])); // 3
            p.pointCoordinates[s].push(p.calcRotated(60 - p.angles[s][2] + 120 * i, p.factor * p.radius[s][3])); // 4
            p.pointCoordinates[s].push(p.calcRotated(60 + 120 * i, factor * p.radius[s][2])); // 5
            p.pointCoordinates[s].push(p.calcRotated(60 + p.angles[s][2] + 120 * i, p.factor * p.radius[s][3])); // 6
          }
        }


        // inner shapes
        p.pointCoordinates[2] = [];
        for (var i = 0; i < 3; i++) {
          p.pointCoordinates[2].push(p.calcRotated(60 + 120 * i, 0.025)); // 0 (origo)
          p.pointCoordinates[2].push(p.calcRotated(p.angles[2][0] + 120 * i, (1 - p.distortion) * p.radius[2][0])); // 1
          p.pointCoordinates[2].push(p.calcRotated(60 - p.angles[2][1] + 120 * i, (1 - p.distortion) * p.radius[2][2])); // 2
          p.pointCoordinates[2].push(p.calcRotated(60 - p.angles[2][2] + 120 * i, (1 - p.distortion) * p.radius[2][0])); // 3
          p.pointCoordinates[2].push(p.calcRotated(60 - p.angles[2][0] + 120 * i, (1 - p.distortion) * p.radius[2][3])); // 4
          p.pointCoordinates[2].push(p.calcRotated(60 + 120 * i, (1 - p.distortion) * p.radius[2][1])); // 5
          p.pointCoordinates[2].push(p.calcRotated(60 + p.angles[2][0] + 120 * i, (1 - p.distortion) * p.radius[2][3])); // 6
          p.pointCoordinates[2].push(p.calcRotated(60 + p.angles[2][2] + 120 * i, (1 - p.distortion) * p.radius[2][0])); // 7
          p.pointCoordinates[2].push(p.calcRotated(60 + p.angles[2][1] + 120 * i, (1 - p.distortion) * p.radius[2][2])); // 8
          p.pointCoordinates[2].push(p.calcRotated(120 - p.angles[2][0] + 120 * i, (1 - p.distortion) * p.radius[2][0])); // 9
        }
      }
      p.calcRotated(p.angle, p.radius)
      {
        return [
          -Math.sin(p.toRadians(p.angle + p.rotation)) * ((p.center.y - p.windowHeight * p.radius / 2) - p.center.y) + p.center.x,
          Math.cos(p.toRadians(p.angle + p.rotation)) * ((p.center.y - p.windowHeight * p.radius / 2) - p.center.y) + p.center.y
        ];
      }


      p.drawOuterShape = (which) => {
        p.fill(p.colors[which + 1]);
        p.strokeWeight(0);

        p.beginShape();

        for (let i = 0; i < p.pointCoordinates[which].length; i++) {
          p.vertex(p.pointCoordinates[which][i][0], p.pointCoordinates[which][i][1]);
        }
        p.endShape(close);
      }

      p.drawInnerShape = () => {
        for (var i = 0; i < 3; i++) {
          p.noStroke();
          // A
          p.fill(p.colors[1]);
          p.beginShape();
          p.vertex(p.pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.vertex(p.pointCoordinates[2][1 + i * 10][0], p.pointCoordinates[2][1 + i * 10][1]);
          p.newpoint = p.calculateDistance(
            p.pointCoordinates[2][1 + i * 10][0], p.pointCoordinates[2][1 + i * 10][1],
            p.pointCoordinates[2][2 + i * 10][0], p.pointCoordinates[2][2 + i * 10][1],
            1 / 3);
          p.vertex(p.newpoint[0], p.newpoint[1]);
          p.vertex(p.pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.endShape(close);

          // B
          p.fill(colors[6]);
          p.beginShape();
          p.vertex(p.pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.newpoint = p.calculateDistance(
            p.pointCoordinates[2][1 + i * 10][0], p.pointCoordinates[2][1 + i * 10][1],
            p.pointCoordinates[2][2 + i * 10][0], p.pointCoordinates[2][2 + i * 10][1],
            1 / 3);
          p.vertex(p.newpoint[0], p.newpoint[1]);
          p.vertex(pointCoordinates[2][2 + i * 10][0], p.pointCoordinates[2][2 + i * 10][1]);
          p.vertex(pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.endShape(close);

          // C
          p.fill(p.colors[1]);
          p.beginShape();
          p.vertex(p.pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.vertex(p.pointCoordinates[2][2 + i * 10][0], p.pointCoordinates[2][2 + i * 10][1]);
          p.vertex(pointCoordinates[2][3 + i * 10][0], p.pointCoordinates[2][3 + i * 10][1]);
          p.vertex(pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.endShape(close);

          // D
          p.fill(colors[5]);
          p.beginShape();
          p.vertex(pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.vertex(pointCoordinates[2][3 + i * 10][0], p.pointCoordinates[2][3 + i * 10][1]);
          p.vertex(pointCoordinates[2][4 + i * 10][0], p.pointCoordinates[2][4 + i * 10][1]);
          p.vertex(pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.endShape(close);

          // E
          p.fill(colors[1]);
          p.beginShape();
          p.vertex(p.pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.vertex(p.pointCoordinates[2][4 + i * 10][0], p.pointCoordinates[2][4 + i * 10][1]);
          p.newpoint = p.calculateDistance(
            p.pointCoordinates[2][4 + i * 10][0], p.pointCoordinates[2][4 + i * 10][1],
            p.pointCoordinates[2][5 + i * 10][0], p.pointCoordinates[2][5 + i * 10][1],
            1 / 1.75);
          p.vertex(p.newpoint[0], p.newpoint[1]);
          p.vertex(p.pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.endShape(close);

          // F
          p.fill(colors[4]);
          p.beginShape();
          p.vertex(p.pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.newpoint = p.calculateDistance(
            p.pointCoordinates[2][4 + i * 10][0], p.pointCoordinates[2][4 + i * 10][1],
            p.pointCoordinates[2][5 + i * 10][0], p.pointCoordinates[2][5 + i * 10][1],
            1 / 1.75);
          p.vertex(p.newpoint[0], p.newpoint[1]);
          p.vertex(p.pointCoordinates[2][5 + i * 10][0], p.pointCoordinates[2][5 + i * 10][1]);
          p.newpoint = p.calculateDistance(
            p.pointCoordinates[2][6 + i * 10][0], p.pointCoordinates[2][6 + i * 10][1],
            p.pointCoordinates[2][5 + i * 10][0], p.pointCoordinates[2][5 + i * 10][1],
            1 / 1.75);
          p.vertex(p.newpoint[0], p.newpoint[1]);
          p.vertex(p.pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.endShape(close);

          // G
          p.fill(colors[1]);
          p.beginShape();
          p.vertex(pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.vertex(pointCoordinates[2][6 + i * 10][0], p.pointCoordinates[2][6 + i * 10][1]);
          p.newpoint = p.calculateDistance(
            p.pointCoordinates[2][6 + i * 10][0], p.pointCoordinates[2][6 + i * 10][1],
            p.pointCoordinates[2][5 + i * 10][0], p.pointCoordinates[2][5 + i * 10][1],
            1 / 1.75);
          p.vertex(p.newpoint[0], np.ewpoint[1]);
          p.vertex(p.pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.endShape(close);

          // H
          p.fill(colors[5]);
          p.beginShape();
          p.vertex(pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.vertex(pointCoordinates[2][6 + i * 10][0], p.pointCoordinates[2][6 + i * 10][1]);
          p.vertex(pointCoordinates[2][7 + i * 10][0], p.pointCoordinates[2][7 + i * 10][1]);
          p.vertex(pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.endShape(close);

          // I
          p.fill(colors[1]);
          p.beginShape();
          p.vertex(pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.vertex(pointCoordinates[2][7 + i * 10][0], p.pointCoordinates[2][7 + i * 10][1]);
          p.vertex(pointCoordinates[2][8 + i * 10][0], p.pointCoordinates[2][8 + i * 10][1]);
          p.vertex(pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.endShape(close);

          // J
          p.fill(colors[6]);
          p.beginShape();
          p.vertex(pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.vertex(pointCoordinates[2][8 + i * 10][0], p.pointCoordinates[2][8 + i * 10][1]);
          p.newpoint = p.calculateDistance(
            p.pointCoordinates[2][9 + i * 10][0], p.pointCoordinates[2][9 + i * 10][1],
            p.pointCoordinates[2][8 + i * 10][0], p.pointCoordinates[2][8 + i * 10][1],
            1 / 3);
          p.vertex(p.newpoint[0], p.newpoint[1]);
          p.vertex(p.pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.endShape(close);

          // K
          p.fill(colors[1]);
          p.beginShape();
          p.vertex(p.pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.vertex(p.pointCoordinates[2][9 + i * 10][0], p.pointCoordinates[2][9 + i * 10][1]);
          p.newpoint = p.calculateDistance(
            p.pointCoordinates[2][9 + i * 10][0], p.pointCoordinates[2][9 + i * 10][1],
            p.pointCoordinates[2][8 + i * 10][0], p.pointCoordinates[2][8 + i * 10][1],
            1 / 3);
          p.vertex(p.newpoint[0], p.newpoint[1]);
          p.vertex(p.pointCoordinates[2][0 + i * 10][0], p.pointCoordinates[2][0 + i * 10][1]);
          p.endShape(close);

          p.stroke(p.colors[1]);
          p.strokeWeight(1.5);

          for (var j = 1; j < 9; j++) {
            p.line(
              p.pointCoordinates[2][j + i * 10][0], p.pointCoordinates[2][j + i * 10][1],
              p.pointCoordinates[2][j + 1 + i * 10][0], p.pointCoordinates[2][j + 1 + i * 10][1]
            );
          }
        }
      }


      p.drawLayers = () => {
        for (var i = 1; i < 9; i++) {
          p.beginShape();

          switch (i) {
            case 1:
              p.fill(colors[3]);
              break;
            case 3:
              p.fill(colors[4]);
              break;
            case 5:
              p.fill(colors[5]);
              break;
            case 7:
              p.fill(colors[6]);
              break;
            default:
              p.fill(colors[1]);
          }

          for (var p = 0; p < pointCoordinates[0].length; p++) {
            p.newpoint = p.calculateDistance(
              p.pointCoordinates[0][p][0], p.pointCoordinates[0][p][1],
              p.pointCoordinates[1][p][0], p.pointCoordinates[1][p][1],
              i / 9);
            p.vertex(p.newpoint[0], p.newpoint[1]);
          }

          p.endShape(close);
        }
      }


      p.detectBeat = (level) => {
        if (p.level > p.beatCutoff && p.level > p.beatThreshold) {
          p.rotation += p.random(0, 25);
          p.beatCutoff = level * 1.2;
          p.framesSinceLastBeat = 0;
        }
        else {
          if (p.framesSinceLastBeat <= p.beatHoldFrames) {
            p.framesSinceLastBeat++;
          }
          else {
            p.beatCutoff *= p.beatDecayRate;
            p.beatCutoff = Math.max(p.beatCutoff, p.beatThreshold);
          }
        }
      }

      p.loaded = () => {
        console.log("song loaded");
        this.song.play();
      };

    this.instantiateP5(propertyFunction);}
  }
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
  // p.instantiateP5(s) {
  //   let p.player = new p.p5(s);
  // }
