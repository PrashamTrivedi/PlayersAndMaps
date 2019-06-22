export class Player {
    id: number;
    name: string;
    nickName: string;
}

export class Map {
    id: number;
    name: string;
    path: string;
    lastPlayedAt: number;
    isDm: boolean;
    isSnow: boolean;
}
