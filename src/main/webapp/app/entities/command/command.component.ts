import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Command } from './command.model';
import { CommandService } from './command.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-command',
    templateUrl: './command.component.html'
})
export class CommandComponent implements OnInit, OnDestroy {
commands: Command[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private commandService: CommandService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.commandService.query().subscribe(
            (res: HttpResponse<Command[]>) => {
                this.commands = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCommands();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Command) {
        return item.id;
    }
    registerChangeInCommands() {
        this.eventSubscriber = this.eventManager.subscribe('commandListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
