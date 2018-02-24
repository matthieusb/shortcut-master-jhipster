import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Training } from './training.model';
import { TrainingService } from './training.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-training',
    templateUrl: './training.component.html'
})
export class TrainingComponent implements OnInit, OnDestroy {
trainings: Training[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private trainingService: TrainingService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.trainingService.query().subscribe(
            (res: HttpResponse<Training[]>) => {
                this.trainings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTrainings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Training) {
        return item.id;
    }
    registerChangeInTrainings() {
        this.eventSubscriber = this.eventManager.subscribe('trainingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
