import { BaseEntity } from './../../shared';

export class TrainingFollowed implements BaseEntity {
    constructor(
        public id?: number,
        public lastVisitDate?: any,
        public training?: BaseEntity,
        public user?: BaseEntity,
    ) {
    }
}
