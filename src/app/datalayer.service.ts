import { Injectable } from '@angular/core';
import { Player, Map } from 'src/datatypes';
import { Players } from 'src/preloaded/players';
import { Maps } from 'src/preloaded/maps';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class DatalayerService {

  constructor(private storageMap: StorageMap) { }

  private players = Players;

  private maps = Maps;

  selectedPlayersCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  setSelectedPlayersCount(setSelectedPlayersCount: number): void {
    console.log(`Setting ${setSelectedPlayersCount}`);
    this.selectedPlayersCount.next(setSelectedPlayersCount);
  }

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

  updateMap(map: Map) {
    const index = this.maps.findIndex((mapToFind) => {
      return mapToFind.id === map.id;
    });
    this.maps[index] = map;
    this.storageMap.set('maps', this.maps).subscribe(() => { });
  }
}
