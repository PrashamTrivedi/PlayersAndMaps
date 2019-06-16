import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players = [
    {
      name: 'Prasham',
      nickname: 'LordVader'
    },
    {
      name: 'Vatsal',
      nickname: 'Kaleen Bhaiya'
    },
    {
      name: 'KP',
      nickname: 'Bond'
    },
    {
      name: 'Karn',
      nickname: 'KillerMachine'
    },
    {
      name: 'Joshi',
      nickname: 'Wolverine'
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
