import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITrainingType } from 'app/shared/model/training-type.model';
import { Principal } from 'app/core';
import { TrainingTypeService } from './training-type.service';

@Component({
    selector: 'jhi-training-type',
    templateUrl: './training-type.component.html'
})
export class TrainingTypeComponent implements OnInit, OnDestroy {
    trainingTypes: ITrainingType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private trainingTypeService: TrainingTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.trainingTypeService.query().subscribe(
            (res: HttpResponse<ITrainingType[]>) => {
                this.trainingTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTrainingTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITrainingType) {
        return item.id;
    }

    registerChangeInTrainingTypes() {
        this.eventSubscriber = this.eventManager.subscribe('trainingTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
