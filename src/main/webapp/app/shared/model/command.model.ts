export interface ICommand {
    id?: number;
    command?: string;
}

export class Command implements ICommand {
    constructor(public id?: number, public command?: string) {}
}
