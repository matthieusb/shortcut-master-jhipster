import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Training } from './training.model';
import { TrainingPopupService } from './training-popup.service';
import { TrainingService } from './training.service';
import { TrainingType, TrainingTypeService } from '../training-type';

@Component({
    selector: 'jhi-training-dialog',
    templateUrl: './training-dialog.component.html'
})
export class TrainingDialogComponent implements OnInit {

    training: Training;
    isSaving: boolean;

    trainingtypes: TrainingType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private trainingService: TrainingService,
        private trainingTypeService: TrainingTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.trainingTypeService.query()
            .subscribe((res: HttpResponse<TrainingType[]>) => { this.trainingtypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.training.id !== undefined) {
            this.subscribeToSaveResponse(
                this.trainingService.update(this.training));
        } else {
            this.subscribeToSaveResponse(
                this.trainingService.create(this.training));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Training>>) {
        result.subscribe((res: HttpResponse<Training>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Training) {
        this.eventManager.broadcast({ name: 'trainingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTrainingTypeById(index: number, item: TrainingType) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-training-popup',
    template: ''
})
export class TrainingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trainingPopupService: TrainingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.trainingPopupService
                    .open(TrainingDialogComponent as Component, params['id']);
            } else {
                this.trainingPopupService
                    .open(TrainingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
