import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { DatalayerService } from '../datalayer.service';
import { MatDialog } from '@angular/material';
import { Map } from 'src/datatypes';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})
export class MapsComponent implements OnInit {


  maps: Map[];
  playableMaps: Map[];

  noOfMaps: number;

  noOfPlayers: number;

  constructor(private datalayer: DatalayerService, public dialog: MatDialog) {

    datalayer.selectedPlayersCount.subscribe((numberOfPlayers) => {
      this.noOfPlayers = numberOfPlayers;
      this.playableMaps = [];
      if (this.noOfPlayers % 2 === 0) {
        this.noOfMaps = 3;
      } else {
        this.noOfMaps = 2;
      }
    });

  }


  ngOnInit() {

    this.datalayer.getMaps().subscribe((maps) => {
      if (maps === undefined || maps === null) {
        this.datalayer.insertMaps().subscribe(() => {
          this.datalayer.getMaps().subscribe((filledMaps) => {
            this.loadMaps(filledMaps);
          });
        });
      } else {
        this.loadMaps(maps);
      }
    });
  }

  openDialog() {

  }

  randomiseMaps() {
    const now = new Date().getMilliseconds();
    const unsortedMaps = this.maps.filter((map) => {
      return !map.isDm && map.lastPlayedAt === 0 || (now - map.lastPlayedAt >= 3 * 24 * 60 * 60 * 1000);
    }).sort((first, second) => {
      if (first.isDm) {
        return -1;
      } else if (second.isDm) {
        return 1;
      }
      if (first.lastPlayedAt === second.lastPlayedAt) {
        if (first.isSnow) {
          return -2;
        } else if (second.isSnow) {
          return 2;
        } else {
          return 0;
        }
      } else {
        return first.lastPlayedAt - second.lastPlayedAt;
      }
    });
    let l = unsortedMaps.length;
    let i = 0;
    let t: Map = { name: '', id: -1, path: '', isDm: false, isSnow: false, lastPlayedAt: 0 };
    if (l <= 1) { return; }
    while (l) {
      i = Math.floor(Math.random() * l--);
      t = unsortedMaps[l];
      unsortedMaps[l] = unsortedMaps[i];
      unsortedMaps[i] = t;
    }

    this.playableMaps = unsortedMaps.slice(0, this.noOfMaps);
  }

  private loadMaps(maps: unknown) {
    if (maps instanceof Array) {
      this.maps = maps;
      console.log(this.maps);
    }

  }

  selectMaps() {
    const now = new Date().getMilliseconds();
    this.playableMaps.map((mapData) => {
      mapData.lastPlayedAt = now;
      console.log(mapData);
      this.datalayer.updateMap(mapData);
    });
  }

}
