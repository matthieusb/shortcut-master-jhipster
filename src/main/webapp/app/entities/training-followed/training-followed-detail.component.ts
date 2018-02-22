import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TrainingFollowed } from './training-followed.model';
import { TrainingFollowedService } from './training-followed.service';

@Component({
    selector: 'jhi-training-followed-detail',
    templateUrl: './training-followed-detail.component.html'
})
export class TrainingFollowedDetailComponent implements OnInit, OnDestroy {

    trainingFollowed: TrainingFollowed;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private trainingFollowedService: TrainingFollowedService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTrainingFolloweds();
    }

    load(id) {
        this.trainingFollowedService.find(id)
            .subscribe((trainingFollowedResponse: HttpResponse<TrainingFollowed>) => {
                this.trainingFollowed = trainingFollowedResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTrainingFolloweds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'trainingFollowedListModification',
            (response) => this.load(this.trainingFollowed.id)
        );
    }
}
