import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { ITraining } from 'app/shared/model/training.model';
import { TrainingService } from './training.service';
import { ITrainingType } from 'app/shared/model/training-type.model';
import { TrainingTypeService } from 'app/entities/training-type';

@Component({
    selector: 'jhi-training-update',
    templateUrl: './training-update.component.html'
})
export class TrainingUpdateComponent implements OnInit {
    private _training: ITraining;
    isSaving: boolean;

    trainingtypes: ITrainingType[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private trainingService: TrainingService,
        private trainingTypeService: TrainingTypeService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ training }) => {
            this.training = training.body ? training.body : training;
        });
        this.trainingTypeService.query().subscribe(
            (res: HttpResponse<ITrainingType[]>) => {
                this.trainingtypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.training.id !== undefined) {
            this.subscribeToSaveResponse(this.trainingService.update(this.training));
        } else {
            this.subscribeToSaveResponse(this.trainingService.create(this.training));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITraining>>) {
        result.subscribe((res: HttpResponse<ITraining>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ITraining) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTrainingTypeById(index: number, item: ITrainingType) {
        return item.id;
    }
    get training() {
        return this._training;
    }

    set training(training: ITraining) {
        this._training = training;
    }
}
