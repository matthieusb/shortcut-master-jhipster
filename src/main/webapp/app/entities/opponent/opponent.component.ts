import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOpponent } from 'app/shared/model/opponent.model';
import { Principal } from 'app/core';
import { OpponentService } from './opponent.service';

@Component({
    selector: 'jhi-opponent',
    templateUrl: './opponent.component.html'
})
export class OpponentComponent implements OnInit, OnDestroy {
    opponents: IOpponent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private opponentService: OpponentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.opponentService.query().subscribe(
            (res: HttpResponse<IOpponent[]>) => {
                this.opponents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOpponents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOpponent) {
        return item.id;
    }

    registerChangeInOpponents() {
        this.eventSubscriber = this.eventManager.subscribe('opponentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
