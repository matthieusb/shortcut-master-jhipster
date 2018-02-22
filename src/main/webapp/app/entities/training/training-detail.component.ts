import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Training } from './training.model';
import { TrainingService } from './training.service';

@Component({
    selector: 'jhi-training-detail',
    templateUrl: './training-detail.component.html'
})
export class TrainingDetailComponent implements OnInit, OnDestroy {

    training: Training;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private trainingService: TrainingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTrainings();
    }

    load(id) {
        this.trainingService.find(id)
            .subscribe((trainingResponse: HttpResponse<Training>) => {
                this.training = trainingResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTrainings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'trainingListModification',
            (response) => this.load(this.training.id)
        );
    }
}
