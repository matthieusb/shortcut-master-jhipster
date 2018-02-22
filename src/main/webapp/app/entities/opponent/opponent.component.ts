import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Opponent } from './opponent.model';
import { OpponentService } from './opponent.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-opponent',
    templateUrl: './opponent.component.html'
})
export class OpponentComponent implements OnInit, OnDestroy {
opponents: Opponent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private opponentService: OpponentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.opponentService.query().subscribe(
            (res: HttpResponse<Opponent[]>) => {
                this.opponents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOpponents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Opponent) {
        return item.id;
    }
    registerChangeInOpponents() {
        this.eventSubscriber = this.eventManager.subscribe('opponentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
