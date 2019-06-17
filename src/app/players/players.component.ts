import { Component, OnInit } from '@angular/core';
import { Players } from 'src/preloaded/players';
import { Player } from 'src/datatypes';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players = Players;

  selectedPlayers: Player[] = [];

  noOfSelectedPlayers = 0;

  noOfTeams = 1;

  randomTeams: Player[][] = [];

  constructor() { }

  onPlayerSelectionChanged(player: Player, checked: boolean) {
    console.log(`Player ${player.name} is Checked ${checked}`);
    if (checked) {
      this.selectedPlayers.push(player);
    } else {
      const index = this.selectedPlayers.indexOf(player);
      console.log(index);
      this.selectedPlayers.splice(index, 1);
    }
    this.noOfSelectedPlayers = this.selectedPlayers.length;
  }

  shuffleAndDivide() {
    const shuffledArray: Player[] = this.selectedPlayers;
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
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);

    this.randomTeams = teams;
    console.log(teams);
  }

  ngOnInit() {
  }

}
