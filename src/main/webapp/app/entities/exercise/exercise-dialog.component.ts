import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Exercise } from './exercise.model';
import { ExercisePopupService } from './exercise-popup.service';
import { ExerciseService } from './exercise.service';
import { Opponent, OpponentService } from '../opponent';
import { Training, TrainingService } from '../training';

@Component({
    selector: 'jhi-exercise-dialog',
    templateUrl: './exercise-dialog.component.html'
})
export class ExerciseDialogComponent implements OnInit {

    exercise: Exercise;
    isSaving: boolean;

    opponents: Opponent[];

    trainings: Training[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private exerciseService: ExerciseService,
        private opponentService: OpponentService,
        private trainingService: TrainingService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.opponentService
            .query({filter: 'exercise-is-null'})
            .subscribe((res: HttpResponse<Opponent[]>) => {
                if (!this.exercise.opponent || !this.exercise.opponent.id) {
                    this.opponents = res.body;
                } else {
                    this.opponentService
                        .find(this.exercise.opponent.id)
                        .subscribe((subRes: HttpResponse<Opponent>) => {
                            this.opponents = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.trainingService.query()
            .subscribe((res: HttpResponse<Training[]>) => { this.trainings = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.exercise.id !== undefined) {
            this.subscribeToSaveResponse(
                this.exerciseService.update(this.exercise));
        } else {
            this.subscribeToSaveResponse(
                this.exerciseService.create(this.exercise));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Exercise>>) {
        result.subscribe((res: HttpResponse<Exercise>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Exercise) {
        this.eventManager.broadcast({ name: 'exerciseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOpponentById(index: number, item: Opponent) {
        return item.id;
    }

    trackTrainingById(index: number, item: Training) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-exercise-popup',
    template: ''
})
export class ExercisePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private exercisePopupService: ExercisePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.exercisePopupService
                    .open(ExerciseDialogComponent as Component, params['id']);
            } else {
                this.exercisePopupService
                    .open(ExerciseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
