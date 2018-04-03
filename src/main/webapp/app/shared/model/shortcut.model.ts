import { IKeystroke } from './keystroke.model';

export interface IShortcut {
    id?: number;
    label?: string;
    keystrokes?: IKeystroke[];
}

export class Shortcut implements IShortcut {
    constructor(public id?: number, public label?: string, public keystrokes?: IKeystroke[]) {}
}
