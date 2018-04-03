import { ICommand } from './command.model';
import { IShortcut } from './shortcut.model';
import { IExercise } from './exercise.model';

export interface IQuestion {
    id?: number;
    label?: string;
    description?: string;
    commandQuestion?: ICommand;
    shorcutQuestion?: IShortcut;
    exercise?: IExercise;
}

export class Question implements IQuestion {
    constructor(
        public id?: number,
        public label?: string,
        public description?: string,
        public commandQuestion?: ICommand,
        public shorcutQuestion?: IShortcut,
        public exercise?: IExercise
    ) {}
}
