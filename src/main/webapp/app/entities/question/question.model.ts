import { BaseEntity } from './../../shared';

export class Question implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public description?: string,
        public commandQuestion?: BaseEntity,
        public shorcutQuestion?: BaseEntity,
        public exercise?: BaseEntity,
    ) {
    }
}
