import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TrainingType } from './training-type.model';
import { TrainingTypePopupService } from './training-type-popup.service';
import { TrainingTypeService } from './training-type.service';

@Component({
    selector: 'jhi-training-type-dialog',
    templateUrl: './training-type-dialog.component.html'
})
export class TrainingTypeDialogComponent implements OnInit {

    trainingType: TrainingType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private trainingTypeService: TrainingTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.trainingType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.trainingTypeService.update(this.trainingType));
        } else {
            this.subscribeToSaveResponse(
                this.trainingTypeService.create(this.trainingType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TrainingType>>) {
        result.subscribe((res: HttpResponse<TrainingType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TrainingType) {
        this.eventManager.broadcast({ name: 'trainingTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-training-type-popup',
    template: ''
})
export class TrainingTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trainingTypePopupService: TrainingTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.trainingTypePopupService
                    .open(TrainingTypeDialogComponent as Component, params['id']);
            } else {
                this.trainingTypePopupService
                    .open(TrainingTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
