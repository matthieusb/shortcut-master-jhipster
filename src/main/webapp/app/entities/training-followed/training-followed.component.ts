import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITrainingFollowed } from 'app/shared/model/training-followed.model';
import { Principal } from 'app/core';
import { TrainingFollowedService } from './training-followed.service';

@Component({
    selector: 'jhi-training-followed',
    templateUrl: './training-followed.component.html'
})
export class TrainingFollowedComponent implements OnInit, OnDestroy {
    trainingFolloweds: ITrainingFollowed[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private trainingFollowedService: TrainingFollowedService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.trainingFollowedService.query().subscribe(
            (res: HttpResponse<ITrainingFollowed[]>) => {
                this.trainingFolloweds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTrainingFolloweds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITrainingFollowed) {
        return item.id;
    }

    registerChangeInTrainingFolloweds() {
        this.eventSubscriber = this.eventManager.subscribe('trainingFollowedListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
