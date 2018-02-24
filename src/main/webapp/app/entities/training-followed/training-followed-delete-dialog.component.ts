import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TrainingFollowed } from './training-followed.model';
import { TrainingFollowedPopupService } from './training-followed-popup.service';
import { TrainingFollowedService } from './training-followed.service';

@Component({
    selector: 'jhi-training-followed-delete-dialog',
    templateUrl: './training-followed-delete-dialog.component.html'
})
export class TrainingFollowedDeleteDialogComponent {

    trainingFollowed: TrainingFollowed;

    constructor(
        private trainingFollowedService: TrainingFollowedService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trainingFollowedService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'trainingFollowedListModification',
                content: 'Deleted an trainingFollowed'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-training-followed-delete-popup',
    template: ''
})
export class TrainingFollowedDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trainingFollowedPopupService: TrainingFollowedPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.trainingFollowedPopupService
                .open(TrainingFollowedDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
