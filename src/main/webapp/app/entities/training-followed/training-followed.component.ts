import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TrainingFollowed } from './training-followed.model';
import { TrainingFollowedService } from './training-followed.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-training-followed',
    templateUrl: './training-followed.component.html'
})
export class TrainingFollowedComponent implements OnInit, OnDestroy {
trainingFolloweds: TrainingFollowed[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private trainingFollowedService: TrainingFollowedService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.trainingFollowedService.query().subscribe(
            (res: HttpResponse<TrainingFollowed[]>) => {
                this.trainingFolloweds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTrainingFolloweds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TrainingFollowed) {
        return item.id;
    }
    registerChangeInTrainingFolloweds() {
        this.eventSubscriber = this.eventManager.subscribe('trainingFollowedListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
