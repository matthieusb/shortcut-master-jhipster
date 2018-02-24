import { BaseEntity } from './../../shared';

export class Exercise implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public description?: string,
        public order?: number,
        public opponent?: BaseEntity,
        public questions?: BaseEntity[],
        public training?: BaseEntity,
    ) {
    }
}
