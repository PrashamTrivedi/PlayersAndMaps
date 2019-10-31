import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Player, DataServiceAndPlayers } from 'src/datatypes';
import { DatalayerService } from '../datalayer.service';

@Component({
  selector: 'app-inactive-player-dialog',
  templateUrl: './inactive-player-dialog.component.html',
  styleUrls: ['./inactive-player-dialog.component.css']
})
export class InactivePlayerDialogComponent implements OnInit {


  inactivePlayers: Player[];
  dataService: DatalayerService;

  constructor(public dialogRef: MatDialogRef<InactivePlayerDialogComponent>,
    // tslint:disable-next-line:align
    @Inject(MAT_DIALOG_DATA) public serviceAndPlayers: DataServiceAndPlayers) {
    this.dataService = serviceAndPlayers.dataService;
    this.inactivePlayers = serviceAndPlayers.players;
  }


  activatePlayer(player: Player) {

    const index = this.inactivePlayers.findIndex((playerToFind) => playerToFind.id === player.id);
    this.dataService.activatePlayer(player).subscribe(() => {
      if (index !== -1) {
        this.inactivePlayers.splice(index, 1);
      }
    });
  }

  ngOnInit() {
  }

}
