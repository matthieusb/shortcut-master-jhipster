import { BaseEntity } from './../../shared';

export class Keystroke implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public jsCode?: number,
        public shortcut?: BaseEntity,
    ) {
    }
}
