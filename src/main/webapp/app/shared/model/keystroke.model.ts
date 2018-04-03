import { IShortcut } from './shortcut.model';

export interface IKeystroke {
    id?: number;
    label?: string;
    jsCode?: number;
    shortcuts?: IShortcut[];
}

export class Keystroke implements IKeystroke {
    constructor(public id?: number, public label?: string, public jsCode?: number, public shortcuts?: IShortcut[]) {}
}
