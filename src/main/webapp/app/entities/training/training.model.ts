import { BaseEntity } from './../../shared';

export const enum OperatingSystem {
    'MACOS',
    'WINLINUX'
}

export class Training implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public description?: string,
        public operatingSystem?: OperatingSystem,
        public imagePath?: string,
        public exercises?: BaseEntity[],
        public trainingType?: BaseEntity,
    ) {
    }
}
