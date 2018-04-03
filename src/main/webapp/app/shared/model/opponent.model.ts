export const enum OpponentDifficulty {
    'CHILDISH',
    'EASY',
    'NORMAL',
    'HARD',
    'NIGHTMARE'
}

export interface IOpponent {
    id?: number;
    name?: string;
    difficulty?: OpponentDifficulty;
}

export class Opponent implements IOpponent {
    constructor(public id?: number, public name?: string, public difficulty?: OpponentDifficulty) {}
}
