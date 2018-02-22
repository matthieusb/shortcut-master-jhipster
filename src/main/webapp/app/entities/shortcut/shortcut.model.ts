import { BaseEntity } from './../../shared';

export class Shortcut implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public keystrokes?: BaseEntity[],
    ) {
    }
}
