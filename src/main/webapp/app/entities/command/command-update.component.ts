import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ICommand } from 'app/shared/model/command.model';
import { CommandService } from './command.service';

@Component({
    selector: 'jhi-command-update',
    templateUrl: './command-update.component.html'
})
export class CommandUpdateComponent implements OnInit {
    private _command: ICommand;
    isSaving: boolean;

    constructor(private commandService: CommandService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ command }) => {
            this.command = command.body ? command.body : command;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.command.id !== undefined) {
            this.subscribeToSaveResponse(this.commandService.update(this.command));
        } else {
            this.subscribeToSaveResponse(this.commandService.create(this.command));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICommand>>) {
        result.subscribe((res: HttpResponse<ICommand>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ICommand) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get command() {
        return this._command;
    }

    set command(command: ICommand) {
        this._command = command;
    }
}
