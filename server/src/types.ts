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

export interface RouletteGame {
    readonly numberBets: number[],
    readonly redBet: number,
    readonly blackBet: number,
    readonly evenBet: number,
    readonly oddBet: number,
    // first 12, second 12, third 12
    readonly st12Bet: number,
    readonly nd12Bet: number,
    readonly rd12Bet: number,
    // first 18, second 18
    readonly st18Bet: number,
    readonly nd18Bet: number,
}

export type Game = { 
    name: "minesweeper", game: MinesweeperGame, id: string 
} | {
    name: "ridethebus", game: RidethebusGame, id: string
} | {
    name: "roulette", game: RouletteGame, id: string
}

export type RouletteBetName = "onRed" | "onBlack" | "onGreen" | "onEven" | "onOdd" | "onSt12" | "onNd12" | "onRd12" | "onSt18" | "onNd18";

export type Bets = Record<RouletteBetName | number, number>;