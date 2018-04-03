import { IQuestion } from './question.model';
import { IOpponent } from './opponent.model';
import { ITraining } from './training.model';

export interface IExercise {
    id?: number;
    label?: string;
    description?: string;
    order?: number;
    questions?: IQuestion[];
    opponent?: IOpponent;
    training?: ITraining;
}

export class Exercise implements IExercise {
    constructor(
        public id?: number,
        public label?: string,
        public description?: string,
        public order?: number,
        public questions?: IQuestion[],
        public opponent?: IOpponent,
        public training?: ITraining
    ) {}
}
