import { IExercise } from './exercise.model';
import { ITrainingType } from './training-type.model';

export const enum OperatingSystem {
    'MACOS',
    'WINLINUX'
}

export interface ITraining {
    id?: number;
    label?: string;
    description?: string;
    operatingSystem?: OperatingSystem;
    imagePath?: string;
    exercises?: IExercise[];
    trainingType?: ITrainingType;
}

export class Training implements ITraining {
    constructor(
        public id?: number,
        public label?: string,
        public description?: string,
        public operatingSystem?: OperatingSystem,
        public imagePath?: string,
        public exercises?: IExercise[],
        public trainingType?: ITrainingType
    ) {}
}
