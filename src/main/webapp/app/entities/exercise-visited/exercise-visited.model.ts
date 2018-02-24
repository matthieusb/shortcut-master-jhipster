import { BaseEntity } from './../../shared';

export const enum ExercisePhase {
    'PRACTISE',
    'FIGHT',
    'TEST'
}

export class ExerciseVisited implements BaseEntity {
    constructor(
        public id?: number,
        public lastPhaseFinished?: ExercisePhase,
        public exercise?: BaseEntity,
        public user?: BaseEntity,
    ) {
    }
}
