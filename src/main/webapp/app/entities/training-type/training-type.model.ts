import { BaseEntity } from './../../shared';

export class TrainingType implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public description?: string,
    ) {
    }
}
