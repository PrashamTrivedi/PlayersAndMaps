import { Component, OnInit } from '@angular/core';
import { Player } from 'src/datatypes';
import { DatalayerService } from '../datalayer.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddplayerdialogComponent } from '../addplayerdialog/addplayerdialog.component';
import { BehaviorSubject } from 'rxjs';
import { InactivePlayerDialogComponent } from '../inactive-player-dialog/inactive-player-dialog.component';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[];

  playersAndSelection: [boolean, Player][] = [];

  selectedPlayers: Player[] = [];

  noOfSelectedPlayers = 0;

  noOfTeams = 2;

  isCtfMode = true;

  hasAnyInActivePlayers = false;

  randomTeams: [string, Player[]][] = [];

  constructor(private datalayer: DatalayerService, public dialog: MatDialog) {
    this.datalayer.setIsCtf(this.isCtfMode);
  }

  getMaxPlayers(): number {
    return Math.max(2, this.noOfSelectedPlayers);
  }

  isCtf(checked: boolean) {
    this.isCtfMode = checked;
    if (checked) {
      this.noOfTeams = 2;
    }
    this.datalayer.setIsCtf(this.isCtfMode);
  }

  selectAll(checked: boolean) {
    this.playersAndSelection = [];
    this.players.filter((player) => !player.isInactive).forEach((player) => {
      this.playersAndSelection.push([checked, player]);
    });
    if (checked) {
      this.selectedPlayers = this.players.filter((player) => !player.isInactive);
    } else {
      this.selectedPlayers = [];
    }
    this.noOfSelectedPlayers = this.selectedPlayers.length;
    this.datalayer.setSelectedPlayersCount(this.noOfSelectedPlayers);

  }

  getBgColor(index: number): string {
    if (index === 0) {
      return 'blue';
    } else if (index === 1) {
      return 'orange';
    } else if (index === 2) {
      return 'cyan';
    } else if (index === 3) {
      return 'green';
    } else {
      return 'red';
    }
  }

  onPlayerSelectionChanged(player: Player, checked: boolean) {
    console.log(`Player ${player.name} is Checked ${checked}`);
    const tupleIndex = this.playersAndSelection.findIndex((tuple) => {
      return tuple[1].name === player.name;
    });
    this.playersAndSelection[tupleIndex][0] = checked;
    this.noOfSelectedPlayers = this.playersAndSelection.filter((tuple) => {
      return tuple[0];
    }).length;
    this.datalayer.setSelectedPlayersCount(this.noOfSelectedPlayers);
  }

  shuffleAndDivide() {
    const shuffledArray: Player[] = this.playersAndSelection.filter((tuple) => {
      return tuple[0];
    }).map((tuple) => {
      return tuple[1];
    });
    let l = shuffledArray.length;
    let i = 0;
    let t: Player = { name: '', id: -1, nickName: '', isInactive: false };
    if (l <= 1) { return; }
    while (l) {
      i = Math.floor(Math.random() * l--);
      t = shuffledArray[l];
      shuffledArray[l] = shuffledArray[i];
      shuffledArray[i] = t;
    }
    let middlePlayer: Player = { id: -1, name: '', nickName: '', isInactive: false };
    if (this.isCtfMode && shuffledArray.length % 2 !== 0) {
      const randomIndex = Math.floor(Math.random() * shuffledArray.length);
      middlePlayer = shuffledArray[randomIndex];
      shuffledArray.splice(randomIndex, 1);
    }

    const lengthOfFirstArray = shuffledArray.length / this.noOfTeams;
    console.log(lengthOfFirstArray);

    const teams = shuffledArray.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / lengthOfFirstArray);

      if (!resultArray[chunkIndex]) {
        const bgColor = this.getBgColor(chunkIndex);
        resultArray[chunkIndex] = [bgColor, []]; // start a new chunk
      }

      resultArray[chunkIndex][1].push(item);

      return resultArray;
    }, []);

    if (middlePlayer.id !== -1) {
      teams.push(['black', [middlePlayer]]);

    }

    this.randomTeams = teams;

    console.log(teams);
  }

  refreshData(): void {
    this.datalayer.reloadPresetData();
  }

  deactivatePlayer(player: Player) {
    this.datalayer.deactivatePlayer(player).subscribe(() => {
      this.reloadPlayers();
    });
  }

  openInactiveDialog(): void {
    const inactivePlayers = this.players.filter((player) => player.isInactive);
    console.log(inactivePlayers);
    const dialogRef = this.dialog.open(InactivePlayerDialogComponent, {
      width: '250px',

      data: { dataService: this.datalayer, players: inactivePlayers },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadPlayers();
    });

  }

  private reloadPlayers() {
    this.selectAll(false);
    this.players = [];
    this.playersAndSelection = [];
    this.loadPlayers();
  }

  openDialog(): void {
    const nextId = this.players.length + 1;
    const dialogRef = this.dialog.open(AddplayerdialogComponent, {
      width: '250px',

      data: { id: nextId, name: '', nickName: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      if (result.name !== undefined && result.name !== '') {

        this.playersAndSelection.push([false, result]);
        this.datalayer.addPlayer(result);
      }
    });
  }

  ngOnInit() {
    this.loadPlayers();
  }


  private loadPlayers() {
    this.datalayer.getPlayers().subscribe((players) => {
      if (players === undefined || players === null) {
        this.datalayer.insertPlayers().subscribe(() => {
          this.datalayer.getPlayers().subscribe((playersList) => {
            this.fillPlayers(playersList);
          });
        });
      } else {
        this.fillPlayers(players);
      }
    });
  }

  private fillPlayers(players: unknown) {
    if (players instanceof Array) {
      this.players = players;
      this.hasAnyInActivePlayers = this.players.findIndex((player) => {
        return player.isInactive;
      }) !== -1;
      this.players.filter((player) => {
        return !player.isInactive;
      }).forEach((player) => {
        this.playersAndSelection.push([false, player]);
      });
    }
  }
}
