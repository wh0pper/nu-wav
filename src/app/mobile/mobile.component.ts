import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from '../database.service';
import { ColorPref } from '../models/colorpref.model';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css'],
  providers : [DatabaseService]
})
export class MobileComponent implements OnInit {
  colorSchemes: any[];

  constructor(public databaseService: DatabaseService) { }

  ngOnInit() {
    this.databaseService.getColors().subscribe(data => {
    this.colorSchemes = data;
 });
    console.log(this.colorSchemes);
  }
  colors(name: string, color1: string, color2: string, color3: string, color4: string) {
    this.databaseService.addColors(new ColorPref(name, color1, color2, color3, color4));

    this.databaseService.getColors().subscribe(data => {
     this.colorSchemes = data;
   });
  }

  chooseColor() {
    this.databaseService.colorDatabase();
  }
}
