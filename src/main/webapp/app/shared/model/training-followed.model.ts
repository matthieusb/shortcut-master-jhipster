import { Moment } from 'moment';
import { ITraining } from './training.model';

export interface ITrainingFollowed {
    id?: number;
    lastVisitDate?: Moment;
    training?: ITraining;
}

export class TrainingFollowed implements ITrainingFollowed {
    constructor(public id?: number, public lastVisitDate?: Moment, public training?: ITraining) {}
}
