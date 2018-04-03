import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ITrainingFollowed } from 'app/shared/model/training-followed.model';
import { TrainingFollowedService } from './training-followed.service';
import { ITraining } from 'app/shared/model/training.model';
import { TrainingService } from 'app/entities/training';

@Component({
    selector: 'jhi-training-followed-update',
    templateUrl: './training-followed-update.component.html'
})
export class TrainingFollowedUpdateComponent implements OnInit {
    private _trainingFollowed: ITrainingFollowed;
    isSaving: boolean;

    trainings: ITraining[];
    lastVisitDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private trainingFollowedService: TrainingFollowedService,
        private trainingService: TrainingService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ trainingFollowed }) => {
            this.trainingFollowed = trainingFollowed.body ? trainingFollowed.body : trainingFollowed;
        });
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
        this.trainingFollowed.lastVisitDate = moment(this.lastVisitDate, DATE_TIME_FORMAT);
        if (this.trainingFollowed.id !== undefined) {
            this.subscribeToSaveResponse(this.trainingFollowedService.update(this.trainingFollowed));
        } else {
            this.subscribeToSaveResponse(this.trainingFollowedService.create(this.trainingFollowed));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITrainingFollowed>>) {
        result.subscribe(
            (res: HttpResponse<ITrainingFollowed>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: ITrainingFollowed) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTrainingById(index: number, item: ITraining) {
        return item.id;
    }
    get trainingFollowed() {
        return this._trainingFollowed;
    }

    set trainingFollowed(trainingFollowed: ITrainingFollowed) {
        this._trainingFollowed = trainingFollowed;
        this.lastVisitDate = moment(trainingFollowed.lastVisitDate).format();
    }
}
