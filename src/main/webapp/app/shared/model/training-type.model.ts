export interface ITrainingType {
    id?: number;
    label?: string;
    description?: string;
}

export class TrainingType implements ITrainingType {
    constructor(public id?: number, public label?: string, public description?: string) {}
}
