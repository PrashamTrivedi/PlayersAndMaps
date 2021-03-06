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

  constructor(private storageMap: StorageMap) {
    this.getPlayers().subscribe((players) => {
      if (players === undefined || players === null) {
        this.players = Players;
      } else {
        if (players instanceof Array) {
          this.players = players;
        }
      }
    });
    this.getMaps().subscribe((maps) => {
      if (maps === undefined || maps === null) {
        this.maps = Maps;
      } else {
        if (maps instanceof Array) {
          this.maps = maps;
        }
      }
    });
  }

  private players: Player[];

  private maps: Map[];

  isCtf: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  selectedPlayersCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  reloadPresetData(): void {
    Players.forEach((player) => {
      const index = this.players.findIndex((playerInDb) => {
        return playerInDb.id === player.id;
      });
      if (index === -1) {
        this.players.push(player);
      } else {
        this.players[index] = player;
      }
    });
    this.storageMap.set('players', this.players).subscribe(() => { });

    Maps.forEach((map) => {
      const index = this.maps.findIndex((mapInDb) => {
        return mapInDb.id === map.id;
      });
      if (index === -1) {
        this.maps.push(map);
      } else {
        this.maps[index] = map;
      }
    });
    this.storageMap.set('maps', this.maps).subscribe(() => { });
  }

  setSelectedPlayersCount(setSelectedPlayersCount: number): void {
    console.log(`Setting ${setSelectedPlayersCount}`);
    this.selectedPlayersCount.next(setSelectedPlayersCount);
  }

  setIsCtf(isCtf: boolean): void {
    this.isCtf.next(isCtf);
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

  deactivatePlayer(player: Player) {
    const index = this.players.findIndex((playerToFind) => {
      return playerToFind.id === player.id;
    });

    this.players[index].isInactive = true;

    return this.storageMap.set('players', this.players);
  }

  activatePlayer(player: Player) {
    const index = this.players.findIndex((playerToFind) => {
      return playerToFind.id === player.id;
    });

    this.players[index].isInactive = false;

    return this.storageMap.set('players', this.players);
  }

  resetMap(mapToFind: Map) {
    const index = this.maps.findIndex(map => mapToFind.id === map.id)
    this.maps[index].lastPlayedAt = 0
    return this.storageMap.set('map', this.maps)
  }

  resetAllMaps() {
    this.maps.forEach(map => {
      map.lastPlayedAt = 0
    })

    console.log(this.maps)
    return this.storageMap.set('map', this.maps)
  }
}
