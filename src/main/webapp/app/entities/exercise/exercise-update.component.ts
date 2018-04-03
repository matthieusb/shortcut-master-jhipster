import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { IExercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from './exercise.service';
import { IOpponent } from 'app/shared/model/opponent.model';
import { OpponentService } from 'app/entities/opponent';
import { ITraining } from 'app/shared/model/training.model';
import { TrainingService } from 'app/entities/training';

@Component({
    selector: 'jhi-exercise-update',
    templateUrl: './exercise-update.component.html'
})
export class ExerciseUpdateComponent implements OnInit {
    private _exercise: IExercise;
    isSaving: boolean;

    opponents: IOpponent[];

    trainings: ITraining[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private exerciseService: ExerciseService,
        private opponentService: OpponentService,
        private trainingService: TrainingService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ exercise }) => {
            this.exercise = exercise.body ? exercise.body : exercise;
        });
        this.opponentService.query().subscribe(
            (res: HttpResponse<IOpponent[]>) => {
                this.opponents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.trainingService.query().subscribe(
            (res: HttpResponse<ITraining[]>) => {
                this.trainings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.exercise.id !== undefined) {
            this.subscribeToSaveResponse(this.exerciseService.update(this.exercise));
        } else {
            this.subscribeToSaveResponse(this.exerciseService.create(this.exercise));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IExercise>>) {
        result.subscribe((res: HttpResponse<IExercise>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IExercise) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackOpponentById(index: number, item: IOpponent) {
        return item.id;
    }

    trackTrainingById(index: number, item: ITraining) {
        return item.id;
    }
    get exercise() {
        return this._exercise;
    }

    set exercise(exercise: IExercise) {
        this._exercise = exercise;
    }
}
