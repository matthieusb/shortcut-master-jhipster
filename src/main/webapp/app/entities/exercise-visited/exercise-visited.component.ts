import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ExerciseVisited } from './exercise-visited.model';
import { ExerciseVisitedService } from './exercise-visited.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-exercise-visited',
    templateUrl: './exercise-visited.component.html'
})
export class ExerciseVisitedComponent implements OnInit, OnDestroy {
exerciseVisiteds: ExerciseVisited[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private exerciseVisitedService: ExerciseVisitedService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.exerciseVisitedService.query().subscribe(
            (res: HttpResponse<ExerciseVisited[]>) => {
                this.exerciseVisiteds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInExerciseVisiteds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ExerciseVisited) {
        return item.id;
    }
    registerChangeInExerciseVisiteds() {
        this.eventSubscriber = this.eventManager.subscribe('exerciseVisitedListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
