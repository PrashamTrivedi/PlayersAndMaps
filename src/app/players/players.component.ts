import { Component, OnInit } from '@angular/core';
import { Player } from 'src/datatypes';
import { DatalayerService } from '../datalayer.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddplayerdialogComponent } from '../addplayerdialog/addplayerdialog.component';
import { BehaviorSubject } from 'rxjs';


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

  randomTeams: [string, Player[]][] = [];

  constructor(private datalayer: DatalayerService, public dialog: MatDialog) {
  }

  isCtf(checked: boolean) {
    this.isCtfMode = checked;
    if (checked) {
      this.noOfTeams = 2;
    } else {
      this.noOfTeams = 1;
    }
  }

  selectAll(checked: boolean) {
    this.playersAndSelection = [];
    this.players.forEach((player) => {
      this.playersAndSelection.push([checked, player]);
    });
    if (checked) {
      this.selectedPlayers = this.players;
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
    let t: Player = { name: '', id: -1, nickName: '' };
    if (l <= 1) { return; }
    while (l) {
      i = Math.floor(Math.random() * l--);
      t = shuffledArray[l];
      shuffledArray[l] = shuffledArray[i];
      shuffledArray[i] = t;
    }
    let middlePlayer: Player = { id: -1, name: '', nickName: '' };
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
    // teams.push(shuffledTeams)

    this.randomTeams = teams;

    this.datalayer.setSelectedPlayersCount(shuffledArray.length);

    console.log(teams);
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
    this.datalayer.getPlayers().subscribe((players) => {
      if (players === undefined || players === null) {
        this.datalayer.insertPlayers().subscribe(() => {
          this.datalayer.getPlayers().subscribe((playersList) => {
            this.fillPlayers(playersList);
          });
        });
      } else {
        console.log(players);
        console.log(players instanceof Array);
        this.fillPlayers(players);
      }
    });
  }


  private fillPlayers(players: unknown) {
    if (players instanceof Array) {
      this.players = players;
      this.players.forEach((player) => {
        this.playersAndSelection.push([false, player]);
      });
    }
  }
}
