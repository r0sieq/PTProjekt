export interface UserData {
    readonly id: string,
    readonly balance: number,
    readonly name: string
}

export interface UserBet {
    readonly stake: number
}

export interface MinesweeperGame {
    readonly revealed: number[],
    readonly mines: number,
    readonly stake: number,
    readonly map: string
    readonly active: boolean,
    readonly lastAction: number
}

export interface RidethebusGame {
    readonly stake: number,
    readonly round: number,
    readonly cards: string[],
    readonly answers: number[],
    readonly active: boolean,
    readonly lastAction: number,
}