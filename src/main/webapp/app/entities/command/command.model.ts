import { BaseEntity } from './../../shared';

export class Command implements BaseEntity {
    constructor(
        public id?: number,
        public command?: string,
    ) {
    }
}
