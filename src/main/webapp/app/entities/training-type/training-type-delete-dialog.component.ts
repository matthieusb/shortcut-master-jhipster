import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TrainingType } from './training-type.model';
import { TrainingTypePopupService } from './training-type-popup.service';
import { TrainingTypeService } from './training-type.service';

@Component({
    selector: 'jhi-training-type-delete-dialog',
    templateUrl: './training-type-delete-dialog.component.html'
})
export class TrainingTypeDeleteDialogComponent {

    trainingType: TrainingType;

    constructor(
        private trainingTypeService: TrainingTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trainingTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'trainingTypeListModification',
                content: 'Deleted an trainingType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-training-type-delete-popup',
    template: ''
})
export class TrainingTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trainingTypePopupService: TrainingTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.trainingTypePopupService
                .open(TrainingTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
