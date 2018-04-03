import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { IExerciseVisited } from 'app/shared/model/exercise-visited.model';
import { ExerciseVisitedService } from './exercise-visited.service';
import { IExercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from 'app/entities/exercise';

@Component({
    selector: 'jhi-exercise-visited-update',
    templateUrl: './exercise-visited-update.component.html'
})
export class ExerciseVisitedUpdateComponent implements OnInit {
    private _exerciseVisited: IExerciseVisited;
    isSaving: boolean;

    exercises: IExercise[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private exerciseVisitedService: ExerciseVisitedService,
        private exerciseService: ExerciseService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ exerciseVisited }) => {
            this.exerciseVisited = exerciseVisited.body ? exerciseVisited.body : exerciseVisited;
        });
        this.exerciseService.query().subscribe(
            (res: HttpResponse<IExercise[]>) => {
                this.exercises = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.exerciseVisited.id !== undefined) {
            this.subscribeToSaveResponse(this.exerciseVisitedService.update(this.exerciseVisited));
        } else {
            this.subscribeToSaveResponse(this.exerciseVisitedService.create(this.exerciseVisited));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IExerciseVisited>>) {
        result.subscribe(
            (res: HttpResponse<IExerciseVisited>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: IExerciseVisited) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackExerciseById(index: number, item: IExercise) {
        return item.id;
    }
    get exerciseVisited() {
        return this._exerciseVisited;
    }

    set exerciseVisited(exerciseVisited: IExerciseVisited) {
        this._exerciseVisited = exerciseVisited;
    }
}
