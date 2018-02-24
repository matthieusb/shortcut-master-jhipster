import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ExerciseVisited } from './exercise-visited.model';
import { ExerciseVisitedService } from './exercise-visited.service';

@Component({
    selector: 'jhi-exercise-visited-detail',
    templateUrl: './exercise-visited-detail.component.html'
})
export class ExerciseVisitedDetailComponent implements OnInit, OnDestroy {

    exerciseVisited: ExerciseVisited;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private exerciseVisitedService: ExerciseVisitedService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInExerciseVisiteds();
    }

    load(id) {
        this.exerciseVisitedService.find(id)
            .subscribe((exerciseVisitedResponse: HttpResponse<ExerciseVisited>) => {
                this.exerciseVisited = exerciseVisitedResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInExerciseVisiteds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'exerciseVisitedListModification',
            (response) => this.load(this.exerciseVisited.id)
        );
    }
}
