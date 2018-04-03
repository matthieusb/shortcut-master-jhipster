import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExerciseVisited } from 'app/shared/model/exercise-visited.model';
import { Principal } from 'app/core';
import { ExerciseVisitedService } from './exercise-visited.service';

@Component({
    selector: 'jhi-exercise-visited',
    templateUrl: './exercise-visited.component.html'
})
export class ExerciseVisitedComponent implements OnInit, OnDestroy {
    exerciseVisiteds: IExerciseVisited[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private exerciseVisitedService: ExerciseVisitedService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.exerciseVisitedService.query().subscribe(
            (res: HttpResponse<IExerciseVisited[]>) => {
                this.exerciseVisiteds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInExerciseVisiteds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IExerciseVisited) {
        return item.id;
    }

    registerChangeInExerciseVisiteds() {
        this.eventSubscriber = this.eventManager.subscribe('exerciseVisitedListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
