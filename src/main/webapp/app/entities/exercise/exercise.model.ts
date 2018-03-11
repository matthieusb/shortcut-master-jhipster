import { BaseEntity } from './../../shared';

export class Exercise implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public description?: string,
        public order?: number,
        public questions?: BaseEntity[],
        public opponent?: BaseEntity,
        public training?: BaseEntity,
    ) {
    }
}
