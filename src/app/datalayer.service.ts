import { Injectable } from '@angular/core';
import { Player, Map } from 'src/datatypes';
import { Players } from 'src/preloaded/players';
import { Maps } from 'src/preloaded/maps';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatalayerService {

  constructor() { }

  private players = Players;

  private maps = Maps;

  getPlayers(): Observable<Player[]> {
    return of(this.players);
  }

  getMaps(): Map[] {
    return this.maps;
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

}
