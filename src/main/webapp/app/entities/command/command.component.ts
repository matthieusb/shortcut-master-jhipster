import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICommand } from 'app/shared/model/command.model';
import { Principal } from 'app/core';
import { CommandService } from './command.service';

@Component({
    selector: 'jhi-command',
    templateUrl: './command.component.html'
})
export class CommandComponent implements OnInit, OnDestroy {
    commands: ICommand[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private commandService: CommandService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.commandService.query().subscribe(
            (res: HttpResponse<ICommand[]>) => {
                this.commands = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCommands();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICommand) {
        return item.id;
    }

    registerChangeInCommands() {
        this.eventSubscriber = this.eventManager.subscribe('commandListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
