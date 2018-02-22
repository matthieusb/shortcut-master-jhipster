import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Exercise } from './exercise.model';
import { ExerciseService } from './exercise.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-exercise',
    templateUrl: './exercise.component.html'
})
export class ExerciseComponent implements OnInit, OnDestroy {
exercises: Exercise[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private exerciseService: ExerciseService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.exerciseService.query().subscribe(
            (res: HttpResponse<Exercise[]>) => {
                this.exercises = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInExercises();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Exercise) {
        return item.id;
    }
    registerChangeInExercises() {
        this.eventSubscriber = this.eventManager.subscribe('exerciseListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
