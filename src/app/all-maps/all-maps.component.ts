import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataServiceAndMaps, Map } from 'src/datatypes';
import { DatalayerService } from '../datalayer.service';

@Component({
  selector: 'app-all-maps',
  templateUrl: './all-maps.component.html',
  styleUrls: ['./all-maps.component.css']
})
export class AllMapsComponent implements OnInit {
  dataService: DatalayerService;
  maps: Map[]


  constructor(public dialogRef: MatDialogRef<AllMapsComponent>,
    // tslint:disable-next-line:align
    @Inject(MAT_DIALOG_DATA) public serviceAndMaps: DataServiceAndMaps) {
    this.dataService = serviceAndMaps.dataService;
    this.maps = serviceAndMaps.maps;
  }

  resetMap(map: Map) {
    this.dataService.resetMap(map)
  }

  resetAllMaps() {
    this.dataService.resetAllMaps()
  }

  

  ngOnInit() {
  }

}
