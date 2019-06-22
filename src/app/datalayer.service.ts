import { Injectable } from '@angular/core';
import { Player, Map } from 'src/datatypes';
import { Players } from 'src/preloaded/players';
import { Maps } from 'src/preloaded/maps';
import { Observable, of } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class DatalayerService {

  constructor(private storageMap: StorageMap) { }

  private players = Players;

  private maps = Maps;

  insertPlayers(): Observable<undefined> {
    return this.storageMap.set('players', Players);
  }

  insertMaps(): Observable<undefined> {
    return this.storageMap.set('maps', Maps);
  }

  getPlayers(): Observable<unknown> {

    return this.storageMap.get<Player[]>('players');
  }

  getMaps(): Observable<unknown> {
    return this.storageMap.get<Map[]>('maps');
  }

  addMap(map: Map) {
    this.maps.push(map);
    this.storageMap.set('maps', this.maps).subscribe(() => { });
  }

  addPlayer(player: Player) {
    this.players.push(player);
    this.storageMap.set('players', this.players).subscribe(() => { });
  }

}
