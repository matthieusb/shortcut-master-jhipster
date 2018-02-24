import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TrainingFollowed } from './training-followed.model';
import { TrainingFollowedPopupService } from './training-followed-popup.service';
import { TrainingFollowedService } from './training-followed.service';
import { Training, TrainingService } from '../training';

@Component({
    selector: 'jhi-training-followed-dialog',
    templateUrl: './training-followed-dialog.component.html'
})
export class TrainingFollowedDialogComponent implements OnInit {

    trainingFollowed: TrainingFollowed;
    isSaving: boolean;

    trainings: Training[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private trainingFollowedService: TrainingFollowedService,
        private trainingService: TrainingService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.trainingService.query()
            .subscribe((res: HttpResponse<Training[]>) => { this.trainings = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.trainingFollowed.id !== undefined) {
            this.subscribeToSaveResponse(
                this.trainingFollowedService.update(this.trainingFollowed));
        } else {
            this.subscribeToSaveResponse(
                this.trainingFollowedService.create(this.trainingFollowed));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TrainingFollowed>>) {
        result.subscribe((res: HttpResponse<TrainingFollowed>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TrainingFollowed) {
        this.eventManager.broadcast({ name: 'trainingFollowedListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTrainingById(index: number, item: Training) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-training-followed-popup',
    template: ''
})
export class TrainingFollowedPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trainingFollowedPopupService: TrainingFollowedPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.trainingFollowedPopupService
                    .open(TrainingFollowedDialogComponent as Component, params['id']);
            } else {
                this.trainingFollowedPopupService
                    .open(TrainingFollowedDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
