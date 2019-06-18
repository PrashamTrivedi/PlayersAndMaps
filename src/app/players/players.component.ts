import { Component, OnInit } from '@angular/core';
import { Players } from 'src/preloaded/players';
import { Player } from 'src/datatypes';
import { DatalayerService } from '../datalayer.service';

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

  noOfTeams = 1;

  randomTeams: [string, Player[]][] = [];

  constructor(private datalayer: DatalayerService) {
  }

  isCtf(checked: boolean) {
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
    // if (checked) {
    //   this.selectedPlayers.push(player);
    // } else {
    //   const index = this.selectedPlayers.indexOf(player);
    //   console.log(index);
    //   this.selectedPlayers.splice(index, 1);
    // }
    this.noOfSelectedPlayers = this.playersAndSelection.filter((tuple) => {
      return tuple[0];
    }).length;
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

    const lengthOfFirstArray = this.noOfSelectedPlayers / this.noOfTeams;
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

    this.randomTeams = teams;
    console.log(teams);
  }

  ngOnInit() {
    //TODO: Check if data is empty then enter players
    this.datalayer.getPlayers().subscribe((players => {
      this.players = players;
      this.players.forEach((player) => {
        this.playersAndSelection.push([false, player]);
      });
    }));


  }

}
