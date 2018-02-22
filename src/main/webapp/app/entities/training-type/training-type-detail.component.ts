import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TrainingType } from './training-type.model';
import { TrainingTypeService } from './training-type.service';

@Component({
    selector: 'jhi-training-type-detail',
    templateUrl: './training-type-detail.component.html'
})
export class TrainingTypeDetailComponent implements OnInit, OnDestroy {

    trainingType: TrainingType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private trainingTypeService: TrainingTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTrainingTypes();
    }

    load(id) {
        this.trainingTypeService.find(id)
            .subscribe((trainingTypeResponse: HttpResponse<TrainingType>) => {
                this.trainingType = trainingTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTrainingTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'trainingTypeListModification',
            (response) => this.load(this.trainingType.id)
        );
    }
}
