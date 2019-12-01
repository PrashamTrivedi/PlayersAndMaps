import { DatalayerService } from './app/datalayer.service';

export class Player {
    id: number;
    name: string;
    nickName: string;
    isInactive: boolean;
}

export class Map {
    id: number;
    name: string;
    path: string;
    lastPlayedAt: number;
    isDm: boolean;
    isSnow: boolean;
}


export class DataServiceAndPlayers {
    dataService: DatalayerService;
    players: Player[];
}

export class DataServiceAndMaps{
    dataService: DatalayerService;
    maps: Map[];
}