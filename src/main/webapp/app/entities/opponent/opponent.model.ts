import { BaseEntity } from './../../shared';

export const enum OpponentDifficulty {
    'CHILDISH',
    'EASY',
    'NORMAL',
    'HARD',
    'NIGHTMARE'
}

export class Opponent implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public difficulty?: OpponentDifficulty,
    ) {
    }
}
