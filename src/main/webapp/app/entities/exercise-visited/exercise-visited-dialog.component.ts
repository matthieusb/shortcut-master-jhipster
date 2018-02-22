import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ExerciseVisited } from './exercise-visited.model';
import { ExerciseVisitedPopupService } from './exercise-visited-popup.service';
import { ExerciseVisitedService } from './exercise-visited.service';
import { Exercise, ExerciseService } from '../exercise';

@Component({
    selector: 'jhi-exercise-visited-dialog',
    templateUrl: './exercise-visited-dialog.component.html'
})
export class ExerciseVisitedDialogComponent implements OnInit {

    exerciseVisited: ExerciseVisited;
    isSaving: boolean;

    exercises: Exercise[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private exerciseVisitedService: ExerciseVisitedService,
        private exerciseService: ExerciseService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.exerciseService.query()
            .subscribe((res: HttpResponse<Exercise[]>) => { this.exercises = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.exerciseVisited.id !== undefined) {
            this.subscribeToSaveResponse(
                this.exerciseVisitedService.update(this.exerciseVisited));
        } else {
            this.subscribeToSaveResponse(
                this.exerciseVisitedService.create(this.exerciseVisited));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ExerciseVisited>>) {
        result.subscribe((res: HttpResponse<ExerciseVisited>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ExerciseVisited) {
        this.eventManager.broadcast({ name: 'exerciseVisitedListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackExerciseById(index: number, item: Exercise) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-exercise-visited-popup',
    template: ''
})
export class ExerciseVisitedPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private exerciseVisitedPopupService: ExerciseVisitedPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.exerciseVisitedPopupService
                    .open(ExerciseVisitedDialogComponent as Component, params['id']);
            } else {
                this.exerciseVisitedPopupService
                    .open(ExerciseVisitedDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
