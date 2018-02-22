import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TrainingType } from './training-type.model';
import { TrainingTypeService } from './training-type.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-training-type',
    templateUrl: './training-type.component.html'
})
export class TrainingTypeComponent implements OnInit, OnDestroy {
trainingTypes: TrainingType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private trainingTypeService: TrainingTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.trainingTypeService.query().subscribe(
            (res: HttpResponse<TrainingType[]>) => {
                this.trainingTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTrainingTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TrainingType) {
        return item.id;
    }
    registerChangeInTrainingTypes() {
        this.eventSubscriber = this.eventManager.subscribe('trainingTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
