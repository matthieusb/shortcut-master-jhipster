import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Opponent } from './opponent.model';
import { OpponentService } from './opponent.service';

@Component({
    selector: 'jhi-opponent-detail',
    templateUrl: './opponent-detail.component.html'
})
export class OpponentDetailComponent implements OnInit, OnDestroy {

    opponent: Opponent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private opponentService: OpponentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOpponents();
    }

    load(id) {
        this.opponentService.find(id)
            .subscribe((opponentResponse: HttpResponse<Opponent>) => {
                this.opponent = opponentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOpponents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'opponentListModification',
            (response) => this.load(this.opponent.id)
        );
    }
}
