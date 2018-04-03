import { IExercise } from './exercise.model';

export const enum ExercisePhase {
    'PRACTISE',
    'FIGHT',
    'TEST'
}

export interface IExerciseVisited {
    id?: number;
    lastPhaseFinished?: ExercisePhase;
    exercise?: IExercise;
}

export class ExerciseVisited implements IExerciseVisited {
    constructor(public id?: number, public lastPhaseFinished?: ExercisePhase, public exercise?: IExercise) {}
}
